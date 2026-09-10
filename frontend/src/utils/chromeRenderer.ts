// A small procedural chrome knot, isolated from the storefront and loaded with the hero.
const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
uniform vec2 rotation;
uniform float aspect;
varying vec3 surfaceNormal;
varying vec3 surfacePosition;
void main() {
  float cx = cos(rotation.x), sx = sin(rotation.x);
  float cy = cos(rotation.y), sy = sin(rotation.y);
  mat3 rx = mat3(1.,0.,0., 0.,cx,sx, 0.,-sx,cx);
  mat3 ry = mat3(cy,0.,-sy, 0.,1.,0., sy,0.,cy);
  mat3 transform = ry * rx;
  vec3 p = transform * position;
  surfaceNormal = transform * normal;
  surfacePosition = p;
  float depth = 4.8 - p.z;
  gl_Position = vec4(p.x * 2.7 / aspect, p.y * 2.7, depth - 1., depth);
}`

const fragmentSource = `
precision mediump float;
varying vec3 surfaceNormal;
varying vec3 surfacePosition;
void main() {
  vec3 n = normalize(surfaceNormal);
  vec3 v = normalize(vec3(0.,0.,4.8) - surfacePosition);
  vec3 r = reflect(-v, n);
  float band = smoothstep(-.12,.05,r.y) - smoothstep(.36,.42,r.y);
  float strip = pow(max(0., 1. - abs(r.x * .8 + r.y * .35 - .24)), 30.);
  vec3 color = mix(vec3(.06,.035,.085), vec3(.79,.8,.85), band);
  color += vec3(.94,.97,1.) * strip * .95;
  color += vec3(.36,.2,.58) * max(r.x,0.) * .45;
  color += vec3(.57,.63,.13) * max(-r.y,0.) * .3;
  float rim = pow(1. - max(dot(n,v),0.), 3.);
  color = mix(color, vec3(.88,.86,.96), rim * .85);
  gl_FragColor = vec4(color, 1.);
}`

type Vector3 = [number, number, number]
const normalize = (v: Vector3): Vector3 => {
  const length = Math.hypot(...v) || 1
  return [v[0] / length, v[1] / length, v[2] / length]
}
const cross = (a: Vector3, b: Vector3): Vector3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
const center = (t: number): Vector3 => {
  const radius = 0.68 + 0.26 * Math.cos(3 * t)
  return [
    radius * Math.cos(2 * t),
    radius * Math.sin(2 * t),
    0.3 * Math.sin(3 * t),
  ]
}

function createKnot() {
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []
  const segments = 144
  const sides = 16
  for (let segment = 0; segment <= segments; segment++) {
    const t = (segment / segments) * Math.PI * 2
    const point = center(t)
    const next = center(t + 0.001)
    const tangent = normalize([
      next[0] - point[0],
      next[1] - point[1],
      next[2] - point[2],
    ])
    const normal = normalize(cross(tangent, [0, 0, 1]))
    const binormal = cross(tangent, normal)
    for (let side = 0; side <= sides; side++) {
      const angle = (side / sides) * Math.PI * 2
      const offset = normal.map(
        (value, axis) =>
          value * Math.cos(angle) + binormal[axis] * Math.sin(angle),
      )
      positions.push(...point.map((value, axis) => value + offset[axis] * 0.2))
      normals.push(...offset)
      if (segment < segments && side < sides) {
        const first = segment * (sides + 1) + side
        const second = first + sides + 1
        indices.push(first, second, first + 1, second, second + 1, first + 1)
      }
    }
  }
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
  }
}

export function createChromeRenderer(
  canvas: HTMLCanvasElement,
  reducedMotion: boolean,
): (() => void) | undefined {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  })
  if (!gl) return
  const shaders: WebGLShader[] = []
  const buffers: WebGLBuffer[] = []
  const program = gl.createProgram()
  if (!program) return

  const release = () => {
    buffers.forEach((buffer) => gl.deleteBuffer(buffer))
    shaders.forEach((shader) => gl.deleteShader(shader))
    gl.deleteProgram(program)
  }
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertexSource],
    [gl.FRAGMENT_SHADER, fragmentSource],
  ] as const) {
    const shader = gl.createShader(type)
    if (!shader) {
      release()
      return
    }
    shaders.push(shader)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      release()
      return
    }
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    release()
    return
  }
  gl.useProgram(program)
  const mesh = createKnot()
  for (const [name, values] of [
    ['position', mesh.positions],
    ['normal', mesh.normals],
  ] as const) {
    const buffer = gl.createBuffer()
    if (!buffer) {
      release()
      return
    }
    buffers.push(buffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW)
    const location = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
  }
  const indexBuffer = gl.createBuffer()
  if (!indexBuffer) {
    release()
    return
  }
  buffers.push(indexBuffer)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW)
  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0, 0, 0, 0)
  const rotation = gl.getUniformLocation(program, 'rotation')
  const aspect = gl.getUniformLocation(program, 'aspect')
  let frame = 0
  let visible = false
  let pointerX = 0
  let pointerY = 0
  let angle = 0
  let previousTime = 0

  const draw = (time: number) => {
    if (gl.isContextLost()) return
    if (!reducedMotion) angle += Math.min(time - previousTime, 40) * 0.00012
    previousTime = time
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniform2f(
      rotation,
      -0.55 + pointerY * 0.3,
      angle + pointerX * 0.5 + (reducedMotion ? 0 : window.scrollY * 0.0006),
    )
    gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0)
    if (visible && !document.hidden && !reducedMotion)
      frame = requestAnimationFrame(draw)
  }
  const schedule = () => {
    cancelAnimationFrame(frame)
    if (visible && !document.hidden) frame = requestAnimationFrame(draw)
  }
  const resize = () => {
    const bounds = canvas.getBoundingClientRect()
    const ratio = Math.min(window.devicePixelRatio, 1.5)
    canvas.width = Math.max(1, Math.round(bounds.width * ratio))
    canvas.height = Math.max(1, Math.round(bounds.height * ratio))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform1f(aspect, canvas.width / canvas.height)
    schedule()
  }
  const pointer = (event: PointerEvent) => {
    if (reducedMotion || !visible || event.pointerType !== 'mouse') return
    pointerX = event.clientX / window.innerWidth - 0.5
    pointerY = event.clientY / window.innerHeight - 0.5
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    schedule()
  })
  const resizeObserver = new ResizeObserver(resize)
  observer.observe(canvas)
  resizeObserver.observe(canvas)
  window.addEventListener('pointermove', pointer, { passive: true })
  document.addEventListener('visibilitychange', schedule)
  resize()

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    resizeObserver.disconnect()
    window.removeEventListener('pointermove', pointer)
    document.removeEventListener('visibilitychange', schedule)
    release()
  }
}

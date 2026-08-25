import nurburgringTank from '../assets/products/nurburgring-73.webp'
import orbitalKoiTank from '../assets/products/orbital-koi.webp'
import redlineTank from '../assets/products/redline.webp'
import sunnyMotelTank from '../assets/products/sunny-motel.webp'
import type { Product } from '../types/product'

export const products: readonly Product[] = [
  {
    id: 'nurburgring-73',
    name: 'Nürburgring 73',
    subtitle: 'Nordschleife edition',
    price: 35,
    color: 'Washed black',
    category: 'Motorsport',
    image: nurburgringTank,
    accent: '#dfff00',
    surface: '#c8c9ff',
    description:
      'Bumbac greu, fit boxy și energia celor 20,8 km de asfalt legendar.',
    badge: 'Hero piece',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'orbital-koi',
    name: 'Orbital Koi',
    subtitle: 'Afterdark edition',
    price: 33,
    color: 'Electric cobalt',
    category: 'Graphic',
    image: orbitalKoiTank,
    accent: '#ff5ac8',
    surface: '#b8ffef',
    description:
      'Un koi cromat prins pe orbită. Print tactil pe jersey albastru intens.',
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'sunny-motel',
    name: 'Sunny Motel',
    subtitle: 'Road trip edition',
    price: 31,
    color: 'Butter yellow',
    category: 'Graphic',
    image: sunnyMotelTank,
    accent: '#ff3d24',
    surface: '#ffb7db',
    description:
      'Un suvenir dintr-o vară care nu s-a terminat încă. Moale și relaxat.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'redline',
    name: 'Redline',
    subtitle: 'Velocity edition',
    price: 33,
    color: 'Racing red',
    category: 'Color',
    image: redlineTank,
    accent: '#111111',
    surface: '#dfff00',
    description:
      'Roșu fără frână, linii de viteză și croială care ține pasul cu tine.',
    badge: 'Fast mover',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
]

export const featuredProduct = products[0]

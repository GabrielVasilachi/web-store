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
    accent: '#383735',
    surface: '#e9e7e0',
    description:
      'Bumbac greu, fit boxy și energia celor 20,8 km de asfalt legendar.',
    badge: 'Signature piece',
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
    accent: '#3046a2',
    surface: '#e5e8ec',
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
    accent: '#daca77',
    surface: '#efeadf',
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
    accent: '#c6372d',
    surface: '#eee3de',
    description:
      'Roșu fără frână, linii de viteză și croială care ține pasul cu tine.',
    badge: 'Pure energy',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
]

export const featuredProduct = products[0]

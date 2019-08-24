export default {
  code: 'flight_potion',
  name: 'Зелье Полёта',
  description: `Захожу на цель!!! Играть в любой бой. +5 любой стороне. Разовая шмотка`,
  properties: [
    {
      type: 'buff',
      effect: 'damage',
      bonus: 5,
      target: 'all',
    },
  ],
  kind: 'treasure',
  type: 'single',
  charges: 1,
  cost: 300,
  collection: 'classic',
}

export default {
  code: 'flight_potion',
  name: 'Зелье Полёта',
  description: `Захожу на цель!!! Играть в любой бой. +5 любой стороне.
  Разовая шмотка`,
  properties: [
    {
      type: 'buff',
      bonus: {
        type: 'damage',
        bonus: 5,
        target: 'all',
      }
    },
  ],
  type: 'treasure',
  subType: 'single',
  cost: 300,
  collection: 'classic',
}

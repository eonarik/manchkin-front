export default {
  code: 'wild_axe',
  name: 'Дикий топор',
  type: 'treasure',
  subType: 'bigItem',
  bonus: 5,
  bodyParts: ['rightHand', 'leftHand'],
  rules: [
    {
      condition: ({ cls }) => cls === 'warrior',
      description: 'Только для Воинов.',
    },
  ],
  cost: 800,
  collection: 'classic',
}

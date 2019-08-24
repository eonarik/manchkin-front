export default {
  code: 'wild_axe',
  name: 'Дикий топор',
  kind: 'treasure',
  type: 'bigItem',
  bonus: 5,
  bodyParts: ['rightHand', 'leftHand'],
  rules: [
    {
      type: 'cls',
      value: 'warrior',
      description: 'Только для Воинов.',
    },
  ],
  cost: 800,
  collection: 'classic',
}

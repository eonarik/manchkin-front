export default {
  code: 'funny_looking_sword',
  name: 'Меч забавной формы',
  kind: 'treasure',
  type: 'smallItem',
  bonus: 4,
  bodyParts: ['rightHand', 'leftHand'],
  rules: [
    {
      type: 'hasCard',
      value: 'orc',
      description: 'Только для Орков.',
    },
  ],
  cost: 600,
  collection: 'classic',
}

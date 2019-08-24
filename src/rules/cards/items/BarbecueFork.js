export default {
  code: 'barbecue_fork',
  name: 'Вилка-кормилка',
  kind: 'treasure',
  type: 'smallItem',
  bonus: 3,
  bodyParts: ['rightHand', 'leftHand'],
  rules: [
    {
      type: 'hasCard',
      value: 'halfling',
      description: 'Только для Хафлингов.',
    },
  ],
  cost: 400,
  collection: 'classic',
}

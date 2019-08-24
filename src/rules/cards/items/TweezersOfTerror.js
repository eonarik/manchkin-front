export default {
  code: 'tweezers_of_terror',
  name: 'Пинцет Террора',
  kind: 'treasure',
  type: 'smallItem',
  bonus: 3,
  bodyParts: ['rightHand', 'leftHand'],
  rules: [
    {
      type: 'hasCard',
      value: 'elven',
      description: 'Только для Эльфов.',
    },
  ],
  cost: 400,
  collection: 'classic',
}

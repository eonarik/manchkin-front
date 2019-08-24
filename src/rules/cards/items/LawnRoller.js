export default {
  code: 'lawn_roller',
  name: 'Укатайка',
  kind: 'treasure',
  type: 'bigItem',
  bonus: 4,
  bodyParts: ['rightHand', 'twoHands'],
  blockedSlots: ['leftHand'],
  rules: [
    {
      type: 'hasCard',
      value: 'dwarf',
      description: 'Только для Дварфов.',
    },
  ],
  cost: 400,
  collection: 'classic',
}

export default {
  code: 'slug_thrower',
  name: 'Слизнемет',
  kind: 'treasure',
  type: 'smallItem',
  bonus: 5,
  bodyParts: ['rightHand', 'twoHands'],
  blockedSlots: ['leftHand'],
  rules: [
    {
      type: 'hasCard',
      value: 'orc',
      description: 'Только для Орков.',
    },
  ],
  cost: 800,
  collection: 'classic',
}

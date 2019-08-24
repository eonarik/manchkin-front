export default {
  code: 'familiar',
  name: 'Фамильярик',
  kind: 'treasure',
  type: 'smallItem',
  bonus: 3,
  bodyParts: ['offSlot'],
  rules: [
    {
      type: 'hasCard',
      value: 'wizard',
      description: 'Только для Волшебников.',
    },
  ],
  cost: 400,
  collection: 'classic',
}

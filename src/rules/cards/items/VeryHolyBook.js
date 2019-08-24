export default {
  code: 'very_holy_book',
  name: 'Пресвятая книга',
  kind: 'treasure',
  type: 'bigItem',
  bonus: 3,
  bodyParts: ['offSlot'],
  rules: [
    {
      type: 'hasCard',
      value: 'priest',
      description: 'Только для Клириков.',
    },
  ],
  cost: 400,
  collection: 'classic',
}

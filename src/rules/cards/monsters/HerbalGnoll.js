export default {
  code: 'herbal_gnoll',
  level: 7,
  name: 'Травяной гнолль',
  kind: 'door',
  type: 'monster',
  properties: [
    {
      type: 'buff',
      effect: 'level',
      value: 5,
      target: 'self',
      description: `+5 против людей.`,
    },
  ],
  badStuff: [
    {
      type: 'curse',
      effect: 'level',
      value: -3,
      target: 'enemy',
      description: `Теряешь 3 уровня, за каждое <b>немедленно</b> сброшенное зелье можешь вернуть один уровень.`,
    },
  ],
  rewards: {
    treasures: 2,
    levels: 1,
  },
  collection: 'classic',
}

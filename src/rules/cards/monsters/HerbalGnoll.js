export default {
  code: 'herbal_gnoll',
  level: 7,
  name: 'Травяной гнолль',
  type: 'door',
  subType: 'monster',
  properties: [
    {
      type: 'buff',
      condition: ({ race }) => race === 'human',
      bonus: {
        type: 'level',
        value: 5,
        target: 'self',
      },
      description: `+5 против людей.`,
    },
  ],
  judgement: [
    {
      type: 'curse',
      bonus: {
        type: 'level',
        value: -3,
        target: 'enemy',
      },
      description: `Теряешь 3 уровня, за каждое <b>немедленно</b> 
      сброшенное зелье можешь вернуть один уровень.`,
    },
  ],
  treasures: 2,
  collection: 'classic',
}

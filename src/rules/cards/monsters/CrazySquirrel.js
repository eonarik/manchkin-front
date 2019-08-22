export default {
  code: 'crazy_squirrel',
  level: 3,
  name: 'Психобелка',
  description: `На женщин и носителей Шипованных гульфиков не нападает.`,
  type: 'door',
  subType: 'monster',
  properties: [
    {
      type: 'peace',
      condition: ({ gender }) => gender === 'female',
    },
  ],
  judgement: [
    {
      type: 'curse',
      bonus: {
        type: 'level',
        value: -1,
        target: 'enemy',
      },
      description: 'Теряешь уровень. До следующего своего хода говори писклявым голосом.',
    },
  ],
  treasures: 1,
  collection: 'classic',
}
export default {
  code: 'crazy_squirrel',
  level: 3,
  name: 'Психобелка',
  description: `На женщин и носителей Шипованных гульфиков не нападает.`,
  kind: 'door',
  type: 'monster',
  badStuff: [
    {
      type: 'curse',
      effect: 'level',
      value: -1,
      target: 'enemy',
      description: 'Теряешь уровень. До следующего своего хода говори писклявым голосом.',
    },
  ],
  rewards: {
    treasures: 1,
    levels: 1,
  },
  collection: 'classic',
}
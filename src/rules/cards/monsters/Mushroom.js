export default {
  code: 'mushroom',
  level: 5,
  name: 'Грибок',
  kind: 'door',
  type: 'monster',
  properties: [
    {
      type: 'buff',
      rules: [
        {
          type: 'buff',
          target: 'self',
          value: 'titan',
        },
      ],
      effect: 'level',
      value: 15,
      target: 'self',
      description: `Если грибка сделать Амбалом, он получит 25 уровней, а не обычные 10! С такой прибавкой придется считаться даже заядлым грибникам.`,
    },
  ],
  badStuff: [
    {
      type: 'curse',
      effect: 'level',
      value: -1,
      target: 'enemy',
      rules: [
        {
          type: 'race',
          operand: 'not in',
          value: 'elven',
        },
      ],
    },
    {
      type: 'curse',
      effect: 'level',
      value: -2,
      target: 'enemy',
      rules: [
        {
          type: 'race',
          value: 'elven',
        },
      ],
      description: 'Эльф теряет 2 уровня, любой другой манчкин теряет 1 уровень. Грибок-Амбал причиняет вдвое больший урон.',
    },
  ],
  rewards: {
    treasures: 2,
    levels: 1,
  },
  collection: 'classic',
}
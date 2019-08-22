export default {
  code: 'mushroom',
  level: 5,
  name: 'Грибок',
  type: 'door',
  subType: 'monster',
  properties: [
    {
      type: 'buff',
      condition: (enemy, { buffs }) => buffs.find(({ code }) => code === 'titan'),
      bonus: {
        type: 'level',
        value: 15,
        target: 'self',
      },
      description: `Если грибка сделать Амбалом, 
      он получит 25 уровней, а не обычные 10! 
      С такой прибавкой придется считаться даже заядлым грибникам.`,
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
      condition: ({ race }) => race !== 'elven',
    },
    {
      type: 'curse',
      bonus: {
        type: 'level',
        value: -2,
        target: 'enemy',
      },
      condition: ({ race }) => race === 'elven',
      description: 'Эльф теряет 2 уровня, любой другой манчкин теряет 1 уровень. Грибок-Амбал причиняет вдвое больший урон.',
    },
  ],
  treasures: 2,
  collection: 'classic',
}
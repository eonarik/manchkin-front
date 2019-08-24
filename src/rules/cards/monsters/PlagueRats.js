export default {
  code: 'plague_rats',
  level: 5,
  name: 'Чумные крысы',
  description: `От Орков бегут быстрее, чем набрасываются на всех прочих!\nОркам сокровища крыс без боя достаются, а с другими надо биться, а то и смываться со штрафом -1.`,
  kind: 'door',
  type: 'monster',
  properties: [
    {
      type: 'peace',
      target: 'enemy',
      rules: [
        {
          type: 'race',
          value: 'orc',
        },
      ],
    },
    {
      type: 'buff',
      effect: 'runaway',
      value: -1,
      target: 'enemy',
    },
  ],
  badStuff: [
    {
      type: 'curse',
      effect: 'level',
      value: -2,
      target: 'enemy',
      description: 'Теряешь 2 уровня.',
    },
  ],
  rewards: {
    treasures: 2,
    levels: 1,
  },
  collection: 'classic',
}
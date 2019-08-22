export default {
  code: 'plague_rats',
  level: 5,
  name: 'Чумные крысы',
  description: `От Орков бегут быстрее, чем набрасываются на всех прочих!<br />
  Оркам сокровища крыс без боя достаются, а с другими надо биться,
  а то и смываться со штрафом -1.`,
  type: 'door',
  subType: 'monster',
  properties: [
    {
      type: 'peace',
      condition: ({ race }) => race === 'orc',
      target: 'enemy',
    },
    {
      type: 'buff',
      bonus: {
        type: 'runaway',
        value: -1,
        target: 'enemy',
      },
    },
  ],
  judgement: [
    {
      type: 'curse',
      bonus: {
        type: 'level',
        value: -2,
        target: 'enemy',
      },
      description: 'Теряешь 2 уровня.',
    },
  ],
  treasures: 2,
  collection: 'classic',
}
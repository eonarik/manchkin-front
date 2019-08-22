export default {
  code: 'teddy_bear',
  level: 5,
  name: 'Плюшевый мишка',
  description: 'Омерзительно мил.',
  type: 'door',
  subType: 'monster',
  properties: [
    {
      type: 'buff',
      condition: ({ race }) => race !== 'orc',
      bonus: {
        type: 'level',
        value: 5,
        target: 'self',
      },
      description: `+5 против орков.`,
    },
  ],
  judgement: [
    {
      type: 'discard',
      bonus: 'all',
      description: 'Сбрось руку.',
    },
    {
      type: 'treasure',
      bonus: 1,
      condition: ({ discardCount }) => discardCount > 1,
      description: `Если сброшено больше 1 карты, 
      мишка радуется пополнению своей коллекции трофеев, 
      а ты можешь под шумок увести 1 сокровище из его берлоги.`,
      target: 'enemy',
    },
  ],
  treasures: 2,
  collection: 'classic',
}
export default {
  code: 'pinata',
  level: 3,
  name: 'Пиньята',
  description: `Побитая Пиньята щедра на подарки! Каждый игрок в указанном тобой порядке тянет в открытую карту Сокровища. А кто разбил Пиньяту, значения не имеет.`,
  kind: 'door',
  type: 'monster',
  badStuff: [
    {
      type: 'buff',
      effect: 'discard',
      cardTypes: ['smallItem', 'bigItem'],
      selectTarget: 'leftPlayer',
      value: 1,
      target: 'enemy',
      description: 'Игрок слева от тебя выбирает одну шмотку у тебя в игре. Сбрось ее.',
    },
  ],
  rewards: {
    treasures: {
      target: 'all',
      value: 1,
    },
    levels: 1,
  },
  collection: 'classic',
}
export default {
  code: 'pinata',
  level: 3,
  name: 'Пиньята',
  description: `Побитая Пиньята щедра на подарки! 
  Каждый игрок в указанном тобой порядке тянет в открытую карту Сокровища. 
  А кто разбил Пиньяту, значения не имеет.`,
  type: 'door',
  subType: 'monster',
  judgement: [
    {
      type: 'buff',
      bonus: {
        type: 'discard',
        cardTypes: ['smallItem', 'bigItem'],
        selectTarget: 'leftPlayer',
        value: 1,
        target: 'enemy',
      },
      description: 'Игрок слева от тебя выбирает одну шмотку у тебя в игре. Сбрось ее.',
    },
  ],
  treasures: {
    target: 'all',
    value: 1,
  },
  collection: 'classic',
}
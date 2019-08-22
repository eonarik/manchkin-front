export default {
  code: 'werewolf_turtle',
  level: 3,
  name: 'Черепаха-оборотень',
  description: `Ооочень мееедленный преследователь. +2 к Смывке.`,
  type: 'door',
  subType: 'monster',
  properties: [
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
        type: 'discard',
        value: -1,
        cardTypes: 'race',
        target: 'enemy',
      },
      description: `Если тебя даже Черепахи-оборотни догоняют, 
      тебя из рядов своей расы изгоняют. Простой человек влиянию не поддается, 
      а Полукровка теряет 1 нечеловеческую расу.`,
    },
  ],
  treasures: 2,
  collection: 'classic',
}
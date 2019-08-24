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
      effect: 'runaway',
      value: -1,
      target: 'enemy',
    },
  ],
  badStuff: [
    {
      type: 'curse',
      effect: 'discard',
      value: -1,
      cardTypes: 'race',
      target: 'enemy',
      description: `Если тебя даже Черепахи-оборотни догоняют, тебя из рядов своей расы изгоняют. Простой человек влиянию не поддается, а Полукровка теряет 1 нечеловеческую расу.`,
    },
  ],
  rewards: {
    treasures: 2,
    levels: 1,
  },
  collection: 'classic',
}
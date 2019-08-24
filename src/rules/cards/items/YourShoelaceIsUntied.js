export default {
  code: 'you_shoelace_is_untied',
  name: 'У тебя шнурок развязался!',
  description: `Жертв этого бородатого розынрыша не сосчитаешь, а он до сих пор работает.\nИграть в любой бой. +3 любой стороне. Разовый прикол.`,
  properties: [
    {
      type: 'buff',
      effect: 'damage',
      value: 3,
      target: ['monster', 'player'],
    },
  ],
  kind: 'treasure',
  type: 'single',
  charges: 1,
  collection: 'classic',
}

export default {
  code: 'you_shoelace_is_untied',
  name: 'У тебя шнурок развязался!',
  description: `<center>Жертв этого бородатого розынрыша не сосчитаешь, а он до сих пор работает.<br />
  Играть в любой бой. +3 любой стороне. Разовый прикол.</center>`,
  properties: [
    {
      type: 'buff',
      bonus: {
        type: 'damage',
        value: 3,
        target: ['monster', 'player'],
      },
    },
  ],
  type: 'treasure',
  subType: 'single',
  collection: 'classic',
}

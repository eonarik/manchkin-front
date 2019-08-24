export default {
  code: 'boom_dagger',
  name: 'Бум-Дага',
  description: `Если этот кинжал украден, отнят проклятием или продан за уровни, в начале следующего хода он вернётся к хозяину. Мародёрство, обмен или передача привяжут Бум-дагу к новому владельцу. Выйти из игры кинжал может, если его не сняли с тела умершего хозяина или из-за непотребства.`,
  kind: 'treasure',
  type: 'smallItem',
  bonus: 1,
  bodyParts: ['offSlot'],
  rules: [
    {
      type: 'hasCard',
      value: 'rogue',
      description: 'Только для Воров.',
    },
  ],
  cost: 100,
  collection: 'classic',
}

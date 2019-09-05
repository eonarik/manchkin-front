export default ({
  state,
}) => {
  // раздаем всем игрокам по 4 карты сокровищ и 4 карты дверей
  // принадлежность игроку будет определяться свойством playerIndex
  const playersCount = state.playersCount;
  for (let i = 0; i < playersCount; i++) {
    for (let j = 0; j < 4; j++) {
      // вытащим первую ничейную карту двери
      let card = state.mixDeck.find((card) => card.playerIndex === undefined && card.kind === 'door');
      // установим кому принадлежит карта
      card && Object.assign(card, {
        playerIndex: i,
      });
    }
    for (let j = 0; j < 4; j++) {
      // вытащим первую ничейную карту сокровищ
      let card = state.mixDeck.find((card) => card.playerIndex === undefined && card.kind === 'treasure');
      // установим кому принадлежит карта
      card && Object.assign(card, {
        playerIndex: i,
      });
    }
  }

  // only for test!
  // const handDeck = ['cute_shoulder_dragon', 'spiked_codpeice'];
  // // const handDeck = ['sanctified_hammer_of_saint', 'wild_axe', 'hand_slider'];
  // // const handDeck = ['super_manchkin', 'rogue', 'warrior', 'wizard'];
  // // const handDeck = ['mongrel', 'orc', 'dwarf', 'elven'];
  // for (let i = 0; i < handDeck.length; i++) {
  //   let card = mixDeck.find((card) => card.code === handDeck[i]);
  //   card.playerIndex = 0;
  // }
  return {
    ...state,
  }
}

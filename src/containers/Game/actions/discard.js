export default ({
  state,
  payload: {
    id: cardId,
  },
}) => {
  let card = state.mixDeck.find((card) => card.id === cardId);
  // сбросим принадлежность карты
  // тем самым удаляя из руки или инвентаря
  // а также все временные свойства
  delete card.playerIndex;
  delete card.makedSlot;
  delete card.actualDamage;
  // добавим карту в сброс
  state.trashDeck.push(card);
  // также удалим карту из используемых карт
  let index = state.mixDeck.indexOf(card);
  if (index !== -1) {
    state.mixDeck.splice(index, 1);
  }
  return {
    ...state,
  }
}

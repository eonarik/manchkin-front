import { makeItem } from '../utils';

export default ({
  state,
  payload: {
    id: cardId,
    bodyPart,
  },
}) => {
  const selfDeck = state.mixDeck.filter(
    (card) => card.playerIndex === state.selfPlayerIndex
  );
  const selfPlayer = state.players[state.selfPlayerIndex];

  let newItem = state.mixDeck.find((card) => card.id === cardId);
  let {
    bodyParts,
    makedSlot,
    type: cardType,
  } = newItem;

  // входит ли шмотка в список допустимых для одевания предметов
  if (
    ['buff', 'cls', 'race', 'curse', 'offSlot'].indexOf(cardType) !== -1
    || (bodyParts && bodyParts.length)
  ) {
    // если указано, куда нужно одеть шмотку
    if (bodyPart) {
      if (
        // слот не должен быть заблокированным
        selfPlayer.blockedSlots.indexOf(bodyPart) === -1
        // шмотка не должна быть уже одетой на этот слот
        && makedSlot !== bodyPart
        // шмотка должна соответствовать слоту
        && (
          bodyParts && bodyParts.length
            ? bodyParts.indexOf(bodyPart) !== -1
            : bodyPart === cardType
        )
      ) {
        // надеваем шмотку
        makeItem({
          card: newItem,
          bodyPart,
          selfDeck,
          selfPlayer,
        });
      } else {
        // при неудаче НЕ обновляем стейты
        return state;
      }
    } else {
      // если не указано куда одевать, смотрим по типу карты
      makeItem({
        card: newItem,
        bodyPart: cardType,
        selfDeck,
        selfPlayer,
      });
    }
  } else {
    // при неудаче НЕ обновляем стейты
    return state;
  }
  return {
    ...state,
  };
}

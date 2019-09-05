import { shuffleArray } from 'utils';

export default ({
  state,
}) => {
  // перемешаем колоду, заодно добавим id для каждой карты
  const mixDeck = shuffleArray(state.mixDeck).map(
    (item) => ({ ...item, id: Math.random(), })
  );
  return {
    ...state,
    mixDeck,
  }
}

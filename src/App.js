import React, { createContext, useReducer } from 'react';

import Board from 'containers/Board';

import cards from 'rules/cards';
import { shuffleArray } from 'utils';

export const AppContext = createContext();

// начало игры. размешиваем колоду
const allCardsArray = Object.values(cards);

// перемешаем колоду, заодно добавим id для каждой карты
const mixDeck = shuffleArray(allCardsArray).map(
  (item) => ({ ...item, id: Math.random(), })
);

// раздаем всем игрокам по 4 карты сокровищ и 4 карты дверей
// принадлежность игроку будет определяться свойством playerIndex
const playersCount = 2;
for (let i = 0; i < playersCount; i++) {
  for (let j = 0; j < 4; j++) {
    // вытащим первую ничейную карту двери
    let card = mixDeck.find((card) => card.playerIndex === undefined && card.kind === 'door');
    // установим кому принадлежит карта
    card && Object.assign(card, {
      playerIndex: i,
    });
  }
  for (let j = 0; j < 4; j++) {
    // вытащим первую ничейную карту сокровищ
    let card = mixDeck.find((card) => card.playerIndex === undefined && card.kind === 'treasure');
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

// проинициализируем всех игрроков
const players = [];
for (let i = 0; i < playersCount; i++) {
  players.push({
    level: 1,
    gender: 'male',
    blockedSlots: [],
  });
}

// interface Buff {
//   card: String;
//   duration: Number;
// }
const initialState = {
  draggedCard: null,
  // индекс игрока
  selfPlayerIndex: 0,
  trashDeck: [],
  players,
  mixDeck,
};

function appReducer(state, { type, payload }) {
  const selfDeck = mixDeck.filter(
    (card) => card.playerIndex === state.selfPlayerIndex
  );
  const selfPlayer = state.players[state.selfPlayerIndex];

  const returnCardsToHand = (cards = []) => {
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      // разблокируем слоты, занятые надетыми шмотками
      if (
        card.blockedSlots && card.blockedSlots.length
        && selfPlayer.blockedSlots.length
      ) {
        for (let j = 0; j < card.blockedSlots.length; j++) {
          let index = selfPlayer.blockedSlots.indexOf(card.blockedSlots[j]);
          if (index !== -1) {
            selfPlayer.blockedSlots.splice(index, 1);
          }
        }
      }
      // уберем карты в руку
      // убирая свойство makedSlot
      delete card.makedSlot;
      delete card.actualDamage;
    }
  }
  const makeItem = (card, bodyPart) => {
    // проверим есть ли уже шмотки в указанном слоте
    // исключение - слот offSlot
    let makedItems = selfDeck.filter((card) => card.makedSlot === bodyPart);
    if (bodyPart !== 'offSlot' && makedItems && makedItems.length) {
      // специальные условия
      // суперманчкин - позволяет надеть сразу два класса
      let isSuperManchkin = (
        selfDeck.find((card) => card.code === 'super_manchkin' && card.makedSlot)
        && bodyPart === 'cls'
        && makedItems.length <= 1
      );
      // полукровка - позволяет иметь две расы
      let isMongrel = (
        selfDeck.find((card) => card.code === 'mongrel' && card.makedSlot)
        && bodyPart === 'race'
        && makedItems.length <= 1
      );
      // в шмотке стоит статус combine - можно совмещать с другими шмотками
      let isCombine = (
        card.combine
      );
      if (!isSuperManchkin && !isMongrel && !isCombine) {
        // вернем в руку
        returnCardsToHand(makedItems);
      }
    }
    // надеваем шмотку
    card.makedSlot = bodyPart;
    // блокируем слоты
    if (card.blockedSlots && card.blockedSlots.length) {
      for (let j = 0; j < card.blockedSlots.length; j++) {
        selfPlayer.blockedSlots.push(card.blockedSlots[j]);
      }
      // шмотки в заблокированных слотах прячем в руку
      let itemsOfBlockedSlot = selfDeck.filter(
        (card) => selfPlayer.blockedSlots.indexOf(card.makedSlot) !== -1
      );
      if (itemsOfBlockedSlot && itemsOfBlockedSlot.length) {
        returnCardsToHand(itemsOfBlockedSlot);
      }
    }
    // актуализируем дамаг шмотки
    const bonus = card.bonus;
    let actualDamage = 0;
    if (typeof bonus === 'object') {
      // { type, value }
      if (bonus.type && bonus.type === 'damage') {
        actualDamage += parseInt(bonus.value);
      }
      // { male, female }
      if (bonus.male || bonus.female) {
        actualDamage += parseInt(bonus[selfPlayer.gender] || 0);
      }
    } else {
      actualDamage += parseInt(bonus);
    }
    if (actualDamage > 0) {
      card.actualDamage = actualDamage;
    }
  }

  switch (type) {
    case 'makeNewItem':
      let {
        id: cardId,
        bodyPart,
      } = payload;
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
            makeItem(newItem, bodyPart);
          } else {
            // при неудаче НЕ обновляем стейты
            return state;
          }
        } else {
          // если не указано куда одевать, смотрим по типу карты
          makeItem(newItem, cardType);
        }
      } else {
        // при неудаче НЕ обновляем стейты
        return state;
      }
      return {
        ...state,
      };
    case 'setDraggedCard':
      // console.log({...payload})
      return {
        ...state,
        draggedCard: payload,
      };
    case 'discard':
      let card = state.mixDeck.find((card) => card.id === payload.id);
      // сбросим принадлежность карты
      // тем самым удаляя из руки или инвентаря
      delete card.playerIndex;
      delete card.makedSlot;
      delete card.actualDamage;
      // добавим карту в сброс
      state.trashDeck.push(card);
      // также удалим карту из используемых карт
      let index = mixDeck.indexOf(card);
      if (index !== -1) {
        mixDeck.splice(index, 1);
      }
      return {
        ...state,
      }
    default:
      throw new Error();
  }
}

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const callbacks = {
    // одеть предмет на часть тела
    makeNewItem: (id, bodyPart) => dispatch({
      type: 'makeNewItem',
      payload: {
        bodyPart,
        id,
      },
    }),
    // какая карта перемещается с помощью драг эн дроп
    setDraggedCard: (card) => dispatch({
      type: 'setDraggedCard',
      payload: card,
    }),
    // сбросить карту
    discard: (id) => dispatch({
      type: 'discard',
      payload: {
        id,
      },
    }),
  };

  return (
    <AppContext.Provider value={{
      ...appState,
      ...callbacks,
    }}>
      <Board />
    </AppContext.Provider>
  );
}

export default App;

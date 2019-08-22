import React, { createContext, useReducer } from 'react';

import Board from 'containers/Board';

import cards from 'rules/cards';
import { shuffleArray } from 'utils';

export const AppContext = createContext();

// начало игры. размешиваем колоду
const allCardsArray = Object.values(cards);
// удвоим карты
allCardsArray.push(...allCardsArray);
// allCardsArray.push(...allCardsArray);

const mixDeckDoors = shuffleArray(
  allCardsArray
    // выберем только двери
    .filter(({ type }) => type === 'door')
    .map((item) => ({ id: Math.random(), ...item }))
);
const mixDeckTreasures = shuffleArray(
  allCardsArray
    // выберем только сокровища
    .filter(({ type }) => type === 'treasure')
    .map((item) => ({ id: Math.random(), ...item }))
);

// раздаем всем игрокам по 4 карты сокровищ и 4 карты дверей
const handDecks = [];
for (let i = 0; i < 4; i++) {
  // даем карту дверей i-му игроку
  for (let j = 0; j < 4; j++) {
    if (!handDecks[i]) handDecks[i] = [];
    mixDeckDoors.length && handDecks[i].push(mixDeckDoors.shift());
  }
  // даем карту сокровищ i-му игроку
  for (let j = 0; j < 4; j++) {
    if (!handDecks[i]) handDecks[i] = [];
    mixDeckTreasures.length && handDecks[i].push(mixDeckTreasures.shift());
  }
}

// only for testing!
handDecks[2] = [];
handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'mongrel'), id: Math.random() });
handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'orc'), id: Math.random() });
handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'dwarf'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'super_manchkin'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'rogue'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'warrior'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'hand_slider'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'rogue'), id: Math.random() });
// handDecks[2].push({ ...mixDeckDoors.find((card) => card.code === 'orc'), id: Math.random() });
// handDecks[2].push({ ...mixDeckTreasures.find((card) => card.code === 'wild_axe'), id: Math.random() });
// handDecks[2].push({ ...mixDeckTreasures.find((card) => card.code === 'rear_view_helmet'), id: Math.random() });
// handDecks[2].push({ ...mixDeckTreasures.find((card) => card.code === 'raincoat'), id: Math.random() });
// handDecks[2].push({ ...mixDeckTreasures.find((card) => card.code === 'sanctified_hammer_of_saint'), id: Math.random() });

// interface Buff {
//   card: String;
//   duration: Number;
// }
const initialState = {
  draggedCard: null,
  // индекс игрока
  selfPlayerIndex: 2,
  player: {
    level: 1,
    slots: {
      items: {
        head: {
          cards: [],
          blocked: false,
        },
        body: {
          cards: [],
          blocked: false,
        },
        rightHand: {
          cards: [],
          blocked: false,
        },
        leftHand: {
          cards: [],
          blocked: false,
        },
        foot: {
          cards: [],
          blocked: false,
        },
      },
      buffs: [],
      curses: [],
      race: [],
      cls: [],
    },
  },
  trashDeckDoors: [],
  trashDeckTreasures: [],
  handDecks,
  mixDeckDoors,
  mixDeckTreasures,
};

function appReducer(state, { type, payload }) {
  let selfDeck = state.handDecks[state.selfPlayerIndex];
  // удаляем c руки
  let removeCardFromHandDeck = (id) => {
    if (selfDeck.find((card) => card.id === id)) {
      for (let j in selfDeck) {
        if (selfDeck[j].id === id) {
          selfDeck.splice(j, 1);
          break;
        }
      }
    }
  }

  switch (type) {
    case 'makeNewItems':
      let {
        newItems,
        bodyPart,
      } = payload;

      for (let i in newItems) {
        let { id, bodyParts, blockedSlots, code, maked, subType } = newItems[i];
        // можно ли предмет одеть и одевается ли он на указанную часть тела
        if (bodyParts && (
          Array.isArray(bodyParts)
            ? bodyParts.indexOf(bodyPart) !== -1
            : bodyParts === bodyPart
        )) {
          let slot = state.player.slots.items[bodyPart];
          // смотрим есть ли шмотка в слоте
          if (slot.cards.length) {
            // вернем надетые шмотки в руку
            selfDeck.push(...slot.cards);
            // разблокируем слоты, заблоченные надетыми шмотками
            for (let j in slot.cards) {
              let card = slot.cards[j];
              if (card.blockedSlots) {
                let unblockSlot = (itemSlot) => {
                  // слот разблокируем,
                  itemSlot.blocked = false;
                }
                if (Array.isArray(card.blockedSlots)) {
                  for (let j in card.blockedSlots) {
                    unblockSlot(state.player.slots.items[card.blockedSlots[j]]);
                  }
                } else {
                  unblockSlot(state.player.slots.items[card.blockedSlots]);
                }
              }
            }
            // а слот очистим
            slot.cards = [];
          }
          // одеваем шмотку
          slot.cards.push(newItems[i]);
          // шмотка может прийти: с руки, с другого слота
          removeCardFromHandDeck(id);
          // удаляем c другого слота
          if (maked) {
            let makedCards = state.player.slots.items[maked].cards;
            for (let j in makedCards) {
              if (makedCards[j].id === id) {
                makedCards.splice(j, 1);
                break;
              }
            }
            newItems[i].maked = undefined;
          }
          // смотрим блокирует ли шмотка другие слоты
          if (blockedSlots) {
            let blockSlot = (itemSlot) => {
              // слот блокируем,
              itemSlot.blocked = true;
              // а надетые на него шмотки вернем в руку
              selfDeck.push(...itemSlot.cards);
              itemSlot.cards = [];
            }
            if (Array.isArray(blockedSlots)) {
              for (let j in blockedSlots) {
                blockSlot(state.player.slots.items[blockedSlots[j]]);
              }
            } else {
              blockSlot(state.player.slots.items[blockedSlots]);
            }
            // TODO: нужно ли? создадим событие на дроп этой шмотки, чтобы разблокировать слот
          }
        }
        // если это карта расы
        if (subType === 'race') {
          let races = state.player.slots.race;
          let buffs = state.player.slots.buffs;
          if (!races.find((item) => item.code === code)) {
            // рас может быть две, только если вы полукровка
            if (buffs.find((item) => item.code === 'mongrel')) {
              races.push(newItems[i]);
            } else {
              // вернем в руку предыдущую расу
              races.length && selfDeck.push(races.shift());
              races.push(newItems[i]);
            }
            // удаляем c руки
            removeCardFromHandDeck(newItems[i].id);
          }
        }
        // если это карта класса
        if (subType === 'cls') {
          let clses = state.player.slots.cls;
          let buffs = state.player.slots.buffs;
          if (!clses.find((item) => item.code === code)) {
            // классов может быть два, только если вы суперманчкин
            if (buffs.find((item) => item.code === 'super_manchkin')) {
              clses.push(newItems[i]);
            } else {
              // вернем в руку предыдущий класс
              clses.length && selfDeck.push(clses.shift());
              clses.push(newItems[i]);
            }
            // удаляем c руки
            removeCardFromHandDeck(newItems[i].id);
          }
        }
        // если это положительный эффект
        if (subType === 'buff') {
          let buffs = state.player.slots.buffs;
          if (!buffs.find((item) => item.code === code)) {
            buffs.push(newItems[i]);
            // удаляем c руки
            removeCardFromHandDeck(newItems[i].id);
          }
        }
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
    case 'trashCard':
      let { trashDeckType, card } = payload;
      if (trashDeckType === 'door') {
        state.trashDeckDoors.push(card);
      }
      if (trashDeckType === 'treasure') {
        state.trashDeckTreasures.push(card);
      }
      removeCardFromHandDeck(card.id);
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
    makeNewItems: (bodyPart, newItems) => dispatch({
      type: 'makeNewItems',
      payload: {
        bodyPart,
        newItems,
      },
    }),
    setDraggedCard: (card) => dispatch({
      type: 'setDraggedCard',
      payload: card,
    }),
    trashCard: (trashDeckType, card) => dispatch({
      type: 'trashCard',
      payload: {
        trashDeckType,
        card,
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

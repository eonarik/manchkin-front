import React, { createContext, useState, useEffect, useReducer } from 'react';

import Board from 'containers/Board';

import cards from 'rules/cards';

import * as actions from './actions';

export const GameContext = createContext();

const allActionsKeys = Object.keys(actions);
const allCardsArray = Object.values(cards);

const playersCount = 2;
// проинициализируем всех игрроков
const players = [];
for (let i = 0; i < playersCount; i++) {
  players.push({
    level: 1,
    gender: 'male',
    blockedSlots: [],
  });
}

const initialState = {
  draggedCard: null,
  mixDeck: allCardsArray,
  // индекс игрока
  selfPlayerIndex: 0,
  trashDeck: [],
  players,
  playersCount,
};

function gameReducer(state, { type, payload }) {
  if (!actions[type]) return state;
  return actions[type]({
    state,
    payload,
  });
}

const Game = () => {
  const [appState, dispatch] = useReducer(gameReducer, initialState);

  // добавим все действия в контекст
  const [callbacks, setCallbacks] = useState(null);
  useEffect(() => {
    const _callbacks = {};
    for (let i = 0, ilen = allActionsKeys.length; i < ilen; i++) {
      const key = allActionsKeys[i];
      Object.assign(_callbacks, {
        [key]: (payload) => dispatch({
          type: key,
          payload,
        })
      });
    }
    setCallbacks(_callbacks);
    // eslint-disable-next-line
  }, []);

  return callbacks && (
    <GameContext.Provider value={{
      ...appState,
      ...callbacks,
    }}>
      <Board />
    </GameContext.Provider>
  );
}

export default Game;

import React, { useContext, useState } from "react";

import Deck from 'components/Deck';
import Card from 'components/Card';
import Manchkin from 'containers/Manchkin';

import { AppContext } from 'App';

import './board.scss';

const Board = () => {
  const [dummyOpened, setDummyOpened] = useState(false);
  const {
    player: {
      level,
      slots: {
        items,
      },
    },
    selfPlayerIndex,
    setDraggedCard,
    handDecks,
  } = useContext(AppContext);

  let summaryDamage = level;
  for (let key in items) {
    if (items[key].cards.length) {
      summaryDamage += items[key].cards.reduce(
        (sum, cur) => typeof cur.bonus === 'object'
          ? sum + cur.bonus.value
          : sum + (cur.bonus || 0),
        0,
      );
    }
  }

  return (
    <>
      <div
        className="c-board"
        onDragEnd={() => setDraggedCard(null)}
      >
        {handDecks.map((handDeck, playerIndex) => (
          <div key={playerIndex} className="c-board__box">
            {handDeck.map((card, j) => (
              <Card
                key={card.id}
                {...card}
                open={selfPlayerIndex === playerIndex}
                animated={selfPlayerIndex === playerIndex}
                position={selfPlayerIndex === playerIndex ? 'bottom' : 'top'}
              />
            ))}
            {selfPlayerIndex === playerIndex && (
              <div
                className="c-board__box__dummy"
                onClick={() => setDummyOpened(!dummyOpened)}
              >
                Вы Mанчкин {summaryDamage} уровня
              </div>
            )}
          </div>
        ))}
        <div className="c-board__game">
          <Deck />
        </div>
      </div>

      <Manchkin
        close={() => setDummyOpened(false)}
        showed={dummyOpened}
      />
    </>
  );
}

export default Board;

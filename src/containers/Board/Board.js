import React, { useContext, useState } from "react";

import Deck from 'components/Deck';
import Card from 'components/Card';
import Manchkin from 'containers/Manchkin';

import { AppContext } from 'App';

import './board.scss';

const Board = () => {
  const [dummyOpened, setDummyOpened] = useState(false);
  const {
    selfPlayerIndex,
    setDraggedCard,
    handDecks,
  } = useContext(AppContext);

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
              >M</div>
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

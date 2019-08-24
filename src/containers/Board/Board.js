import React, { useContext, useState } from "react";

import Deck from 'components/Deck';
import Card from 'components/Card';
import Manchkin from 'containers/Manchkin';

import { AppContext } from 'App';

import './board.scss';

const Board = () => {
  const [dummyOpened, setDummyOpened] = useState(false);
  const {
    discard,
    makeNewItem,
    mixDeck,
    players,
    selfPlayerIndex,
    setDraggedCard,
  } = useContext(AppContext);

  return (
    <>
      <div
        className="c-board"
        onDragEnd={() => setDraggedCard(null)}
      >
        {players.map((player, playerIndex) => (
          <div key={playerIndex} className="c-board__box">
            {selfPlayerIndex === playerIndex && (
              <div
                className="c-board__box__dummy"
                onClick={() => setDummyOpened(!dummyOpened)}
              >
                Вы Mанчкин {player.level} уровня
            </div>
            )}
            <div className="c-board__box__inner">
              {mixDeck.filter((card) => card.playerIndex === playerIndex && !card.makedSlot).map((card, j) => (
                <Card
                  key={card.id}
                  {...card}
                  onClick={() => makeNewItem(card.id, card.bodyParts && card.bodyParts[0])}
                  onClose={selfPlayerIndex === card.playerIndex ? () => discard(card.id) : null}
                  open={selfPlayerIndex === playerIndex}
                  animated={selfPlayerIndex === playerIndex}
                  position={selfPlayerIndex === playerIndex ? 'bottom' : 'top'}
                />
              ))}
            </div>
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

import React, { useContext, useState, useEffect } from "react";

import Deck from 'components/Deck';
import Card from 'components/Card';
import Manchkin from 'containers/Manchkin';

import { GameContext } from 'containers/Game';

import './board.scss';

const Board = () => {
  const [dummyOpened, setDummyOpened] = useState(false);
  const {
    discard,
    makeNewItem,
    mixDeck,
    players,
    shuffleDeck,
    selfPlayerIndex,
    setDraggedCard,
    startHandOutCards,
  } = useContext(GameContext);

  useEffect(() => {
    // размешаем колоду
    shuffleDeck();
    // раздадим по стартовому набору
    startHandOutCards();
    // eslint-disable-next-line
  }, []);

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
                  onClick={() => makeNewItem({
                    id: card.id,
                    bodyPart: card.bodyParts && card.bodyParts[0]
                  })}
                  onClose={selfPlayerIndex === card.playerIndex ? () => discard(card) : null}
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

      {dummyOpened && (
        <Manchkin
          close={() => setDummyOpened(false)}
          showed={dummyOpened}
        />
      )}
    </>
  );
}

export default Board;

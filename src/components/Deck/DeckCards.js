import React, { useContext } from 'react';

import Card from 'components/Card';

import { GameContext } from 'containers/Game';

const DeckCards = ({
  kind,
  cards,
  open,
}) => {
  const {
    draggedCard,
    discard,
  } = useContext(GameContext);

  const dragDrop = () => {
    discard(draggedCard);
  }
  const dragEnter = (event) => {
    event.preventDefault();
    return true;
  }
  const dragOver = (event) => {
    event.preventDefault();
  }

  return (
    <div
      className="c-deck__card"
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDrop={dragDrop}
    >
      <Card
        kind={kind}
        {...cards[cards.length - 1]}
        empty={!cards || !cards.length}
        open={open}
        scalable={false}
      />
      <div className="c-deck__card__count">
        {(cards && cards.length) || 0}
      </div>
    </div>
  );
}

export default DeckCards;

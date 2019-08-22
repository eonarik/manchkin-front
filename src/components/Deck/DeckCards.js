import React from 'react';

import Card from 'components/Card';

const DeckCards = ({
  cards,
  open,
  type,
}) => {
  return (
    <div className="c-deck__card">
      <Card
        type={type}
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

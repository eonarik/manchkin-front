import React, { useContext } from 'react';

import DeckCards from './DeckCards';

import { GameContext } from 'containers/Game';

import './deck.scss';

const Deck = () => {
  const {
    mixDeck,
    trashDeck,
  } = useContext(GameContext);
  return (
    <div className="c-deck">
      <DeckCards
        kind={'door'}
        cards={trashDeck.filter((card) => card.kind === 'door' && card.playerIndex === undefined)}
        open
      />
      <DeckCards
        kind={'door'}
        cards={mixDeck.filter((card) => card.kind === 'door' && card.playerIndex === undefined)}
      />
      <DeckCards
        kind={'treasure'}
        cards={mixDeck.filter((card) => card.kind === 'treasure' && card.playerIndex === undefined)}
      />
      <DeckCards
        kind={'treasure'}
        cards={trashDeck.filter((card) => card.kind === 'treasure' && card.playerIndex === undefined)}
        open
      />
    </div>
  );
}

export default Deck;

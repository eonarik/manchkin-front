import React, { useContext } from 'react';

import DeckCards from './DeckCards';

import { AppContext } from 'App';

import './deck.scss';

const Deck = () => {
  const {
    mixDeck,
    trashDeck,
  } = useContext(AppContext);
  return (
    <div className="c-deck">
      <DeckCards type={'door'} cards={trashDeck.filter((card) => card.kind === 'door')} open />
      <DeckCards type={'door'} cards={mixDeck.filter((card) => card.kind === 'door')} />
      <DeckCards type={'treasure'} cards={mixDeck.filter((card) => card.kind === 'treasure')} />
      <DeckCards type={'treasure'} cards={trashDeck.filter((card) => card.kind === 'treasure')} open />
    </div>
  );
}

export default Deck;

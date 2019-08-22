import React, { useContext } from 'react';

import DeckCards from './DeckCards';

import { AppContext } from 'App';

import './deck.scss';

const Deck = () => {
  const {
    mixDeckDoors,
    mixDeckTreasures,
    trashDeckDoors,
    trashDeckTreasures,
  } = useContext(AppContext);
  return (
    <div className="c-deck">
      <DeckCards type={'door'} cards={trashDeckDoors} open />
      <DeckCards type={'door'} cards={mixDeckDoors} />
      <DeckCards type={'treasure'} cards={mixDeckTreasures} />
      <DeckCards type={'treasure'} cards={trashDeckTreasures} open />
    </div>
  );
}

export default Deck;

import React, { useContext } from 'react';

import DeckCards from './DeckCards';

import { AppContext } from 'App';

import './deck.scss';

const Deck = () => {
  const {
    mixDeckDoors,
    mixDeckTreasures,
  } = useContext(AppContext);
  return (
    <div className="c-deck">
      <DeckCards type={'door'} cards={[]} open />
      <DeckCards type={'door'} cards={mixDeckDoors} />
      <DeckCards type={'treasure'} cards={mixDeckTreasures} />
      <DeckCards type={'treasure'} cards={[]} open />
    </div>
  );
}

export default Deck;

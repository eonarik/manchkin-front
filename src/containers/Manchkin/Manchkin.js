import React, { useContext } from 'react';

import { GameContext } from 'containers/Game';
import { cn } from 'utils';

import ManchkinItem from './ManchkinItem';

import './manchkin.scss';

const itemsSlots = {
  head: {
    code: 'head',
    name: 'Головняк',
  },
  rightHand: {
    code: 'rightHand',
    name: 'Правая рука',
  },
  leftHand: {
    code: 'leftHand',
    name: 'Левая рука',
  },
  body: {
    code: 'body',
    name: 'Броник',
  },
  foot: {
    code: 'foot',
    name: 'Обувка',
  },
};
const propertySlots = {
  offSlot: {
    code: 'offSlot',
    name: 'Внеслотовые предметы',
  },
  race: {
    code: 'race',
    name: 'Раса',
  },
  cls: {
    code: 'cls',
    name: 'Класс',
  },
  buff: {
    code: 'buff',
    name: 'Положительные эффекты',
  },
  curse: {
    code: 'curse',
    name: 'Проклятия',
  },
};

const Manchkin = ({
  close,
  showed,
}) => {
  const {
    draggedCard,
    discard,
    makeNewItem,
    mixDeck,
    players,
    selfPlayerIndex,
    setDraggedCard,
  } = useContext(GameContext);
  const { blockedSlots } = players[selfPlayerIndex];

  const makeCard = (card, bodyPart) => {
    // добавим новый предмет
    makeNewItem({
      id: card.id,
      bodyPart,
    });
    // обнулим draggedCard
    setDraggedCard(null);
  }

  return (
    <div
      className={cn([
        "c-manchkin",
        {
          'c-manchkin--showed': showed,
        }
      ])}
      onDragEnd={() => setDraggedCard(null)}
    >
      <div className="c-manchkin__close" onClick={close}>&times;</div>
      <div className="c-manchkin__items">
        {Object.values(itemsSlots).map((slot) => (
          <ManchkinItem
            key={slot.code}
            blocked={blockedSlots.indexOf(slot.code) !== -1}
            draggedCard={draggedCard}
            discard={discard}
            makeCard={(card) => makeCard(card, slot.code)}
            makedItems={mixDeck.filter(
              (card) => card.playerIndex === selfPlayerIndex && card.makedSlot === slot.code
            )}
            {...slot}
          />
        ))}
      </div>
      <div className="c-manchkin__properties">
        {Object.values(propertySlots).map((slot) => (
          <ManchkinItem
            key={slot.code}
            blocked={blockedSlots.indexOf(slot.code) !== -1}
            draggedCard={draggedCard}
            discard={discard}
            makeCard={(card) => makeCard(card, slot.code)}
            makedItems={mixDeck.filter(
              (card) => card.playerIndex === selfPlayerIndex && card.makedSlot === slot.code
            )}
            {...slot}
          />
        ))}
      </div>
    </div>
  );
}

export default Manchkin;

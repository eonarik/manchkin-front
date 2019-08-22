import React, { useContext } from 'react';

import { AppContext } from 'App';
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

const Manchkin = ({
  close,
  showed,
}) => {
  const {
    draggedCard,
    setDraggedCard,
    makeNewItems,
    player: {
      slots,
    },
  } = useContext(AppContext);

  const makeCard = (bodyPart, card) => {
    // добавим новый предмет
    makeNewItems(bodyPart, [card]);
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
        {Object.values(itemsSlots).map((item) => (
          <ManchkinItem
            key={item.code}
            blocked={slots.items[item.code].blocked}
            draggedCard={draggedCard}
            makeCard={(card) => makeCard(item.code, card)}
            makedItems={slots.items[item.code].cards}
            {...item}
          />
        ))}
      </div>
      <div className="c-manchkin__properties">
        <ManchkinItem
          draggedCard={draggedCard}
          makeCard={(card) => makeCard(null, card)}
          makedItems={slots.race}
          code={'race'}
          name={'Раса'}
        />
        <ManchkinItem
          draggedCard={draggedCard}
          makeCard={(card) => makeCard(null, card)}
          makedItems={slots.cls}
          code={'cls'}
          name={'Класс'}
        />
      </div>
    </div>
  );
}

export default Manchkin;

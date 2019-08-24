import React from 'react';

import { cn } from 'utils';

import Card from 'components/Card';

const ManchkinItem = ({
  code,
  name,
  blocked,
  discard,
  draggedCard,
  makeCard,
  makedItems,
}) => {
  const disabled = (
    (
      draggedCard
      && (
        // шмотка должна соотвествовать типу
        draggedCard.bodyParts && draggedCard.bodyParts.length
          ? draggedCard.bodyParts.indexOf(code) === -1
          : draggedCard.type !== code
      )
    )
    || blocked
  );
  const dragDrop = () => {
    if (!disabled) {
      makeCard(draggedCard);
    }
  }
  const dragEnter = (event) => {
    event.preventDefault();
    return true;
  }
  const dragOver = (event) => {
    event.preventDefault();
  }

  const summaryDamage = (
    makedItems && makedItems.reduce(
      (sum, cur) => (
        typeof cur.bonus === 'object'
          ? cur.bonus.type === 'damage' && sum + cur.bonus.value
          : sum + (cur.bonus || 0)
      ),
      0
    )
  ) || undefined;

  return (
    <div
      className={cn([
        'c-manchkin__item',
        `c-manchkin__item--${code}`,
        {
          'c-manchkin__item--disabled': disabled,
        },
      ])}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDrop={dragDrop}
    >
      <div className="c-manchkin__item__title">{name}</div>
      {makedItems.map((card) => (
        <Card
          key={card.id}
          {...card}
          maked={code}
          onClose={() => discard(card.id)}
          position={'top'}
          open
        />
      ))}
      {summaryDamage > 0 && (
        <div className="c-manchkin__item__summary">
          +{summaryDamage}
        </div>
      )}
    </div>
  );
}

export default ManchkinItem;

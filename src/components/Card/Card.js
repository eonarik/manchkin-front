import React, { useContext } from 'react';
import { cn, declOfNum } from 'utils';

import { GameContext } from 'containers/Game';

import './card.scss';

const getBodyPartsLocale = (bodyParts) => {
  if (Array.isArray(bodyParts)) {
    if (
      bodyParts.indexOf('rightHand') !== -1
      && bodyParts.indexOf('leftHand') !== -1
    ) return 'В 1 руку';
    if (
      bodyParts.indexOf('twoHands') !== -1
    ) return 'В 2 руки';
    if (bodyParts.length === 1) {
      bodyParts = bodyParts[0];
    }
  }
  switch (bodyParts) {
    case 'head': return 'Головняк';
    case 'rightHand': return 'В правую руку';
    case 'leftHand': return 'В левую руку';
    case 'body': return 'Броник';
    case 'foot': return 'Обувка';
    default:
  }
  return '';
};

const getRaceLocale = (race) => {
  switch (race) {
    case 'elven': return 'Эльф';
    case 'orc': return 'Орк';
    case 'dwarf': return 'Дварф';
    case 'halfling': return 'Хафлинг';
    case 'undead': return 'Андед';
    default:
  }
  return '';
}

const Card = ({
  scalable = true,
  animated,
  empty,
  onClick,
  onClose,
  open,
  position,
  zoomed,
  ...props
}) => {
  const {
    bodyParts,
    bonus,
    cost,
    description,
    badStaff,
    id,
    kind,
    level,
    name,
    race,
    rules,
    treasures,
    type,
  } = props;
  const {
    draggedCard,
    setDraggedCard
  } = useContext(GameContext);

  const bonusDamageDescription = (
    bonus && (
      typeof bonus === 'object'
        ? bonus.description
        : `Бонус +${bonus}`
    )
  );
  const ruleDescriptions = rules
    ? rules.map((item) => item.description)
    : [];
  const bodyPartDescription = (
    kind === 'treasure'
    && (
      <>
        {bodyParts && getBodyPartsLocale(bodyParts)}
        {type === 'bigItem' && (<><br />Большой</>)}
      </>
    )
  );
  const badStaffDescriptions = badStaff
    ? badStaff.map((item) => item.description).filter((item) => item)
    : [];
  const raceDescription = race ? getRaceLocale(race) : undefined;
  const treasuresCount = typeof treasures === 'object' ? treasures.value : treasures;

  return (
    <div
      className={cn([
        'c-card',
        {
          'c-card--animated': animated,
          'c-card--close': !open,
          'c-card--hidden': draggedCard && draggedCard.id === id,
          'c-card--disabled': empty,
          'c-card--door': kind === 'door',
          'c-card--open': open,
          'c-card--scalable': open && scalable,
          'c-card--treasure': kind === 'treasure',
          'c-card--zoomed': zoomed,
        },
      ])}
      data-position={position}
      onDragStart={() => setDraggedCard(props)}
      draggable={open}
      onClick={onClick}
    >
      <div
        className="c-card__inner"
      >
        {onClose && (
          <div
            className="c-card__close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >&times;</div>
        )}
        {open && !empty && (
          <div className="c-card__content">
            <div>
              {kind === 'treasure' && bonusDamageDescription && (
                <div className="c-card__damage">{bonusDamageDescription}</div>
              )}
              {kind === 'door' && level > 0 && (
                <div className="c-card__damage">Уровень {level}</div>
              )}
              {ruleDescriptions.length > 0 && (
                <div className="c-card__rule">{ruleDescriptions.join(', ')}</div>
              )}
              {raceDescription && (
                <div className="c-card__rule">{raceDescription}</div>
              )}
              <div className="c-card__title">{name}</div>
            </div>
            <div>
              {description && (
                <div className="c-card__description" dangerouslySetInnerHTML={{ __html: description }} />
              )}
              {badStaffDescriptions.length > 0 && (
                <div className="c-card__badStaff">
                  <b>Непотребство:</b> {badStaffDescriptions.join(', ')}
                </div>
              )}
            </div>
            {bodyPartDescription && (
              <div className="c-card__bodyPart">
                {bodyPartDescription}
              </div>
            )}
            {kind === 'treasure' && cost && (
              <div className="c-card__cost">
                <b>{cost} голдов</b>
              </div>
            )}
            {kind === 'door' && treasuresCount > 1 && (
              <div className="c-card__cost">
                <b>{treasuresCount} {declOfNum(treasuresCount, ['сокровище', 'сокровища', 'сокровищ'])}</b>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;

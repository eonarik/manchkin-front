import React, { useContext } from 'react';
import { cn, declOfNum } from 'utils';

import { AppContext } from 'App';

import './card.scss';

const getBodyPartsLocale = (bodyParts) => {
  switch (bodyParts) {
    case 'head': return 'Головняк';
    case 'rightHand': return 'В правую руку';
    case 'leftHand': return 'В левую руку';
    case 'body': return 'Броник';
    case 'foot': return 'Обувка';
    default:
  }
  if (Array.isArray(bodyParts)) {
    if (
      bodyParts.indexOf('rightHand') !== -1
      && bodyParts.indexOf('leftHand') !== -1
    ) return 'В 1 руку';
    if (
      bodyParts.indexOf('twoHands') !== -1
    ) return 'В 2 руки';
  }
  return 'Unknown';
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
  return 'Unknown';
}

const Card = ({
  scalable = true,
  animated,
  empty,
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
    judgement,
    level,
    name,
    race,
    rules,
    subType,
    treasures,
    type,
  } = props;
  const { setDraggedCard } = useContext(AppContext);

  const bonusDamage = typeof bonus === 'object' ? bonus.value : bonus;
  const ruleDescriptions = rules
    ? rules.map((item) => item.description)
    : [];
  const bodyPartDescription = (
    type === 'treasure'
    && (
      <>
        {getBodyPartsLocale(bodyParts)}
        {subType === 'bigItem' && (<><br />Большой</>)}
      </>
    )
  );
  const judgementDescriptions = judgement
    ? judgement.map((item) => item.description)
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
          'c-card--disabled': empty,
          'c-card--door': type === 'door',
          'c-card--open': open,
          'c-card--scalable': open && scalable,
          'c-card--treasure': type === 'treasure',
          'c-card--zoomed': zoomed,
        },
      ])}
      data-position={position}
      onDragStart={() => setDraggedCard(props)}
      draggable={open}
    >
      <div
        className="c-card__inner"
      >
        {open && !empty && (
          <div className="c-card__content">
            <div>
              {type === 'treasure' && bonusDamage > 0 && (
                <div className="c-card__damage">Бонус +{bonusDamage}</div>
              )}
              {type === 'door' && level > 0 && (
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
              {judgementDescriptions.length > 0 && (
                <div className="c-card__judgement">
                  <b>Непотребство:</b> {judgementDescriptions.join(', ')}
                </div>
              )}
            </div>
            {bodyPartDescription && (
              <div className="c-card__bodyPart">
                {bodyPartDescription}
              </div>
            )}
            {type === 'treasure' && cost && (
              <div className="c-card__cost">
                <b>{cost} голдов</b>
              </div>
            )}
            {type === 'door' && treasuresCount > 1 && (
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

import returnCardsToHand from './returnCardsToHand';

const actualizeDamage = ({
  card,
  selfPlayer,
}) => {
  const bonus = card.bonus;
  let actualDamage = 0;
  if (typeof bonus === 'object') {
    // { type, value }
    if (bonus.type && bonus.type === 'damage') {
      actualDamage += parseInt(bonus.value);
    }
    // { male, female }
    if (bonus.male || bonus.female) {
      actualDamage += parseInt(bonus[selfPlayer.gender] || 0);
    }
  } else {
    actualDamage += parseInt(bonus);
  }
  if (actualDamage > 0) {
    card.actualDamage = actualDamage;
  }
}

const actualizePlayerItems = ({
  bodyPart,
  card,
  selfPlayer,
  selfDeck,
}) => {
  // исключение - слот offSlot
  let makedItems = selfDeck.filter((card) => card.makedSlot === bodyPart);
  if (bodyPart !== 'offSlot' && makedItems && makedItems.length) {
    // специальные условия
    // суперманчкин - позволяет надеть сразу два класса
    let isSuperManchkin = (
      selfDeck.find((card) => card.code === 'super_manchkin' && card.makedSlot)
      && bodyPart === 'cls'
      && makedItems.length <= 1
    );
    // полукровка - позволяет иметь две расы
    let isMongrel = (
      selfDeck.find((card) => card.code === 'mongrel' && card.makedSlot)
      && bodyPart === 'race'
      && makedItems.length <= 1
    );
    // в шмотке стоит статус combine - можно совмещать с другими шмотками
    let isCombine = (
      card.combine
    );
    if (!isSuperManchkin && !isMongrel && !isCombine) {
      // вернем в руку
      returnCardsToHand({
        cards: makedItems,
        selfPlayer,
      });
    }
  }
}

const blockSlots = ({
  card,
  selfPlayer,
  selfDeck,
}) => {
  if (card.blockedSlots && card.blockedSlots.length) {
    for (let j = 0; j < card.blockedSlots.length; j++) {
      selfPlayer.blockedSlots.push(card.blockedSlots[j]);
    }
    // шмотки в заблокированных слотах прячем в руку
    let itemsOfBlockedSlot = selfDeck.filter(
      (card) => selfPlayer.blockedSlots.indexOf(card.makedSlot) !== -1
    );
    if (itemsOfBlockedSlot && itemsOfBlockedSlot.length) {
      returnCardsToHand({
        cards: itemsOfBlockedSlot,
        selfPlayer,
      });
    }
  }
}

export default ({
  bodyPart,
  card,
  selfDeck,
  selfPlayer,
}) => {
  // проверим есть ли уже шмотки в указанном слоте
  actualizePlayerItems({
    bodyPart,
    card,
    selfPlayer,
    selfDeck,
  });
  // надеваем шмотку
  card.makedSlot = bodyPart;
  // блокируем слоты
  blockSlots({
    card,
    selfPlayer,
    selfDeck,
  });
  // актуализируем дамаг шмотки
  actualizeDamage({
    card,
    selfPlayer,
  });
}

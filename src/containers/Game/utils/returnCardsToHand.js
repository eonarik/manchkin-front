export default ({
  cards,
  selfPlayer,
}) => {
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    // разблокируем слоты, занятые надетыми шмотками
    if (
      card.blockedSlots && card.blockedSlots.length
      && selfPlayer.blockedSlots.length
    ) {
      for (let j = 0; j < card.blockedSlots.length; j++) {
        let index = selfPlayer.blockedSlots.indexOf(card.blockedSlots[j]);
        if (index !== -1) {
          selfPlayer.blockedSlots.splice(index, 1);
        }
      }
    }
    // уберем карты в руку
    // убирая свойство makedSlot
    delete card.makedSlot;
    delete card.actualDamage;
  }
}
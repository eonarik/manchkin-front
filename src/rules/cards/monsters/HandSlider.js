export default {
  code: 'hand_slider',
  level: 5,
  name: 'Рука-ползунья',
  description: `Если ты отдашь ей Хотельное кольцо, вместо того, чтобы лезть в драку,
  это станет началом прекрасной дружбы. Кольцо сбрось, эту карту держи при себе. 
  Рука считается Мелкой шмоткой с боевым бонусом +3.`,
  race: 'undead',
  bonus: {
    type: 'damage',
    value: 3,
  },
  type: 'door',
  subType: 'monster',
  altType: 'smallItem',
  bodyParts: ['leftHand', 'rightHand'],
  judgement: [
    {
      type: 'curse',
      bonus: {
        type: 'level',
        value: -2,
        target: 'enemy',
      },
      description: 'Недетские андедские приколы стоят тебе 2 уровней!',
    },
  ],
  treasures: 2,
  collection: 'classic',
}
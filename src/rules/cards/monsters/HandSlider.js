export default {
  code: 'hand_slider',
  level: 5,
  name: 'Рука-ползунья',
  description: `Если ты отдашь ей Хотельное кольцо, вместо того, чтобы лезть в драку, это станет началом прекрасной дружбы. Кольцо сбрось, эту карту держи при себе. Рука считается Мелкой шмоткой с боевым бонусом +3.`,
  race: 'undead',
  bonus: 3,
  kind: 'door',
  type: 'monster',
  altType: 'smallItem',
  bodyParts: ['leftHand', 'rightHand'],
  badStuff: [
    {
      type: 'curse',
      effect: 'level',
      value: -2,
      target: 'enemy',
      description: 'Недетские андедские приколы стоят тебе 2 уровней!',
    },
  ],
  rewards: {
    treasures: 2,
    levels: 1,
  },
  collection: 'classic',
}
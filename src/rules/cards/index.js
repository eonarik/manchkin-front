import * as doors from './doors';
import * as items from './items';
import * as monsters from './monsters';

export default {
  ...doors,
  ...items,
  ...monsters,
};

// interface Card {
//   code: string;
//   name: string;
//   type: CardType;
//   description?: string;
//   collection?: string;
// }

// interface Monster extends Card {
//   level: number;
//   race?: RaceType;
//   bonus?: Bonus;
//   altType?: CardType;
//   properties?: Property[];
//   judgement?: Property[];
//   treasures?: number | {
//     target: TargetType;
//     value: number;
//   };
// }

// interface Item extends Card {
//   bonus: Bonus;
//   bodyParts: BodyPartsType;
//   blockedSlots: BodyPartsType | BodyPartsType[];
//   cost: number;
//   rules: Rule[];
// }

// interface Property {
//   type: PropertyType;
//   description: string;
//   bonus?: Bonus;
//   condition?: (enemyPlayer: object, self: object) => boolean;
//   target: TargetType;
// }

// interface Rule {
//   condition: (selfPlayer: object) => boolean;
//   description: string;
// };

// type RaceType = 'dwarf' | 'halfling' | 'elven' | 'orc' | 'undead';

// type BodyPartsType = 'head' | 'leftHand' | 'rightHand' | '2hands' | 'body' | 'foot';

// type TargetType = 'leftPlayer' | 'all' | 'enemy' | 'self';

// type CardType = 'action' | 'buff' | 'class' | 'monster' | 'smallItem' | 'bigItem' | 'single';

// type PropertyType = 'buff' | 'curse' | 'discard' | 'door' | 'level' | 'peace' | 'race' | 'runaway' | 'treasure';

// type Bonus = string | number | {
//   type: BonusType;
//   value: number;
//   cardTypes?: CardType | CardType[];
//   selectTarget?: TargetType | TargetType[];
// }
// type BonusType = 'damage' | 'level' | 'runaway';

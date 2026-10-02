import type { UnitModule } from '../curriculumData';
import { EXTRA_A1_GRAM } from './a1gram';
import { EXTRA_A2 } from './a2';
import { EXTRA_B1A } from './b1a';
import { EXTRA_B1B } from './b1b';
import { EXTRA_FLIRT_B1, EXTRA_FLIRT_B2 } from './flirt';
import { EXTRA_B2A } from './b2a';
import { EXTRA_B2B } from './b2b';
import { EXTRA_C1 } from './c1';
import { EXTRA_COOKING } from './cooking';
import { EXTRA_COOKING2 } from './cooking2';
import { EXTRA_DAILY2A } from './daily2a';
import { EXTRA_GRAM_CASES } from './gramCases';
import { EXTRA_DAILY2B } from './daily2b';
import { EXTRA_DAILY2C_B2, EXTRA_DAILY2C_C1 } from './daily2c';
import { EXPANSION_A1, EXPANSION_A2 } from './expansion50a';
import { EXPANSION_B1, EXPANSION_B2 } from './expansion50b';
import { EXPANSION_C1 } from './expansion50c';
import { A_BOOST_1 } from './aBoost1';
import { A_BOOST_2 } from './aBoost2';
import { A_BOOST_3 } from './aBoost3';
import { PACK100_A1 } from './pack100a1';
import { PACK100_A2 } from './pack100a2';
import { PACK100_B1 } from './pack100b1';
import { PACK100_B2 } from './pack100b2';
import { PACK100_C1 } from './pack100c1';
import { COOKING30 } from './cooking30';
import { DAILY60_A1 } from './daily60a1';
import { DAILY60_A2 } from './daily60a2';
import { DAILY60_B1, DAILY60_B2 } from './daily60b';
import { RETENTION_SPRINT_UNITS } from './retentionSprint';

export const EXTRA_UNITS: UnitModule[] = [
  ...EXTRA_A1_GRAM,
  ...EXTRA_GRAM_CASES,
  ...EXTRA_A2,
  ...EXTRA_DAILY2A,
  ...EXTRA_DAILY2B,
  ...EXTRA_DAILY2C_B2,
  ...EXTRA_DAILY2C_C1,
  ...EXTRA_B1A,
  ...EXTRA_B1B,
  ...EXTRA_FLIRT_B1,
  ...EXTRA_B2A,
  ...EXTRA_B2B,
  ...EXTRA_FLIRT_B2,
  ...EXTRA_C1,
  ...EXTRA_COOKING,
  ...EXTRA_COOKING2,
  ...EXPANSION_A1,
  ...EXPANSION_A2,
  ...EXPANSION_B1,
  ...EXPANSION_B2,
  ...EXPANSION_C1,
  ...A_BOOST_1,
  ...A_BOOST_2,
  ...A_BOOST_3,
  ...DAILY60_A1,
  ...DAILY60_A2,
  ...DAILY60_B1,
  ...DAILY60_B2,
  ...PACK100_A1,
  ...PACK100_A2,
  ...PACK100_B1,
  ...PACK100_B2,
  ...PACK100_C1,
  ...COOKING30,
  ...RETENTION_SPRINT_UNITS
];

import * as migration_20261022_073337_initial from './20261022_073337_initial';
import * as migration_20261022_101738_about_page_sections from './20261022_101738_about_page_sections';

export const migrations = [
  {
    up: migration_20261022_073337_initial.up,
    down: migration_20261022_073337_initial.down,
    name: '20261022_073337_initial',
  },
  {
    up: migration_20261022_101738_about_page_sections.up,
    down: migration_20261022_101738_about_page_sections.down,
    name: '20261022_101738_about_page_sections'
  },
];

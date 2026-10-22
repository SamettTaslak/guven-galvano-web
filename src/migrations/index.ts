import * as migration_20261022_073337_initial from './20261022_073337_initial';

export const migrations = [
  {
    up: migration_20261022_073337_initial.up,
    down: migration_20261022_073337_initial.down,
    name: '20261022_073337_initial'
  },
];

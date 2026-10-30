import * as migration_20261022_073337_initial from './20261022_073337_initial';
import * as migration_20261022_101738_about_page_sections from './20261022_101738_about_page_sections';
import * as migration_20261030_065805_site_settings_fax_legal_name from './20261030_065805_site_settings_fax_legal_name';

export const migrations = [
  {
    up: migration_20261022_073337_initial.up,
    down: migration_20261022_073337_initial.down,
    name: '20261022_073337_initial',
  },
  {
    up: migration_20261022_101738_about_page_sections.up,
    down: migration_20261022_101738_about_page_sections.down,
    name: '20261022_101738_about_page_sections',
  },
  {
    up: migration_20261030_065805_site_settings_fax_legal_name.up,
    down: migration_20261030_065805_site_settings_fax_legal_name.down,
    name: '20261030_065805_site_settings_fax_legal_name'
  },
];

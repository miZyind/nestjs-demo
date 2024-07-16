import { DataSource } from 'typeorm';

import options from '#configs/database';

import type { DataSourceOptions } from 'typeorm';

export default new DataSource(options as DataSourceOptions);

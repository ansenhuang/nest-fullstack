import { join } from 'path';
import devConfig from './dev.config';
import prodConfig from './prod.config';
import testConfig from './test.config';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvTest = process.env.NODE_ENV === 'test';
const currConfig = isEnvDevelopment ? devConfig : isEnvTest ? testConfig : prodConfig;

export default {
  port: 5700,
  staticPath: join(__dirname, '../../../client/dist'),
  ...currConfig,
};

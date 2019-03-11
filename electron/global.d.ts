import { Config } from './config';

declare global {
    namespace NodeJS {
        export interface Global {
            config: Config;
        }
    }
}

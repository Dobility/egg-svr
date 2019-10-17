// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt from '../../../app/middleware/jwt';
import ExportLogger from '../../../app/middleware/logger';
import ExportResponse from '../../../app/middleware/response';

declare module 'egg' {
  interface IMiddleware {
    jwt: typeof ExportJwt;
    logger: typeof ExportLogger;
    response: typeof ExportResponse;
  }
}

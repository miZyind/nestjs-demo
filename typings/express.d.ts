import 'express';

import { CrudRequest } from '@nestjsx/crud';

declare module 'express' {
  interface User {
    corpUUID: string;
    corpName: string;
    appUUID: string;
    appName: string;
    appToken: string;
    serviceToken: string;
  }

  interface Request {
    user: User;
    authInfo: string;
    NESTJSX_PARSED_CRUD_REQUEST_KEY?: CrudRequest;
  }
}

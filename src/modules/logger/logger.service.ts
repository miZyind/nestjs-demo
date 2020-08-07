import * as Nest from '@nestjs/common';

@Nest.Injectable({ scope: Nest.Scope.TRANSIENT })
export class Logger extends Nest.Logger {}

import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiStandardResponse } from '#utils/decorator';

import { AuthService } from './auth.service';
import { LogInDTO } from './dtos/log-in.dto';
import { LogInResponse } from './responses/log-in.response';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Patch('log-in')
  @ApiOperation({ summary: 'Log in to the system' })
  @ApiStandardResponse({ type: LogInResponse })
  async login(@Body() dto: LogInDTO): Promise<LogInResponse> {
    return this.service.validateAndSignToken(dto);
  }
}

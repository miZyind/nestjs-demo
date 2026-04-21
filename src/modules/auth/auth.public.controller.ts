import { AuthService } from '#modules/auth/auth.service';
import { LogInDTO } from '#modules/auth/dtos/log-in.dto';
import { LogInResponse } from '#modules/auth/responses/log-in.response';
import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiStandardResponse } from 'nestjs-xion/decorator';

@ApiTags('Auth')
@Controller('public/auth')
export class AuthPublicController {
  constructor(private readonly service: AuthService) {}

  @Patch('log-in')
  @ApiOperation({ summary: 'Log in to the system' })
  @ApiStandardResponse({ type: LogInResponse })
  async login(@Body() dto: LogInDTO): Promise<LogInResponse> {
    return this.service.validateAttemptAndSignToken(dto);
  }
}

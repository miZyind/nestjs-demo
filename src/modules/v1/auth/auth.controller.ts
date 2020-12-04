import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiStandardResponse } from '#utils/decorator';
import { StandardResponseInterceptor } from '#utils/interceptor';

import { AuthService } from './auth.service';
import { LogInDTO } from './dtos/log-in.dto';
import { RegisterDTO } from './dtos/register.dto';
import { LogInResponse } from './responses/log-in.response';

@ApiTags('Auth')
@Controller('v1/auth')
@UseInterceptors(StandardResponseInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async register(@Body() dto: RegisterDTO): Promise<void> {
    this.logger.debug(`Email [${dto.email}] registered`);

    await this.service.register(dto);
  }

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in to the system' })
  @ApiStandardResponse({ type: LogInResponse })
  async login(@Body() dto: LogInDTO): Promise<LogInResponse> {
    return this.service.validateAndSignToken(dto);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { StandardResponse } from '#models/responses/standard.response';
import { StandardResponseInterceptor } from '#utils/interceptor';

import { AuthService } from './auth.service';
import { LogInDto } from './dtos/log-in.dto';
import { RegisterDto } from './dtos/register.dto';
import { LogInResponse } from './responses/log-in.response';

@ApiTags('Auth')
@Controller('v1/auth')
@UseInterceptors(StandardResponseInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiCreatedResponse({ type: StandardResponse })
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.service.register(dto);
  }

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in to the system' })
  @ApiOkResponse({ type: LogInResponse })
  async login(@Body() dto: LogInDto): Promise<LogInResponse> {
    this.logger.debug(`Email [${dto.email}] login attempt`);

    return this.service.validateAndSignToken(dto);
  }
}

import { ApiStandardResponse } from 'nestjs-xion/decorator';

import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccountService } from '#modules/account/account.service';
import { CreateAccountDTO } from '#modules/account/dtos/create-account.dto';

@ApiTags('Account')
@Controller('public/accounts')
export class AccountPublicController {
  constructor(private readonly service: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new account' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async register(@Body() dto: CreateAccountDTO): Promise<void> {
    return this.service.register(dto);
  }
}

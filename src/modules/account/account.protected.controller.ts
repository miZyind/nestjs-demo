import { ApiStandardResponse } from 'nestjs-xion/decorator';
import { UUIDParamDTO } from 'nestjs-xion/dto';

import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccountService } from '#modules/account/account.service';
import { CreateAccountDTO } from '#modules/account/dtos/create-account.dto';
import { JWTAdminGuard } from '#modules/auth/guards/jwt-admin.guard';
import { SecretGuard } from '#modules/auth/guards/secret.guard';

@ApiTags('Account')
@Controller('protected/accounts')
export class AccountProtectedController {
  constructor(private readonly service: AccountService) {}

  @Post()
  @SecretGuard()
  @ApiOperation({ summary: 'Create an admin account' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async createAdmin(@Body() dto: CreateAccountDTO): Promise<void> {
    return this.service.createAdmin(dto);
  }

  @Put(':uuid')
  @JWTAdminGuard()
  @ApiOperation({ summary: 'Approve an account creation request' })
  @ApiStandardResponse()
  async approve(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.approve(uuid);
  }

  @Delete(':uuid')
  @JWTAdminGuard()
  @ApiOperation({
    summary: 'Reject an account creation request or ban an account',
  })
  @ApiStandardResponse()
  async reject(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.reject(uuid);
  }
}

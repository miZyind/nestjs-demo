import {
  ApiCrudQueries,
  ApiStandardListResponse,
  ApiStandardResponse,
} from 'nestjs-xion/decorator';
import { UUIDParamDTO } from 'nestjs-xion/dto';
import { PaginationInterceptor } from 'nestjs-xion/interceptor';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';

import { AccountService } from '#modules/account/account.service';
import { CreateAccountDTO } from '#modules/account/dtos/create-account.dto';
import { FormattedAccount } from '#modules/account/responses/formatted-account.response';
import { JWTAdminGuard } from '#modules/auth/guards/jwt-admin.guard';
import { SecretGuard } from '#modules/auth/guards/secret.guard';

@ApiTags('Account')
@Controller('protected/accounts')
export class AccountProtectedController {
  constructor(private readonly service: AccountService) {}

  @Get()
  @JWTAdminGuard()
  @UseInterceptors(PaginationInterceptor)
  @ApiOperation({ summary: 'Get all accounts and their todo items' })
  @ApiCrudQueries()
  @ApiStandardListResponse({ type: FormattedAccount })
  async getAll(
    @ParsedRequest() req: CrudRequest,
  ): ReturnType<AccountService['getAll']> {
    return this.service.getAll(req);
  }

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

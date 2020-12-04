import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AccountRole } from '#entities/account.entity';
import { UUIDParamDTO } from '#models/dtos/uuid-param.dto';
import { ApiStandardResponse } from '#utils/decorator';
import { AuthStrategy } from '#v1/auth/auth.constant';
import { RolesGuard } from '#v1/auth/guards/roles.guard';

import { AccountService } from './account.service';
import { CreateDTO } from './dtos/create.dto';

@ApiTags('Account')
@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async create(@Body() dto: CreateDTO): Promise<void> {
    return this.service.create(dto);
  }

  @Put(':uuid/request')
  @UseGuards(RolesGuard(AccountRole.Admin))
  @ApiSecurity(AuthStrategy.JWT)
  @ApiOperation({ summary: 'Approve an account creation request' })
  @ApiStandardResponse()
  async approve(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.approve(uuid);
  }

  @Delete(':uuid/request')
  @UseGuards(RolesGuard(AccountRole.Admin))
  @ApiSecurity(AuthStrategy.JWT)
  @ApiOperation({ summary: 'Reject an account creation request' })
  @ApiStandardResponse()
  async reject(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.reject(uuid);
  }
}

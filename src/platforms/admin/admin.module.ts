import { Module } from '@nestjs/common';

import { TermsOfServiceModule } from '#modules/terms-of-service/terms-of-service.module';
import { UserModule } from '#modules/user/user.module';
import { AdminProtectedController } from '#platforms/admin/admin.protected.controller';

@Module({
  imports: [TermsOfServiceModule, UserModule],
  providers: [],
  controllers: [AdminProtectedController],
})
export class AdminModule {}

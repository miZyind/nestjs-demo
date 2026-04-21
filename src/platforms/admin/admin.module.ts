import { TermsOfServiceModule } from '#modules/terms-of-service/terms-of-service.module';
import { UserModule } from '#modules/user/user.module';
import { AdminProtectedController } from '#platforms/admin/admin.protected.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TermsOfServiceModule, UserModule],
  providers: [],
  controllers: [AdminProtectedController],
})
export class AdminModule {}

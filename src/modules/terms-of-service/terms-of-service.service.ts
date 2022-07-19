import { CRUDService } from 'nestjs-xion/crud';
import { hasValue } from 'nestjs-xion/guarder';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocaleCode } from '#app/app.constant';
import { TermsOfServiceTranslation } from '#entities/terms-of-service-translation.entity';
import { TermsOfService } from '#entities/terms-of-service.entity';

import type {
  GetLatestOneResponse,
  UpsertTermsOfServiceDTO,
  UpsertTermsOfServiceResponse,
} from '#modules/terms-of-service/terms-of-service.interface';

@Injectable()
export class TermsOfServiceService extends CRUDService<TermsOfService> {
  constructor(
    @InjectRepository(TermsOfService)
    protected repo: Repository<TermsOfService>,
    @InjectRepository(TermsOfServiceTranslation)
    private readonly txnRepo: Repository<TermsOfServiceTranslation>,
  ) {
    super(repo);
  }

  async getLatestOne(code: LocaleCode): Promise<GetLatestOneResponse | null> {
    const entity = await this.repo
      .createQueryBuilder('tos')
      .select(['tos.updatedAt', 'tos.version', 'txn.content'])
      .innerJoin('tos.translations', 'txn')
      .where('txn.code = :code', { code })
      .orderBy('tos.version', 'DESC')
      .getOne();

    if (entity) {
      const { updatedAt, version, translations } = entity;
      const [{ content }] = translations;

      return { updatedAt, version, content };
    }

    return null;
  }

  async upsert(
    operatorUUID: string,
    { version, note, translations }: UpsertTermsOfServiceDTO,
  ): Promise<UpsertTermsOfServiceResponse> {
    const hasExisting = hasValue(version);

    if (hasExisting) {
      const entity = await this.repo.findOne({
        select: { version: true },
        where: { version },
        relations: { translations: true },
      });

      if (entity) {
        await this.txnRepo.remove(entity.translations);
      }
    }

    const entity = await this.repo.save({
      version,
      note,
      translations: translations
        .filter(({ code }) => Object.values(LocaleCode).includes(code))
        .map(({ code, content }) => ({ code, content })),
      [hasExisting ? 'modifier' : 'creator']: { uuid: operatorUUID },
    });

    return { version: entity.version };
  }
}

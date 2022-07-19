import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocaleCode } from '#app/app.constant';
import { TermsOfService } from '#entities/terms-of-service.entity';

@Entity()
export class TermsOfServiceTranslation {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly code!: LocaleCode;

  @Column()
  readonly content!: string;

  @JoinColumn({ name: 'termsOfServiceVersion' })
  @ManyToOne(() => TermsOfService, { nullable: false, onDelete: 'CASCADE' })
  readonly termsOfService!: TermsOfService;
}

export type TermsOfServiceTranslations = Pick<
  TermsOfServiceTranslation,
  'code' | 'content'
>[];

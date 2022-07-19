import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from '#entities/base.entity';
import { TermsOfServiceTranslation } from '#entities/terms-of-service-translation.entity';
import { User } from '#entities/user.entity';

@Entity()
export class TermsOfService extends Base {
  @PrimaryGeneratedColumn()
  readonly version!: number;

  @Column('text')
  readonly note!: string;

  @OneToMany(
    () => TermsOfServiceTranslation,
    ({ termsOfService }) => termsOfService,
    { eager: true, cascade: true },
  )
  readonly translations!: TermsOfServiceTranslation[];

  @JoinColumn({ name: 'creatorUUID' })
  @ManyToOne(() => User, { nullable: false })
  readonly creator!: User;

  @JoinColumn({ name: 'modifierUUID' })
  @ManyToOne(() => User)
  readonly modifier!: User | null;
}

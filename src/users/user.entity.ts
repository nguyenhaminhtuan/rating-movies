import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { UserRole, UserStatus } from './users.enum';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Column('text')
  fullName: string;

  @Column('enum', { enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Column('enum', { enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  comparePassword(plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  }

  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}

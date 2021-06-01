import slugify from '../utils/slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { default: '' })
  name: string;

  @Column('varchar', { unique: true, default: '' })
  slug: string;

  @Column({ default: true })
  isActived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  private createSlug() {
    this.slug = slugify(this.name);
  }

  @BeforeUpdate()
  private updateSlug() {
    this.slug = slugify(this.name);
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SlugifyEntity } from '../common/entity/slugify.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Movie extends SlugifyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  coverImageUrl: string;

  @Column('text', { default: '' })
  description: string;

  @Column()
  releaseDate: Date;

  @ManyToOne(() => Category, (category) => category.movies, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

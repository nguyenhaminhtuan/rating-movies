import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SlugifyEntity } from '../common/entity/slugify.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Category extends SlugifyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActived: boolean;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

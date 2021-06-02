import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), CategoriesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}

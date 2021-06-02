import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { PaginateQuery } from '../common/dto/paginate-query.dto';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/category.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private categoriesService: CategoriesService,
  ) {}

  async findAll(paginate: PaginateQuery): Promise<[Movie[], number]> {
    const result = await this.movieRepository.findAndCount({
      take: paginate.take,
      skip: paginate.skip,
    });

    return result;
  }

  async findBySlug(slug: string): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { slug } });
  }

  async findById(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne(id);
  }

  async create({
    categoryId,
    ...createMovieDto
  }: CreateMovieDto): Promise<Movie> {
    const category = await this.categoriesService.findById(categoryId);

    if (!category) {
      throw new BadRequestException(`Invalid category with ID "${categoryId}"`);
    }

    const newMovie = this.movieRepository.create({
      ...createMovieDto,
      category,
    });
    const movie = await this.movieRepository.save(newMovie);

    return movie;
  }

  async update(
    id: number,
    { categoryId, ...updateMovieDto }: UpdateMovieDto,
  ): Promise<Movie> {
    let category: Category | undefined;
    const movie = await this.findById(id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    if (categoryId) {
      category = await this.categoriesService.findById(categoryId);

      if (!category) {
        throw new BadRequestException(
          `Invalid category with ID "${categoryId}"`,
        );
      }
    }

    const updatedMovie = await this.movieRepository.save(
      Object.assign(movie, {
        ...updateMovieDto,
        category,
      }),
    );

    return updatedMovie;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.movieRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}

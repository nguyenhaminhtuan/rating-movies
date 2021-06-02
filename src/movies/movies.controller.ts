import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { PaginateQuery } from '../common/dto/paginate-query.dto';
import { ApiResponse } from '../common/dto/response.dto';
import { ApiPaginateResponse } from '../common/dto/paginate-response.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { UserRole } from '../users/users.enum';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async findAll(
    @Query() paginate: PaginateQuery,
  ): Promise<ApiPaginateResponse<Movie[]>> {
    const [data, totalCount] = await this.moviesService.findAll(paginate);
    return new ApiPaginateResponse({ data, totalCount, ...paginate });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<ApiResponse<Movie>> {
    const movie = await this.moviesService.findBySlug(slug);

    if (!movie) {
      throw new NotFoundException(`Movie with slug "${slug}" not found`);
    }

    return new ApiResponse(movie);
  }

  @Auth(UserRole.Admin)
  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<ApiResponse<Movie>> {
    const movie = await this.moviesService.create(createMovieDto);

    return new ApiResponse(movie);
  }

  @Auth(UserRole.Admin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<ApiResponse<Movie>> {
    const movie = await this.moviesService.update(id, updateMovieDto);

    return new ApiResponse(movie);
  }

  @Auth(UserRole.Admin)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<{ deleted: boolean }>> {
    const deleted = await this.moviesService.delete(id);

    return new ApiResponse({ deleted });
  }
}

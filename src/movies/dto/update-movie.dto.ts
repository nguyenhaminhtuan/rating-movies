import { IsDateString, IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}

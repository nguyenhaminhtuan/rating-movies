import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserRole } from '../users/users.enum';
import { Auth } from '../common/decorators/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category';
import { ApiResponse } from '../common/dto/response.dto';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Category[]>> {
    const categories = await this.categoriesService.findAll();

    return new ApiResponse(categories);
  }

  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.findBySlug(slug);

    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }

    return new ApiResponse(category);
  }

  @Auth(UserRole.Admin)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser('id') creatorId: string,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.create(
      creatorId,
      createCategoryDto,
    );

    return new ApiResponse(category);
  }

  @Auth(UserRole.Admin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser('id') updatorId: string,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.update(
      id,
      updatorId,
      updateCategoryDto,
    );

    return new ApiResponse(category);
  }

  @Auth(UserRole.Admin)
  @Patch(':id/active')
  async updateActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActived') isActived: boolean,
    @CurrentUser('id') updatorId: string,
  ): Promise<ApiResponse<{ updated: boolean }>> {
    const updated = await this.categoriesService.updateActive(
      id,
      updatorId,
      isActived,
    );

    return new ApiResponse({ updated });
  }
}

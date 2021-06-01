import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const category = await this.categoriesService.findBySlug(slug);

    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }

    return category;
  }

  @Auth(UserRole.Admin)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser('id') creatorId: string,
  ) {
    return this.categoriesService.create(creatorId, createCategoryDto);
  }

  @Auth(UserRole.Admin)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser('id') updatorId: string,
  ) {
    return this.categoriesService.update(id, updatorId, updateCategoryDto);
  }

  @Auth(UserRole.Admin)
  @Patch(':id')
  updateActive(
    @Param('id') id: number,
    @Body('isActived') isActived: boolean,
    @CurrentUser('id') updatorId: string,
  ) {
    return this.categoriesService.updateActive(id, updatorId, isActived);
  }
}

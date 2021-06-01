import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { slug } });
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne(id);
  }

  async create(
    creatorId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    const newCategory = await this.categoryRepository.save(category);
    this.logger.log(
      `Category ${newCategory.id} was created by User ${creatorId}`,
    );

    return newCategory;
  }

  async update(
    id: number,
    updatorId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${category.id} not found`);
    }

    const updatedCategory = await this.categoryRepository.save(
      Object.assign(category, updateCategoryDto),
    );
    this.logger.log(
      `Category ${updatedCategory.id} was updated by User ${updatorId}`,
    );

    return updatedCategory;
  }

  async updateActive(
    id: number,
    updatorId: string,
    isActived: boolean,
  ): Promise<boolean> {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${category.id} not found`);
    }

    const update = await this.categoryRepository.update(id, { isActived });

    if (update.affected <= 0) {
      return false;
    }

    const action = isActived ? 'active' : 'deactive';
    this.logger.log(`Category ${category.id} ${action} by User ${updatorId}`);

    return true;
  }
}

import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import slugify from '../../utils/slugify';

export class SlugifyEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true, default: '' })
  slug: string;

  @BeforeInsert()
  private createSlug() {
    this.slug = slugify(this.name);
  }

  @BeforeUpdate()
  private updateSlug() {
    this.slug = slugify(this.name);
  }
}

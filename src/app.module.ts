import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from './serve-static/serve-static.module';
import { UploadModule } from './upload/upload.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ServeStaticModule,
    UploadModule,
    HealthModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    MoviesModule,
  ],
})
export class AppModule {}

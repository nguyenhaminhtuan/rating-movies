import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'static'),
        filename: (req, file, cb) => {
          const filename = uuid();
          const ext = extname(file.originalname);
          cb(null, filename + ext);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}

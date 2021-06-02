import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '../config/config.service';
import { Environment } from '../config/config.interface';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  private filePath: string;

  constructor(private configService: ConfigService<Environment>) {
    this.filePath =
      configService.get('HOSTNAME') + configService.get('STATIC_ROUTE');
  }

  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              `Unsupported file type ${extname(file.originalname)}`,
            ),
            false,
          );
        }
      },
    }),
  )
  @Post('single-image')
  async uploadSingleImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ source: string }> {
    return {
      source: `${this.filePath}/${image.filename}`,
    };
  }
}

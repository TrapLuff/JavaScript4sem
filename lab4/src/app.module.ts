import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideocardsModule } from './videocards/videocards.module';
import { FileService } from './file/file.service';

@Module({
  imports: [VideocardsModule],
})
export class AppModule {}

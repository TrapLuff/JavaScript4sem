import { Module } from '@nestjs/common';
import { VideocardsService } from './videocards.service';
import { VideocardsController } from './videocards.controller';
import { FileService, FileAccessor } from '../file/file.service';
import { Videocard } from './entities/videocard.entity';

@Module({
  controllers: [VideocardsController],
  providers: [
    VideocardsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Videocard[]>('assets/videocards.json'),
    },
  ],
})
export class VideocardsModule {}
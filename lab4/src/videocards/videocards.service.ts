import { Injectable } from '@nestjs/common';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
import { FileService } from '../file/file.service';
import { Videocard } from './entities/videocard.entity';

@Injectable()
export class VideocardsService {
  constructor(private fileService: FileService<Videocard[]>) {}

  findAll(title?: string): Videocard[] {
    const videocards = this.fileService.read();

    return title
      ? videocards.filter((videocard) =>
          videocard.title.toLowerCase().includes(title.toLowerCase()),
        )
      : videocards;
  }

  create(createVideocardDto: CreateVideocardDto) {
    const videocards = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const videocard = { ...createVideocardDto, id: videocards.length + 1 };

    this.fileService.add(videocard);
  }

  findOne(id: number): Videocard | null {
    const videocards = this.fileService.read();

    return videocards.find((videocard) => videocard.id === id) ?? null;
  }

  update(id: number, updateVideocardDto: UpdateVideocardDto): void {
    const videocards = this.fileService.read();

    const updatedVideocards = videocards.map((videocard) =>
      videocard.id === id ? { ...videocard, ...updateVideocardDto } : videocard,
    );

    this.fileService.write(updatedVideocards);
  }

  remove(id: number): void {
    const filteredVideocards = this.fileService
      .read()
      .filter((videocard) => videocard.id !== id)
      .map((v, i) => ({ ...v, id: i + 1 }));

    this.fileService.write(filteredVideocards);
    
  }
}
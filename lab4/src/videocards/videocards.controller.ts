import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VideocardsService } from './videocards.service';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
import { Videocard } from './entities/videocard.entity';

@Controller('videocards')
export class VideocardsController {
    constructor(private readonly videocardsService: VideocardsService) {}

    @Post()
    create(@Body() createVideocardDto: CreateVideocardDto) {
        return this.videocardsService.create(createVideocardDto);
    }

    @Get()
    findAll(@Query('title') title?: string): Videocard[] {
      return this.videocardsService.findAll(title);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.videocardsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVideocardDto: UpdateVideocardDto) {
        return this.videocardsService.update(+id, updateVideocardDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.videocardsService.remove(+id);
    }
}
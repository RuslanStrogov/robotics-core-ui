import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import { voicesProviders } from './voice.providers';
import { Test } from './test.entity';
import { TestModel } from './test.model';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([TestModel])],
  controllers: [VoiceController],
  providers: [VoiceService, ...voicesProviders]
})
export class VoiceModule {}

import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import { voicesProviders } from './voice.providers';

@Module({
  controllers: [VoiceController],
  providers: [VoiceService, ...voicesProviders]
})
export class VoiceModule {}

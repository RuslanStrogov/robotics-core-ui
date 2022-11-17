import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Message } from '@robotics/api-interfaces';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  // @Get('say')
  // voiceSay(@Query('text') text): any {
  //   return this.voiceService.say(text);
  // }

  // @Get('say:text')
  // voiceSayText(@Param('text') text: string) {
  //   return this.voiceService.say(text);
  // }

  @Get('say')
  @ApiQuery({name: 'text', type: String})
  @ApiQuery({name: 'speed', type: Number, required: false})
    voiceSayText(
    @Query('text') text: String = 'Hello',
    @Query('speed', new DefaultValuePipe(5), ParseIntPipe) speed: Number = 0.5
  ){
    console.log('getDocuments', text, speed);
    return this.voiceService.say(text);
    // return this.documentsService.getDocuments(page, limit);
  }

  @Get('getInstalledVoices')
  async getInstalledVoices(): Promise<any> {
    return await this.voiceService.getInstalledVoices();
  }

  @Get('setActiveVoice:voice')
  setActiveVoice(@Param('voice') voice: string): any {
    return this.voiceService.setActiveVoice(voice);
  }

  @Get('setVoiceSpeed:speed')
  setVoiceSpeed(@Param('speed') speed: number): any {
    return this.voiceService.setActiveVoice(speed);
  }

  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }



}

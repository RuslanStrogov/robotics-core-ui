import { Injectable } from '@nestjs/common';
import { Message } from '@robotics/api-interfaces';

// automatically pick platform
const say = require('say');
const CyrillicToTranslit = require('cyrillic-to-translit-js');

// import CyrillicToTranslit from 'cyrillic-to-translit-js';

// // or, override the platform
// const Say = require('say').Say
// const say = new Say('darwin' || 'win32' || 'linux')

@Injectable()
export class VoiceService {

  cyrillicPattern: any = /[а-яА-ЯЁё]/;
  cyrillicToTranslit = new CyrillicToTranslit({preset: 'ru'});

  private speed: number = 1;
  private voiceActive: string;
  private voicesInstalled: string[];

  setActiveVoice(voice: any): any {
    console.log('setActiveVoice', voice);
    this.voiceActive = voice;
    return this.voiceActive;
  }

  setVoiceSpeed(speed: number): any {
    this.speed = speed;
    return this.speed;
  }

  getActiveVoice(): any {

    console.log('getActiveVoice', this.voiceActive);

    return this.voiceActive;
  }

  getInstalledVoices(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      say.getInstalledVoices((error: any, voices: string[]) => {

        // console.log('getInstalledVoices', voices);

        if(error) reject(error);

        this.voicesInstalled = voices;
        // this.voiceActive = voices[1];

        // return { message: voices };
        resolve(voices);

      });
    });

  }

  say(text: any = "Hello, hello"): any {

    console.log('this.cyrillicPattern.test(text)', this.cyrillicPattern.test(text));

    if(this.cyrillicPattern.test(text)) {
      text = this.cyrillicToTranslit.transform(text);
    }
    say.speak(text, this.getActiveVoice(), this.speed);
    return { message: 'Say hello!' };
  }

}

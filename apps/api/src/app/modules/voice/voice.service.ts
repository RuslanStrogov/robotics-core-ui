import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { DataSource } from 'typeorm';

import { Message } from '@robotics/api-interfaces';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';
import { TestModel } from './test.model';


// automatically pick platform
const say = require('say');
const CyrillicToTranslit = require('cyrillic-to-translit-js');

// import CyrillicToTranslit from 'cyrillic-to-translit-js';

// // or, override the platform
// const Say = require('say').Say;
// const say = new Say('darwin' || 'win32' || 'linux');
// const say = new Say('linux');

@Injectable()
export class VoiceService {

  cyrillicPattern: any = /[а-яА-ЯЁё]/;
  cyrillicToTranslit = new CyrillicToTranslit({preset: 'ru'});

  private speed: number = 1;
  private voiceActive: string;
  private voicesInstalled: string[];
  articles: any[];

  intervalActive: boolean = false;

  constructor(
    private readonly httpService: HttpService,
    // private dataSource: DataSource,

    // @InjectRepository(Test)
    // private testRepository: Repository<Test>,

    @InjectModel(TestModel)
    private testModel: typeof TestModel,
  ) {}


  // findAllTest(): Promise<Test[]> {
  //   return this.testRepository.find();
  // }



  async findAllTestModel(): Promise<TestModel[]> {
    return this.testModel.findAll();
  }

  findOneTestModel(id: string): Promise<TestModel> {
    return this.testModel.findOne({
      where: {
        id,
      },
    });
  }

  async createTestModel() {

      //     await this.sequelize.transaction(async t => {
      await this.testModel.create({
        lastName: 'asdasdasdasd' + Math.floor(Math.random() * (123123123 - 111 + 1) + 111),
        firstName: '12123123',
      })

  }

  // async createMany() {
  //   try {
  //     await this.sequelize.transaction(async t => {
  //       const transactionHost = { transaction: t };

  //       await this.userModel.create(
  //           { firstName: 'Abraham', lastName: 'Lincoln' },
  //           transactionHost,
  //       );
  //       await this.userModel.create(
  //           { firstName: 'John', lastName: 'Boothe' },
  //           transactionHost,
  //       );
  //     });
  //   } catch (err) {
  //     // Transaction has been rolled back
  //     // err is whatever rejected the promise chain returned to the transaction callback
  //   }
  // }




  getJson() {
    this.httpService.get('https://newsapi.org/v2/everything?q=Украина&language=ru&from=2022-11-17&sortBy=popularity&apiKey=83632bc334d9434493a4fb740127cf4d')
    .subscribe((res: any) => {
      // console.log('data', res.data.articles);
      this.articles = res.data.articles.map((item: any) => {
        return item.title;
      });

      console.log('this.articles', this.articles);

    })
  }

  startInterval() {
    this.intervalActive = true;

    const list: string[] = this.articles ? this.articles : [
      'Привет ребята',
      'Кто-нибудь меня слышит?',
      'Говорю с случайно задержкой',
      'Знаю всего пять строк',
      'Пока пока',
    ];

    function randomIntFromInterval(min: number, max: number) { // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

      const text = list[Math.floor(Math.random() * list.length)];

      console.log('random text', text);
      console.log('random text length', text.length);


      this.say(text);

      if(this.intervalActive) {

        const interval = randomIntFromInterval(3000, 50000);
        console.log('next speech ' + text.length + ' + ' + interval + ' ms');

        setTimeout(() => this.startInterval(), (text.length * 500) + interval);
      }

  }

  // https://newsapi.org/v2/everything?q=Apple&from=2022-11-17&sortBy=popularity&apiKey=API_KEY
  // https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&q=cryptocurrency
  // 83632bc334d9434493a4fb740127cf4d

  stopInterval() {
    this.intervalActive = false;
  }

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

  say(text: any = "Hello, hello", speed: Number = this.speed): any {

    console.log('this.cyrillicPattern.test(text)', this.cyrillicPattern.test(text));

    if(this.cyrillicPattern.test(text)) {
      text = this.cyrillicToTranslit.transform(text);
    }
    say.speak(text, this.getActiveVoice(), speed);
    return { message: 'Say hello!' };
  }

}

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceModule } from './modules/voice/voice.module';
import { Test } from './modules/voice/test.entity';
import { TestModel } from './modules/voice/test.model';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '159357',
      database: 'robotics',
      entities: [Test],
      // autoLoadModels: true,
      synchronize: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '159357',
      database: 'robotics',
      models: [TestModel],
    }),

    ScheduleModule.forRoot(),

    VoiceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

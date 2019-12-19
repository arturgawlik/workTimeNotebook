import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './controllers/register/register.controller';
import { DatabaseModule } from './modules/database/database.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataInterceptor } from './interceptors/data.interceptor';
import { DataPipe } from './pipes/data.pipe';
import { LoginController } from './controllers/login/login.controller';
import { WorkTimeNoteController } from './controllers/work-time-note/work-time-note.controller';

@Module({
  imports: [
    AuthModule,
    DatabaseModule
  ],
  controllers: [
    AppController,
    RegisterController,
    LoginController,
    WorkTimeNoteController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: DataPipe
    },
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './controllers/register.controller';
import { DatabaseModule } from './modules/database/database.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataInterceptor } from './interceptors/data.interceptor';
import { DataPipe } from './pipes/data.pipe';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [
    AppController,
    RegisterController
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

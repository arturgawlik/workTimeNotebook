import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
}

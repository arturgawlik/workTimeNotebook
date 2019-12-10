import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller('login')
export class LoginController {

    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }
}

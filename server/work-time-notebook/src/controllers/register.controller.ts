import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/modules/database/services/user.service';

@Controller('register')
export class RegisterController {

    constructor(private _userService: UserService) {

    }

    @Post('registerNewAccount')
    async Register(@Body('email')email: string, @Body('password')password: string) {
        await this._userService.addNewUser(email, password);
    }
}

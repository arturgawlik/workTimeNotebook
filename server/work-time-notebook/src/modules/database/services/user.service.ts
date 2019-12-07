import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private _userRepository: Repository<User>) {
    }

    async addNewUser(email: string, password: string) {
        if (!email || !password)
            throw new HttpException('Can\'t add new user. Email or password is empyt.', HttpStatus.BAD_REQUEST);

        const user = new User();
        user.email = email;
        user.password = password;

        const newUser = await this._userRepository.save(user);
    }

}

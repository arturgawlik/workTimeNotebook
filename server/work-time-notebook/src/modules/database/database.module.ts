import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User
        ]),
    ],
    exports: [
        UserService
    ],
    providers: [
        UserService
    ]
})
export class DatabaseModule { }

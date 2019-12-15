import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './services/user.service';
import { WorkTimeNote } from 'src/entities/workTimeNote.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User,
            WorkTimeNote
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

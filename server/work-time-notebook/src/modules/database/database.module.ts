import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './services/user.service';
import { WorkTimeNote } from 'src/entities/workTimeNote.entity';
import { WorkTimeNoteService } from './services/work-time-note.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User,
            WorkTimeNote
        ]),
    ],
    exports: [
        UserService,
        WorkTimeNoteService
    ],
    providers: [
        UserService,
        WorkTimeNoteService
    ]
})
export class DatabaseModule { }

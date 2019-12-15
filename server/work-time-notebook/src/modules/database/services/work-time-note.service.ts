import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkTimeNote } from 'src/entities/workTimeNote.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class WorkTimeNoteService {

    constructor(@InjectRepository(WorkTimeNote) private _workTimeNoteRepository: Repository<WorkTimeNote>) {
    }

    addNew(workTimeNote: WorkTimeNote) {
        if (!workTimeNote) {
            throw new HttpException('workTimeNote can\'t be null when adding new.', HttpStatus.BAD_REQUEST);
        }

        return this._workTimeNoteRepository.save(workTimeNote);
    }

    update(workTimeNote: WorkTimeNote) {
        if (!workTimeNote) {
            throw new HttpException('workTimeNote can\'t be null when updating.', HttpStatus.BAD_REQUEST);
        }

        return this._workTimeNoteRepository.update(workTimeNote.id, workTimeNote);
    }

    delete(id: string) {
        if (!id) {
            throw new HttpException('Can\'t delete workTimeNote with out id.', HttpStatus.BAD_REQUEST);
        }

        return this._workTimeNoteRepository.delete(id);
    }

    getAll(user: User) {
        if (!user) {
            throw new HttpException('User can\'t be null when getting all workTimeNotes.', HttpStatus.BAD_REQUEST);
        }

        return this._workTimeNoteRepository.find({user: user});
    }

}

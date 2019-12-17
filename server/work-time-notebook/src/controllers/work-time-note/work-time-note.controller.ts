import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
import { WorkTimeNoteService } from 'src/modules/database/services/work-time-note.service';
import { AuthGuard } from '@nestjs/passport';
import { WorkTimeNote } from 'src/entities/workTimeNote.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('workTimeNote')
export class WorkTimeNoteController {

    constructor(private worktTimeNoteService: WorkTimeNoteService) {
    }

    @Get('getAll')
    async getAll(@Request() req) {
        return this.worktTimeNoteService.getAll(req.user);
    }

    @Post('save')
    async save(@Request() req, @Body() workTimeNote: WorkTimeNote) {
        workTimeNote.user = req.user;
        if (workTimeNote.id) {
            return this.worktTimeNoteService.update(workTimeNote);
        }
        else {
            return this.worktTimeNoteService.addNew(workTimeNote);
        }        
    }

}

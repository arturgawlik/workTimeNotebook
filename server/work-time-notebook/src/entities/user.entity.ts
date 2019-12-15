import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { WorkTimeNote } from "./workTimeNote.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => WorkTimeNote, workTimeNote => workTimeNote.user)
    workTimeNotes: WorkTimeNote
}

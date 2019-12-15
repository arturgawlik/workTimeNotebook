import { User } from "./user.entity";
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class WorkTimeNote {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    type: string;

    @Column()
    customer: string;

    @Column()
    description: string;

    @Column()
    uri: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    timeSpentInMinutes: number;

    @ManyToOne(type => User, user => user.workTimeNotes)
    user: User
}

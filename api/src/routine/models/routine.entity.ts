import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoutineEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    javaCode: string;

    @Column('text')
    thingIds: string;
}
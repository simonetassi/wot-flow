import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoutineEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    javaCode: string;
}
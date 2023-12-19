import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoutineEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    javaCode: string;
}
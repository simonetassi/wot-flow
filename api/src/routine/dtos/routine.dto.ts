import { IsString, IsUUID } from "class-validator";

export class RoutineDto{
    @IsUUID()
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    javaCode: string;
}
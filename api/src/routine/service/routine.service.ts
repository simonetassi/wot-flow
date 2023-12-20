import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineEntity } from '../models/routine.entity';
import { Repository } from 'typeorm';
import { Routine } from '../models/routine.interface';
import { Observable, from } from 'rxjs';
import { randomUUID } from 'crypto';
import { RoutineDto } from '../dtos/routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(RoutineEntity) private readonly routineRepository: Repository<RoutineEntity>
    ) { }

    create(routineDto: RoutineDto): Observable<Routine> {
        return from(this.routineRepository.save(routineDto));
    }

    findOneBy(id: string): Observable<RoutineDto> {
        return from(this.routineRepository.findOneBy({ id }));
    }

    findAll(): Observable<RoutineDto[]> {
        return from(this.routineRepository.find());
    }

    deleteOne(id: string): Observable<any> {
        return from(this.routineRepository.delete(id));
    }

    updateOne(id: string, routineDto: RoutineDto): Observable<any> {
        return from(this.routineRepository.update(id, routineDto));
    }
}

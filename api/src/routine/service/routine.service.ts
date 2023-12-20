import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineEntity } from '../models/routine.entity';
import { Repository } from 'typeorm';
import { Routine } from '../models/routine.interface';
import { Observable, from } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(RoutineEntity) private readonly routineRepository: Repository<RoutineEntity>
    ) { }

    create(routine: Routine): Observable<Routine> {
        routine.id = randomUUID();
        return from(this.routineRepository.save(routine));
    }

    findOneBy(id: string): Observable<Routine> {
        return from(this.routineRepository.findOneBy({ id }));
    }

    findAll(): Observable<Routine[]> {
        return from(this.routineRepository.find());
    }

    deleteOne(id: string): Observable<any> {
        return from(this.routineRepository.delete(id));
    }

    updateOne(id: string, routine: Routine): Observable<any> {
        return from(this.routineRepository.update(id, routine));
    }
}

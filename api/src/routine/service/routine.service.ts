import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineEntity } from '../models/routine.entity';
import { Repository } from 'typeorm';
import { Routine } from '../models/routine.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(RoutineEntity) private readonly routineRepository: Repository<RoutineEntity>
    ) { }

    create(routine: Routine): Observable<Routine> {
        return from(this.routineRepository.save(routine));
    }

    findOneBy(id: number): Observable<Routine> {
        return from(this.routineRepository.findOneBy({ id }));
    }

    findAll(): Observable<Routine[]> {
        return from(this.routineRepository.find());
    }

    deleteOne(id: number): Observable<any> {
        return from(this.routineRepository.delete(id));
    }

    updateOne(id: number, routine: Routine): Observable<any> {
        return from(this.routineRepository.update(id, routine));
    }
}

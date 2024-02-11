import { Injectable } from '@nestjs/common';
import { HttpClientFactory } from '@node-wot/binding-http';
import Servient from '@node-wot/core';
import { RoutineDto } from 'src/routine/dtos/routine.dto';

@Injectable()
export class ExecuteService {
    execute(routine: RoutineDto): string {
        console.log(routine);
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(null));
        return eval(routine.tsCode);
    }
}
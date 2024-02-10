import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoutineDto } from 'src/routine/dtos/routine.dto';

@Injectable()
export class ExecuteService {
    execute(routine: RoutineDto): string {
        console.log(routine);
        
        return "ciao";
    }
}

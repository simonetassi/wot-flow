import { Body, Controller, Post } from '@nestjs/common';
import { ExecuteService } from '../service/execute.service';
import { Observable } from 'rxjs';
import { RoutineDto } from 'src/routine/dtos/routine.dto';

@Controller('execute')
export class ExecuteController {
    constructor(private executeService: ExecuteService){}

    @Post()
    execute(@Body() routine: RoutineDto) : string{
        return this.executeService.execute(routine);
    }
}

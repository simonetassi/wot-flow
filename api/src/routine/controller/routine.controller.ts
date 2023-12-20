import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoutineService } from '../service/routine.service';
import { Routine } from '../models/routine.interface';
import { Observable } from 'rxjs';

@Controller('routines')
export class RoutineController {
    constructor(private routineService: RoutineService){}

    @Post()
    create(@Body() routine: Routine): Observable<Routine>{
        return this.routineService.create(routine);
    }

    @Get(':id')
    findOneBy(@Param() params): Observable<Routine>{
        return this.routineService.findOneBy(params.id);
    }

    @Get()
    findAll(): Observable<Routine[]>{
        return this.routineService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any>{
        return this.routineService.deleteOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() routine: Routine): Observable<any>{
        return this.routineService.updateOne(id, routine)
    }

}

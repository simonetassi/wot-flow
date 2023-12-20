import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoutineService } from '../service/routine.service';
import { Routine } from '../models/routine.interface';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import { RoutineDto } from '../dtos/routine.dto';

@Controller('routines')
export class RoutineController {
    constructor(private routineService: RoutineService){}

    @Post()
    create(@Body() routineDto: RoutineDto): Observable<RoutineDto>{
        routineDto.id = randomUUID();
        return this.routineService.create(routineDto);
    }

    @Get(':id')
    findOneBy(@Param() params): Observable<RoutineDto>{
        return this.routineService.findOneBy(params.id);
    }

    @Get()
    findAll(): Observable<RoutineDto[]>{
        return this.routineService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any>{
        return this.routineService.deleteOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() routineDto: RoutineDto): Observable<any>{
        return this.routineService.updateOne(id, routineDto)
    }

}

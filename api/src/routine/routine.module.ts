import { Module } from '@nestjs/common';
import { RoutineController } from './controller/routine.controller';
import { RoutineService } from './service/routine.service';

@Module({
  controllers: [RoutineController],
  providers: [RoutineService]
})
export class RoutineModule {}

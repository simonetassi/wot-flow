import { Module } from '@nestjs/common';
import { RoutineController } from './controller/routine.controller';
import { RoutineService } from './service/routine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineEntity } from './models/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity])
  ],
  controllers: [RoutineController],
  providers: [RoutineService]
})
export class RoutineModule {}

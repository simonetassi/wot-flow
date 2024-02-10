import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecuteController } from './controller/execute.controller';
import { ExecuteService } from './service/execute.service';

@Module({
  imports: [],
  controllers: [ExecuteController],
  providers: [ExecuteService]
})
export class ExecuteModule {}

import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { ThingDescriptionBuilderService } from './td-builder.service';
import { WellKnownController } from './well-known.controller';
import { WellKnownService } from './well-known.service';
import { MulticastDnsService } from './mdns.service';

@Module({
  imports: [ConfigModule],
  controllers: [WellKnownController],
  providers: [WellKnownService, ThingDescriptionBuilderService, MulticastDnsService],
})
export class IntroductionModule {}

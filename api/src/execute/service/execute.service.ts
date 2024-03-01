import { Injectable } from '@nestjs/common';
import { HttpClientFactory } from '@node-wot/binding-http';
import { CoapClientFactory } from '@node-wot/binding-coap';
import { MqttClientFactory } from '@node-wot/binding-mqtt';
import { WebSocketClientFactory } from '@node-wot/binding-websockets';

import Servient from '@node-wot/core';
import { RoutineDto } from 'src/routine/dtos/routine.dto';

@Injectable()
export class ExecuteService {
    execute(routine: RoutineDto): string {
        // console.log(routine);
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(null));
        servient.addClientFactory(new CoapClientFactory(null));
        servient.addClientFactory(new MqttClientFactory());
        servient.addClientFactory(new WebSocketClientFactory(null));
        return eval(routine.tsCode);
    }
}
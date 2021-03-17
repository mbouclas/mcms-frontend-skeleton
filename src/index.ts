import "reflect-metadata";
require('dotenv').config();
import {EventEmitter} from "events";
import axios from "axios";
import {AppStateModel} from "./models/appState.model";
import {RedisService} from "./services/redis.service";
export let RDS = new RedisService();
export let Redis = RDS.client;
import {EventLoaderService} from "./services/event-loader.service";
import {AxiosInterceptors} from "./helpers/axios-interceptors";
import path from "path";
import app from '@server';
import logger from '@shared/Logger';
import {bootApp} from "./pre-boot/boot-app";
export let Event: EventEmitter = new EventEmitter();
export let Axios = axios;
export let AppState: AppStateModel = {} as AppStateModel;

(async () => {
    const eventLoaderService = new EventLoaderService();
    await eventLoaderService.loadFromDir(path.resolve(__dirname, 'events'));
    (new AxiosInterceptors());

    await boot();
    Event.emit('pre-boot.done');
})();

Event.on('pre-boot.done', async () => {
    // Start the server
    const port = Number(process.env.PORT || 3000);
    app.listen(port, async () => {
        logger.info('Express server started on port: ' + port);
        Event.emit('server.started', app);
    });
});

export async function boot(bustCache = false) {
    // Get credentials maybe?

    try {
        AppState = await bootApp();
    }
    catch (e) {
        // console.log(e);
    }
}

'use strict'

import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import {ScenarioRequest, ScenarioRequestReturn} from "@/interfaces/scenario";
import {ParserInstalledRequest} from "@/interfaces/general";
import {Effect} from "@/interfaces/effects";

createApp(App)
    .use(store)
    .mount('#app');

// Register all exposed variables here (from '/electron/preload.js')
declare global {
    interface Window {
        pyControls: {
            parserInstalled(): Promise<ParserInstalledRequest>;
        };
        axios: {
            retrieveScenario(): Promise<ScenarioRequest>;
            getRequest(url: string): Promise<ScenarioRequest | Effect>;
            sendScenario(scenarioContent: ScenarioRequestReturn): Promise<string>;
        };
    }
}

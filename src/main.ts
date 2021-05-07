'use strict'

import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import {ScenarioRequest} from "@/interfaces/scenario";

// Register all exposed variables here (from '/electron/preload.js')
declare global {
    interface Window {
        pyControls: {
            parserInstalled(): Promise<string>;
        };
        axios: {
            retrieveScenario(): Promise<ScenarioRequest>;
        };
    }
}

createApp(App)
    .use(store)
    .mount('#app');

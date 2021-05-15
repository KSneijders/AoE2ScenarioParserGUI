<template>
    <div id="app">
        <ValidateParser v-on:parser-installed="parserValidated = true" v-if="!parserValidated"></ValidateParser>
        <div v-if="parserValidated">
            <TabView v-on:tab-select="selectedTab = $event"></TabView>

            <div id="container">
                <div v-if="!scenarioReceived" style="padding: 30px; font-size: 20px">
                    Retrieving scenario...
                </div>

                <TriggerView
                    v-if="selectedTab === 'Triggers' && scenarioReceived"
                    :triggerInformation="triggerInformation"
                ></TriggerView>

                <div v-if="selectedTab === 'TriggerText'" style="text-align: left; font-size: 20px">
                    <button style="display: block; margin: 10px 0; padding: 3px">Save</button>
                    <textarea
                        v-bind:value="triggersAsJson"
                        @change="updateTriggers"
                        style="height: 85vh; width: 90%; font-size: 20px; font-family: monospace">
                    </textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ValidateParser from "./components/load/ValidateParser.vue";
import TriggerView from "./components/triggers/TriggerOverview.vue";
import TabView from "./components/TabView.vue";
import {defineComponent} from "vue";
import {EventObject} from "@/interfaces/general";
import {TriggerInformation} from "@/interfaces/triggers";
import {defaultTrigger} from "@/defaults/default-trigger";

export default defineComponent({
    name: "App",
    components: {
        TriggerView,
        ValidateParser,
        TabView
    },
    data() {
        return {
            selectedTab: '???',  // Updated from TabView
            parserValidated: false,
            scenarioReceived: false,
            triggerInformation: {
                triggers: [],
                triggerDisplayOrder: []
            } as TriggerInformation
        }
    },
    computed: {
        triggersAsJson: function (): string {
            return JSON.stringify(this.triggerInformation, null, 2)
        }
    },
    methods: {
        updateTriggers: function (event: EventObject) {
            this.triggerInformation = JSON.parse(event.target.value)
        }
    },
    mounted() {
        window.pyControls.parserInstalled().then(response => {
            if (response.code > 0) this.parserValidated = true;

            window.axios.getRequest('effect/attributes').then(response => {
                this.$store.state.effectAttributes = response
            })
            window.axios.getRequest('condition/attributes').then(response => {
                this.$store.state.conditionAttributes = response
            })
            window.axios.getRequest('effect/names').then(response => {
                this.$store.state.effectNames = response
            })
            window.axios.getRequest('condition/names').then(response => {
                this.$store.state.conditionNames = response
            })

            window.axios.retrieveScenario().then(response => {
                this.triggerInformation = response.triggerInformation
            }).catch(error => {
                const t = Object.assign({}, defaultTrigger);
                t.id = 0
                t.name = error.message
                this.triggerInformation = {triggers: [t], triggerDisplayOrder: [0]}
            }).finally(() => this.scenarioReceived= true)
        })
    }
})
</script>

<style lang="scss">
$fonts: Avenir, Helvetica, Arial, sans-serif;

* {
    box-sizing: border-box;
}

#app {
    font-family: $fonts;
    stroke-width: 3px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #000000;
    //margin-top: 2vh;
}

#container {
    height: calc(100vh - 32px);;
}

textarea {
    font-family: $fonts;
}

.ws-render {
    white-space: pre-wrap;
}

input[type=checkbox] {
    background-image: url('~@/assets/unchecked.png');
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    vertical-align: middle;
}

input[type=checkbox]:checked {
    background-image: url('~@/assets/checked.png');
}

table.selectable-list {
    border-spacing: 0;
    width: 100%;

    tr {
        th, td {
            user-select: none;
        }

        th {
            text-align: left;
            background-color: whitesmoke;
            position: sticky;
            top: 0;
        }

        td {
            text-align: left;
            border-style: dotted;
            border-color: gray;
            border-width: 1px 0 0 0;

            &:first-child {
                padding: 0 0 0 5px;
            }
        }

        &:last-child {
            td {
                border-bottom: 1px dotted gray;
            }
        }

        &:hover {
            cursor: pointer;
            background-color: whitesmoke;
        }

        &.selected {
            background-color: lightgray;
        }
    }
}
</style>

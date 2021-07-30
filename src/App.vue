<template>
    <div id="app">
        <div>
            <input name="temp" type="text" v-model="scenarioPath"/>
            <button v-on:click="startAPI()">start API</button>
            <button v-on:click="retrieveScenario()">retrieve</button>
            <button v-on:click="openFilePrompt()">open file prompt</button>
        </div>

        <ValidateParser v-on:parser-installed="parserValidated = true" v-if="!parserValidated"></ValidateParser>
        <div v-if="parserValidated">
            <TabView v-on:tab-select="updateSelectedTabName"></TabView>

            <div id="container">
                <div v-if="!loadingStatus.finished">
                    <span id="scenario-status-header">{{ loadingStatus.headerMessage }}</span> <br>
                    <div v-html="loadingStatus.errorMessage"></div>
                    <div v-html="loadingStatus.pythonLog"></div>
                </div>

                <TriggerView
                    v-if="selectedTabName === 'Triggers' && loadingStatus.finished"
                    :triggerInformation="triggerInformation"
                ></TriggerView>

<!--                <div v-if="selectedTabName === 'TriggerText'" style="text-align: left; font-size: 20px">-->
<!--                    <button style="display: block; margin: 10px 0; padding: 3px">Save</button>-->
<!--                    <textarea-->
<!--                        v-bind:value="triggersAsJson"-->
<!--                        @change="updateTriggers"-->
<!--                        style="height: 85vh; width: 90%; font-size: 20px; font-family: monospace">-->
<!--                    </textarea>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ValidateParser from "./components/load/ValidateParser.vue";
import TriggerView from "./components/triggers/TriggerOverview.vue";
import TabView from "./components/TabView.vue";
import {defineComponent} from "vue";
import {EventObject, FileSelected, FileSelectionError} from "@/interfaces/general";
import {TriggerInformation} from "@/interfaces/triggers";

export default defineComponent({
    name: "App",
    components: {
        TriggerView,
        ValidateParser,
        TabView
    },
    data() {
        return {
            selectedTabName: '???',  // Selected tab is handled in TabView
            scenarioPath: "C:/Users/Kerwin Sneijders/Games/Age of Empires 2 DE/76561198140740017/resources/_common/scenario/test1212.aoe2scenario",
            parserValidated: false,
            loadingStatus: {
                finished: false,
                headerMessage: "Loading...",
                errorMessage: "",
                pythonLog: "",
            },
            triggerInformation: {
                triggers: [],
                triggerDisplayOrder: []
            } as TriggerInformation
        }
    },
    computed: {
        // triggersAsJson: function (): string {
        //     return JSON.stringify(this.triggerInformation, null, 2)
        // }
    },
    methods: {
        startAPI: function () {
            console.log(this.scenarioPath)
            window.pyControls.startAPI(this.scenarioPath)
        },
        openFilePrompt: function () {
            window.fileControls.select()
                .then((value: FileSelected) => {
                    console.log(value.filepath);
                    this.scenarioPath = value.filepath;
                })
                .catch((error: FileSelectionError) => {
                    console.log(error.reason)
                })
        },
        updateTriggers: function (event: EventObject) {
            this.triggerInformation = JSON.parse(event.target.value)
        },
        updateSelectedTabName: function (newSelectedTabName: string): void {
            this.selectedTabName = newSelectedTabName;
        },
        retrieveScenario: function () {
            window.pyControls.parserInstalled().then(response => {
                if (response.code > 0) this.parserValidated = true;

                window.axios.getRequest('effect/attributes')
                    .then(response => this.$store.state.effectAttributes = response)
                window.axios.getRequest('condition/attributes')
                    .then(response => this.$store.state.conditionAttributes = response)
                window.axios.getRequest('effect/names')
                    .then(response => this.$store.state.effectNames = response)
                window.axios.getRequest('condition/names')
                    .then(response => this.$store.state.conditionNames = response)

                window.axios.retrieveScenario().then(response => {
                    if (response.success) {
                        this.triggerInformation = response.data.triggerInformation
                        this.loadingStatus.finished = true
                    } else {
                        this.loadingStatus.finished = false
                        this.loadingStatus.headerMessage = "Unable to load scenario";
                        if (response.error) this.loadingStatus.errorMessage = response.error.reason;
                    }
                })
            })
        }
    },
    mounted() {
        // require('electron').ipcRenderer.on('menu-action-clicked', (event: any, message: any) => {
        //     console.log(message) // Prints 'whoooooooh!'
        // })
        this.retrieveScenario();
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
    height: calc(100vh - 32px);

    #scenario-status-header {
        display: inline-block;
        padding: 30px;
        font-size: 20px
    }
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

button {
    padding: 3px;

}
</style>

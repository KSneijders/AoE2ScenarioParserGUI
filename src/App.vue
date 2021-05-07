<template>
    <div id="app">
        <ValidateParser v-on:parser-installed="parserValidated = true" v-if="!parserValidated"></ValidateParser>
        <div v-if="parserValidated">
            <TabView v-on:tab-select="selectedTab = $event"></TabView>
            <div id="container">
                <TriggerView v-if="selectedTab === 'Triggers'" :triggerInformation="triggerInformation"></TriggerView>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ValidateParser from "./components/load/ValidateParser.vue";
import TriggerView from "./components/TriggerOverview.vue";
import TabView from "./components/TabView.vue";
import {defineComponent} from "vue";
import {TriggerInformation} from "@/interfaces/scenario";

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
            triggerInformation: {} as TriggerInformation
        }
    },
    mounted() {
        window.axios.retrieveScenario().then((response) => {
            this.triggerInformation = response.triggerInformation
            this.parserValidated = true;
        })
    }
})
</script>

<style lang="scss">
$fonts: Avenir, Helvetica, Arial, sans-serif;

#app {
    font-family: $fonts;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
    margin-top: 2vh;
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
</style>

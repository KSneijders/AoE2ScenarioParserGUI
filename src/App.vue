<template>
    <div id="app">
        <ValidateParser v-on:parser-installed="parserValidated = true" v-if="!parserValidated"></ValidateParser>
        <TriggerOverview v-if="parserValidated"></TriggerOverview>
    </div>
</template>

<script>
import ValidateParser from "@/components/load/ValidateParser";
import TriggerOverview from "@/components/TriggerOverview";

export default {
    name: 'App',
    components: {
        ValidateParser,
        TriggerOverview
    },
    data() {
        return {
             parserValidated: false
        }
    },
    mounted: function () {
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

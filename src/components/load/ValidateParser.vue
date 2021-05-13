<template>
    <div style="background: whitesmoke;">
        <h1>Checking if AoE2ScenarioParser is installed...</h1>
        <div id="log-report" style="font-weight: bold">
            <p
                v-for="line in logLines"
                v-bind:key="line"
                v-html="line"
            ></p>
        </div>
    </div>
</template>

<script lang="ts">
import {n2br} from "@/scripts/string-modifiers";
import {defineComponent} from "vue";

export default defineComponent({
    name: "ValidateParser",
    mounted() {
        window.pyControls.parserInstalled().then((data) => {  // eslint-disable-line no-undef
            if (data['code'] === -1) {
                this.logLines.push(n2br('Error in python script\n\n'))
                this.logLines.push(n2br(data['message']))
            } else {
                this.logLines.push(n2br(data['message'] + "\n\nRedirecting..."))
                this.$emit('parser-installed');
            }
        }).catch((reason => {
            console.log("CATCH!")
            console.log(reason)
        }))
    },
    data() {
        return {
            logLines: [] as Array<string>
        }
    }
})
</script>

<style scoped>

</style>
<template>
    <div style="background: whitesmoke;">
        <h1>Checking if AoE2ScenarioParser is installed...</h1>
        <div id="log-report" style="font-weight: bold">
            <p
                v-for="line in log_lines"
                v-bind:key="line"
                v-html="line"
            ></p>
        </div>
    </div>
</template>

<script>
import {n2br} from "@/js/string-modifiers";

export default {
    name: "ValidateParser",
    mounted() {
        window['pyControls'].parserInstalled().then((data) => {
            let result = JSON.parse(data)

            if (result['code'] === -1) {
                this.log_lines.push(n2br('Error in python script\n\n'))
                this.log_lines.push(n2br(result['message']))
            } else {
                this.log_lines.push(n2br(result['message'] + "\n\nRedirecting..."))
                this.$emit('parser-installed');
            }
        })
    },
    data() {
        return {
            log_lines: [""]
        }
    },
    methods: {}
}
</script>

<style scoped>

</style>
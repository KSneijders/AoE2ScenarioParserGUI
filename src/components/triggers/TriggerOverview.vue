<template>
    <div id="column-container">
        <div id="left-bar">
            <div id="trigger-actions">
                Actions here
                <button @click="sendScenario()">Send</button>
            </div>
            <div id="trigger-info-wrapper">
                <TriggerInfo
                    v-if="selectedTriggerIndex !== -1"
                    :selectedTrigger="selectedTrigger"
                    v-on:update-value="updateValue">
                </TriggerInfo>
            </div>
        </div>
        <div id="trigger-list">
            <table id="trigger-list-table" class="selectable-list">
                <thead>
                <tr>
                    <th style="width: 30px">ID</th>
                    <th style="width: 30px; text-align: center;">E</th>
                    <th style="width: 30px; text-align: center;">L</th>
                    <th style="width: 30px; text-align: center;">Cn</th>
                    <th style="width: 30px; text-align: center;">En</th>
                    <th>Name</th>
                    <!-- <th>Description</th> -->
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(trigger, index) in triggersInDO"
                    v-bind:key="trigger.id"
                    v-on:click="selectedTriggerIndex = index"
                    v-bind:class="{selected: (index === selectedTriggerIndex)}"
                >
                    <td>{{ trigger.id }}</td>
                    <td><input type="checkbox" v-model="trigger.enabled"></td>
                    <td><input type="checkbox" v-model="trigger.looping"></td>
                    <td>{{ trigger.conditions.length }}</td>
                    <td>{{ trigger.effects.length }}</td>
                    <td class="ws-render">{{ trigger.name }}</td>
                    <!-- <td>{{ trigger.description }}</td> -->
                </tr>
                </tbody>
            </table>
        </div>
        <div id="trigger-ce-wrapper">
            <TriggerCE
                v-if="selectedTriggerIndex !== -1"
                :selectedTrigger="selectedTrigger">
            </TriggerCE>
        </div>
    </div>
</template>

<script lang="ts">
import TriggerInfo from "./TriggerInfo.vue";
import TriggerCE from "./TriggerCE.vue";
import {defineComponent, PropType} from "vue";
import {Trigger, TriggerInformation} from "@/interfaces/triggers";

export default defineComponent({
    name: "TriggerOverview",
    components: {
        TriggerInfo,
        TriggerCE
    },
    mounted() {
        if (this.triggerInformation.triggers.length > 0)
            this.selectedTriggerIndex = 0
    },
    props: {
        triggerInformation: {
            type: Object as PropType<TriggerInformation>,
            default: () => ({triggerDisplayOrder: [], triggers: []})
        }
    },
    data() {
        return {
            selectedTriggerIndex: -1,
        }
    },
    computed: {
        triggersInDO: function (): Array<Trigger> {
            return this.triggerInformation.triggerDisplayOrder.map(i => this.triggerInformation.triggers[i])
        },
        triggers: function (): Array<Trigger> {
            return this.triggerInformation.triggers
        },
        selectedTrigger: function (): Trigger {
            return this.triggerInformation.triggers[this.selectedTriggerIndex]
        }
    },
    methods: {
        updateValue(name: string, value: string | number | boolean): void {
            this.selectedTrigger[name] = value
        },
        sendScenario() {
            console.log(this.triggerInformation)
            window.axios.sendScenario(
                {
                    'triggerInformation': JSON.stringify(this.triggerInformation)
                }
            ).then(() => {
                console.log("Finish!?")
            })
        }
    }
})
</script>

<style lang="scss" scoped>
/* Space below Tabs == 98vh - 35px */
#column-container {
    display: flex;
    height: 100%;
}

#left-bar {
    border-right: 1px solid black;
    text-align: left;
    width: 270px;
    flex: 0 0 270px;

    #trigger-actions {
        padding: 5px;
        height: 20vh;
    }

    #trigger-info-wrapper {
        border-top: 1px solid black;
        overflow-y: auto;
        overflow-x: hidden;
    }
}

#trigger-ce-wrapper {
    flex: 5;
    display: flex;
}

#trigger-list {
    flex: 0 0 600px;
    width: 600px;
    overflow-y: auto;
    border-right: 1px solid black;
}

.full {
    width: 100%;
    height: 100%;
}
</style>
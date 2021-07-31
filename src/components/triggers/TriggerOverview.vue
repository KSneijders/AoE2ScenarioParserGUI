<template>
    <div id="column-container">
        <div id="left-bar">
            <div id="trigger-actions">
                Actions here
                <button v-on:click="sendScenario()">Send</button>
                <button v-on:click="syncIdToDo()">Sync ID to DO</button>
            </div>
            <div id="trigger-info-wrapper">
                <TriggerInfo
                    v-if="selectedTriggerIndex !== -1"
                    :selectedTrigger="selectedTrigger"
                    v-on:update-value="updateTriggerValue">
                </TriggerInfo>
            </div>
        </div>
        <div id="trigger-list">
            <table id="trigger-list-table" class="selectable-list">
                <thead>
                <tr>
                    <th title="The ID of the trigger" style="width: 40px">ID</th>
<!--                    <th title="If the trigger is enabled" style="width: 30px; text-align: left;">&nbsp;E</th>-->
<!--                    <th title="If the trigger is looping" style="width: 30px; text-align: left;">&nbsp;L</th>-->
                    <th title="The number of conditions" style="width: 40px; text-align: left;">#C</th>
                    <th title="The number of effects" style="width: 40px; text-align: left;">#E</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(trigger, index) in triggers"
                    v-bind:key="trigger.id"

                    tabindex="0"
                    v-on:click="selectedTriggerIndex = index"
                    v-on:focus="selectedTriggerIndex = index"

                    v-bind:class="{selected: (index === selectedTriggerIndex)}"
                >
                    <td>{{ trigger.id }}</td>
<!--                    <td><input type="checkbox" v-model="trigger.enabled"></td>-->
<!--                    <td><input type="checkbox" v-model="trigger.looping"></td>-->
                    <td>{{ trigger.conditions.length }}</td>
                    <td>{{ trigger.effects.length }}</td>
                    <td class="ws-render">{{ trigger.name }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div id="trigger-ce-wrapper">
            <TriggerCE
                v-if="selectedTriggerIndex !== -1"
                :selectedTrigger="selectedTrigger"
                @update-ce="updateCEValue"
                @ce-event="handleCEEvent"
            >
            </TriggerCE>
        </div>
    </div>
</template>

<script lang="ts">
import TriggerInfo from "./TriggerInfo.vue";
import TriggerCE from "./TriggerCE.vue";
import {defineComponent, PropType} from "vue";
import {Trigger, TriggerInformation} from "@/interfaces/triggers";
import {Value} from "@/interfaces/general";
import {CEEventType, CEType} from "@/enums/ce-enums";
import {range} from "@/scripts/numbers";

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
        syncIdToDo() {
            const displayOrder = this.triggerInformation.triggerDisplayOrder

            const newTriggerArray: Array<Trigger> = []
            for (const [enumerateIndex, arrayIndex] of displayOrder.entries()) {
                this.triggers[arrayIndex].id = enumerateIndex
                newTriggerArray.push(this.triggers[arrayIndex])
            }

            const newTriggerDOArray = range(displayOrder.length)

            this.$emit('trigger-update', newTriggerArray, newTriggerDOArray)
        },
        handleCEEvent(ceType: CEType, eventType: CEEventType, index: number, attr?: string, value?: Value) {
            switch (eventType) {
                case CEEventType.Create:
                    break;
                case CEEventType.Delete:
                    break;
                case CEEventType.Update:
                    if (attr && value) this.updateCEValue(ceType, index, attr, value)
                    break;
                default:
                    break;
            }
        },
        deleteCEValue(ceType: CEType, index: number) {
            //todo Add delete etc.
        },
        updateTriggerValue(attr: string, value: Value): void {
            this.selectedTrigger[attr] = value
        },
        updateCEValue(ceType: CEType, index: number, attr: string, value: Value): void {
            if (ceType === CEType.Effect) {
                this.selectedTrigger.effects[index][attr] = value
            } else if (ceType === CEType.Condition) {
                this.selectedTrigger.conditions[index][attr] = value
            }
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
    flex: 5 1;
    display: flex;
}

#trigger-list {
    //flex: 1 3 400px;
    flex: 5 1;
    //min-width: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid black;
}

.full {
    width: 100%;
    height: 100%;
}
</style>
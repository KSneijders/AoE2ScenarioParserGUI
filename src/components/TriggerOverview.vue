<template>
    <div id="column-container">
        <div id="left-bar">
            <div id="trigger-actions">
                Actions here.<br/>
                {{ selectedTriggerIndex }}
            </div>
            <div id="trigger-info">
                <div class="full" v-if="selectedTriggerIndex !== -1">
                    <div class="row">
                        <label for="s-trigger-name"><b>Name</b>: </label><br/>
                        <input id="s-trigger-name" v-model="sTrigger.name">
                    </div>
                    <div class="row">
                        <input type="checkbox" id="s-trigger-enabled" v-model="sTrigger.enabled">
                        <b>Enabled</b><br/>
                        <input type="checkbox" id="s-trigger-looping" v-model="sTrigger.looping">
                        <b>Looping</b>
                    </div>
                    <div class="row">
                        <div style="float: left;"><b>Description</b>:</div>
                        <div style="text-align: right; margin-right: -4%">
                            <b>STID</b>:
                            <input v-model="sTrigger.description_stid" style="width: 20%; padding: 1px; margin: 0; height: 1em">
                        </div>
                        <textarea rows="2" v-model="sTrigger.description"></textarea>
                    </div>
                    <div class="row">
                        <div style="float: left;"><b>Short Description</b>:</div>
                        <div style="text-align: right; margin-right: -4%">
                            <b>STID</b>:
                            <input v-model="sTrigger.short_description_stid" style="width: 20%; padding: 1px; margin: 0; height: 1em">
                        </div>
                        <textarea rows="2" v-model="sTrigger.short_description"></textarea>
                    </div>
                    <div class="row">
                        <label for="s-description-order"><b>Description Order</b>: </label><br/>
                        <input id="s-description-order" type="number" v-model="sTrigger.description_order">
                    </div>
                    <div class="row">
                        <input type="checkbox" v-model="sTrigger.display_as_objective">
                        <b>Display As Objective</b><br/>
                        <input type="checkbox" v-model="sTrigger.mute_objectives">
                        <b>Mute Objectives</b><br/>
                        <input type="checkbox" v-model="sTrigger.display_on_screen">
                        <b>Display On Screen</b><br/>
                        <input type="checkbox" v-model="sTrigger.header">
                        <b>Header</b>
                    </div>
                </div>
            </div>
        </div>
        <div id="trigger-list">
            <table id="trigger-list-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>E</th>
                    <th>L</th>
                    <th>Name</th>
                    <th>Description</th>
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
                    <td class="ws-render">{{ trigger.name }}</td>
                    <td>{{ trigger.description }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import {Trigger, TriggerInformation} from "@/interfaces/scenario";
import {defineComponent, PropType} from "vue";

export default defineComponent({
    name: "TriggerOverview",
    props: {
        triggerInformation: {
            type: Object as PropType<TriggerInformation>,
            default: () => ({triggerDisplayOrder: [], triggers: []})
        }
    },
    data() {
        return {
            selectedTriggerIndex: -1
        }
    },
    computed: {
        sTrigger: function (): Trigger {
            return this.triggers[this.selectedTriggerIndex]
        },
        triggersInDO: function (): Array<Trigger> {
            return this.triggerInformation.triggerDisplayOrder.map(i => this.triggerInformation.triggers[i])
        },
        triggers: function (): Array<Trigger> {
            return this.triggerInformation.triggers
        }
    },
    mounted() {
        if (this.triggerInformation.triggers.length > 0) this.selectedTriggerIndex = 0
    }
})
</script>

<style lang="scss" scoped>
/* Space below Tabs == 98vh - 35px */
#column-container {
    display: flex;
}

#left-bar {
    flex-basis: 20%;
    border-right: 1px solid black;
    text-align: left;

    #trigger-actions {
        height: calc(20vh);
    }

    #trigger-info {
        height: calc(70vh);
        padding: 5px;
        width: 90%;

        .row {
            border-bottom: 1px dotted gray;
            padding: 10px 0;
        }

        input:not([type=checkbox]), textarea {
            padding: 5px;
            margin: 5px 5px 5px 0;
            width: 100%;
        }

        textarea {
            resize: vertical;
            overflow: auto;
        }

        input[type=checkbox] {
            margin: 0 5px 5px 0;
        }
    }
}

#trigger-list {
    flex-basis: 50%;
    height: calc(98vh - 50px);
    overflow-y: auto;

    &-table {
        border-spacing: 0;
        width: 100%;

        tr {
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

            th {
                background-color: whitesmoke;
                position: sticky;
                top: 0;
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
}

.full {
    width: 100%;
    height: 100%;
}
</style>
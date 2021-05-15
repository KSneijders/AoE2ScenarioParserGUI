<template>
    <div id="trigger-info">
        <div class="row">
            <label for="s-trigger-name"><b>Name</b>: </label><br/>
            <input id="s-trigger-name" @change="update( 'name', $event)" v-bind:value="selectedTrigger.name">
        </div>
        <div class="row">
            <input id="s-trigger-enabled" type="checkbox"
                   @change="update( 'enabled', $event)" v-bind:checked="selectedTrigger.enabled">
            <label for="s-trigger-enabled"><b>Enabled</b></label><br/>
            <input id="s-trigger-looping" type="checkbox"
                   @change="update( 'looping', $event)" v-bind:checked="selectedTrigger.looping">
            <label for="s-trigger-looping"><b>Looping</b></label>
        </div>
        <div class="row">
            <div style="float: left;"><b>Description</b>:</div>
            <div style="text-align: right;">
                <b>STID</b>:
                <input class="stid"
                       v-bind:value="selectedTrigger.description_stid"
                       @change="update( 'description_stid', $event)">
            </div>
            <textarea rows="2"
                      v-bind:value="selectedTrigger.description"
                      @change="update( 'description', $event)"></textarea>
        </div>
        <div class="row">
            <div style="float: left;"><b>Short Description</b>:</div>
            <div style="text-align: right;">
                <b>STID</b>:
                <input v-bind:value="selectedTrigger.short_description_stid" class="stid"
                       @change="update( 'short_description_stid', $event)">
            </div>
            <textarea rows="2" v-bind:value="selectedTrigger.short_description"
                      @change="update( 'short_description', $event)"></textarea>
        </div>
        <div class="row">
            <label for="s-description-order"><b>Description Order</b>: </label><br/>
            <input id="s-description-order" type="number"
                   v-bind:value="selectedTrigger.description_order"
                   @change="update( 'description_order', $event)">
        </div>
        <div class="row">
            <input type="checkbox" v-bind:checked="selectedTrigger.display_as_objective"
                   @change="update( 'display_as_objective', $event)">
            <b>Display As Objective</b><br/>
            <input type="checkbox" v-bind:checked="selectedTrigger.mute_objectives"
                   @change="update( 'mute_objectives', $event)">
            <b>Mute Objectives</b><br/>
            <input type="checkbox" v-bind:checked="selectedTrigger.display_on_screen"
                   @change="update( 'display_on_screen', $event)">
            <b>Display On Screen</b><br/>
            <input type="checkbox" v-bind:checked="selectedTrigger.header"
                   @change="update( 'header', $event)">
            <b>Header</b>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {EventObject} from "@/interfaces/general";
import {Trigger} from "@/interfaces/triggers";

export default defineComponent({
    name: "TriggerInfo",
    props: {
        selectedTrigger: {
            type: Object as PropType<Trigger>
        }
    },
    methods: {
        updateCE(name: string , event: EventObject): void {
            let value: string | boolean = event.target.value

            if (event.target.type == "checkbox")
                value = event.target.checked

            this.$emit('update-value', name, value)
        }
    },
    computed: {}
})
</script>

<style lang="scss" scoped>

#trigger-info {
    height: 70vh;
    padding: 5px;
    width: 100%;

    .row {
        border-bottom: 1px dotted gray;
        padding: 10px 0;

        input:not([type=checkbox]):not(.stid), textarea {
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

        .stid {
            width: 20%;
            padding: 6px;
            margin: 0;
            height: 1.5em
        }
    }

}
</style>
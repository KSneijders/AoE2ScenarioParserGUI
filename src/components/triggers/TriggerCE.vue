<template>
    <div id="ce-overview">
        <div id="ce-list">
            <table class="selectable-list">
                <tr>
                    <th>Type</th>
                    <th>ID</th>
                    <th>Object</th>
                </tr>
                <tr
                    v-for="(condition, index) in conditionsInDO"
                    v-bind:key="index"
                    v-on:click="selectEntry('c', index)"
                    v-bind:class="{selected: (selectedIndex === index && selectedType === 'c')}">
                    <td><b>C</b></td>
                    <td>{{index}}</td>
                    <td>{{conditionName(condition.condition_type)}}</td>
                </tr>
                <tr
                    v-for="(effect, index) in effectsInDO"
                    v-bind:key="index"
                    v-on:click="selectEntry('e', index)"
                    v-bind:class="{selected: (selectedIndex === index && selectedType === 'e')}">
                    <td><b>E</b></td>
                    <td>{{index}}</td>
                    <td>{{effectName(effect.effect_type)}}</td>
                </tr>
            </table>
        </div>
        <div id="ce-content">

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Trigger} from "@/interfaces/triggers";
import {snakeToSpacedPascal} from "@/scripts/string-modifiers";

export default defineComponent({
    name: "TriggerCE",
    props: {
        selectedTrigger: {
            type: Object as PropType<Trigger>
        }
    },
    data() {
        return {
            selectedIndex: -1,  // Not the default values. Defined in: method.resetSelected
            selectedType: ''
        }
    },
    watch: {
        selectedTrigger () {
            if (this.selectedTrigger.conditions.length > 0)
                this.selectEntry('c', 0)
            else if (this.selectedTrigger.effects.length > 0)
                this.selectEntry('e', 0)
            else
                this.resetSelected()
        }
    },
    computed: {
        conditionsInDO: function (): Array<Trigger> {
            return this.selectedTrigger.condition_order.map(i => this.selectedTrigger.conditions[i])
        },
        effectsInDO: function (): Array<Trigger> {
            return this.selectedTrigger.effect_order.map(i => this.selectedTrigger.effects[i])
        },
    },
    methods: {
        selectEntry(type, index) {
            this.selectedType = type
            this.selectedIndex = index
        },
        resetSelected() {
            this.selectedIndex = -1
            this.selectedType = ''
        },
        conditionName(cIndex) {
            return snakeToSpacedPascal(this.$store.state.conditionNames[cIndex])
        },
        effectName(eIndex) {
            return snakeToSpacedPascal(this.$store.state.effectNames[eIndex])
        }
    }
})
</script>

<style lang="scss" scoped>
#ce-overview {
    display: flex;

    #ce-list {
        flex: 1;
        min-width: 350px;
        overflow-y: auto;

        tr {

        }
    }

    #ce-content {
        border-left: 1px solid black;
        flex: 3;
    }
}

</style>
<template>
    <div id="ce-overview">
        <div id="ce-list">
            <table class="selectable-list">
                <tr>
                    <th style="width: 30px; text-align: center">Type</th>
                    <th style="width: 30px; text-align: center">ID</th>
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
            <ConditionView></ConditionView>
            <EffectView
                v-if="selectedType === 'e'"
                :effect="selectedTrigger.effects[selectedIndex]"
                @update-value="updateEffect"
            ></EffectView>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Trigger} from "@/interfaces/triggers";
import {snakeToSpacedPascal} from "@/scripts/string-modifiers";
import {Condition} from "@/interfaces/conditions";
import {Effect} from "@/interfaces/effects";
import {defaultTrigger} from "@/defaults/default-trigger";
import EffectView from "@/components/triggers/EffectView.vue";
import ConditionView from "@/components/triggers/ConditionView.vue";
import {Value} from "@/interfaces/general";

export default defineComponent({
    name: "TriggerCE",
    components: {ConditionView, EffectView},
    props: {
        selectedTrigger: {
            type: Object as PropType<Trigger>,
            default: () => (defaultTrigger)
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
        conditionsInDO: function (): Array<Condition> {
            return this.selectedTrigger.condition_order.map(i => this.selectedTrigger.conditions[i]) || []
        },
        effectsInDO: function (): Array<Effect> {
            return this.selectedTrigger.effect_order.map(i => this.selectedTrigger.effects[i])
        },
    },
    methods: {
        updateCE(ceType: string, attr: string, value: Value) {
            if (ceType === this.selectedType)
                this.$emit('update-ce', ceType, this.selectedIndex, attr, value)
        },
        updateCondition(attr: string, value: Value) {
            this.updateCE('c', attr, value)
        },
        updateEffect(attr: string, value: Value) {
            this.updateCE('e', attr, value)
        },
        selectEntry(ceType: string, index: number) {
            this.selectedType = ceType
            this.selectedIndex = index
        },
        resetSelected() {
            this.selectedIndex = -1
            this.selectedType = ''
        },
        conditionName(cIndex: number) {
            return snakeToSpacedPascal(this.$store.state.conditionNames[cIndex])
        },
        effectName(eIndex: number) {
            return snakeToSpacedPascal(this.$store.state.effectNames[eIndex])
        }
    }
})
</script>

<style lang="scss" scoped>
#ce-overview {
    display: flex;
    width: 100%;

    #ce-list {
        flex: 1;
        overflow-y: auto;

        tr {

        }
    }

    #ce-content {
        flex: 1;
        border-left: 1px solid black;
        overflow-y: auto
    }
}

</style>
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
                    v-for="(condition, index) in selectedTrigger.conditions"
                    v-bind:key="index"

                    tabindex="0"
                    v-on:click="selectEntry(CEType.Condition, index)"
                    v-on:focus="selectEntry(CEType.Condition, index)"
                    v-on:keydown.delete="deleteCE(CEType.Condition)"

                    v-bind:class="{selected: (selectedIndex === index && selectedType === CEType.Condition)}"
                >
                    <td><b>C</b></td>
                    <td>{{ index }}</td>
                    <td>{{ conditionName(condition.condition_type) }}</td>
                </tr>
                <tr
                    v-for="(effect, index) in selectedTrigger.effects"
                    v-bind:key="index"

                    tabindex="0"
                    v-on:click="selectEntry(CEType.Effect, index)"
                    v-on:focus="selectEntry(CEType.Effect, index)"

                    v-bind:class="{selected: (selectedIndex === index && selectedType === CEType.Effect)}">
                    <td><b>E</b></td>
                    <td>{{ index }}</td>
                    <td>{{ effectName(effect.effect_type) }}</td>
                </tr>
            </table>
        </div>
        <div id="ce-content">
            <ConditionView
                v-if="selectedType === CEType.Condition"
                :condition="selectedTrigger.conditions[selectedIndex]"
                @update-value="updateCondition"
            ></ConditionView>
            <EffectView
                v-if="selectedType === CEType.Effect"
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
import {defaultTrigger} from "@/defaults/default-trigger";
import EffectView from "@/components/triggers/EffectView.vue";
import ConditionView from "@/components/triggers/ConditionView.vue";
import {Value} from "@/interfaces/general";
import {CEEventType, CEType} from "@/enums/ce-enums";

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
            // Define to use in template
            CEType: CEType,

            selectedIndex: -1,  // Not the default values. Defined in: method.resetSelected
            selectedType: CEType.None
        }
    },
    watch: {
        selectedTrigger() {
            this.resetSelected()
        }
    },
    computed: {},
    methods: {
        updateCE(ceType: CEType, attr: string, value: Value) {
            if (ceType === this.selectedType)
                this.emitCEEvent(ceType, CEEventType.Update, this.selectedIndex, attr, value)
        },
        deleteCE(ceType: CEType) {
            this.emitCEEvent(ceType, CEEventType.Delete, this.selectedIndex)
        },
        emitCEEvent(ceType: CEType, eventType: CEEventType, index: number, attr?: string, value?: Value) {
            this.$emit('ce-event', ceType, eventType, index, attr, value)
        },
        // removeCE(ceType: string, attr: )
        updateCondition(attr: string, value: Value) {
            this.updateCE(CEType.Condition, attr, value)
        },
        updateEffect(attr: string, value: Value) {
            this.updateCE(CEType.Effect, attr, value)
        },
        selectEntry(ceType: CEType, index: number) {
            this.selectedType = ceType
            this.selectedIndex = index
        },
        resetSelected() {
            if (this.selectedTrigger.conditions.length > 0)
                this.selectEntry(CEType.Condition, 0)
            else if (this.selectedTrigger.effects.length > 0)
                this.selectEntry(CEType.Effect, 0)
            else
                this.selectEntry(CEType.None, -1)
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

        :focus {
            //outline-style: solid;
        }
    }

    #ce-content {
        flex: 1;
        border-left: 1px solid black;
        overflow-y: auto
    }
}

</style>
<template>
    <div id="condition-content">
        <label for="attr-condition-type">Condition Type:</label><br/>
        <select id="attr-condition-type" @change="update( 'condition_type', $event)">
            <option
                v-for="[id, name] in orderedConditionNames"
                v-bind:key="id"
                v-bind:selected="condition.condition_type === parseInt(id)"
                v-bind:value="id"
            >
                {{ sp(name) }}
            </option>
        </select>

        <table>
            <tr v-if="conditionHasAttr('quantity')">
                <td><label v-bind:for="_2dash('quantity')">{{ sp('quantity') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('quantity')"
                           @change="update('quantity', $event)"
                           v-bind:value="condition.quantity"></td>
            </tr>
            <tr v-if="conditionHasAttr('attribute')">
                <td><label v-bind:for="_2dash('attribute')">{{ sp('attribute') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('attribute')"
                           @change="update('attribute', $event)"
                           v-bind:value="condition.attribute"></td>
            </tr>
            <tr v-if="conditionHasAttr('unit_object')">
                <td><label v-bind:for="_2dash('unit_object')">{{ sp('unit_object') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('unit_object')"
                           @change="update('unit_object', $event)"
                           v-bind:value="condition.unit_object"></td>
            </tr>
            <tr v-if="conditionHasAttr('next_object')">
                <td><label v-bind:for="_2dash('next_object')">{{ sp('next_object') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('next_object')"
                           @change="update('next_object', $event)"
                           v-bind:value="condition.next_object"></td>
            </tr>
            <tr v-if="conditionHasAttr('object_list')">
                <td><label v-bind:for="_2dash('object_list')">{{ sp('object_list') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_list')"
                           @change="update('object_list', $event)"
                           v-bind:value="condition.object_list"></td>
            </tr>
            <tr v-if="conditionHasAttr('source_player')">
                <td><label v-bind:for="_2dash('source_player')">{{ sp('source_player') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('source_player')"
                           @change="update('source_player', $event)"
                           v-bind:value="condition.source_player"></td>
            </tr>
            <tr v-if="conditionHasAttr('technology')">
                <td><label v-bind:for="_2dash('technology')">{{ sp('technology') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('technology')"
                           @change="update('technology', $event)"
                           v-bind:value="condition.technology"></td>
            </tr>
            <tr v-if="conditionHasAttr('timer')">
                <td><label v-bind:for="_2dash('timer')">{{ sp('timer') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('timer')"
                           @change="update('timer', $event)"
                           v-bind:value="condition.timer"></td>
            </tr>
            <tr v-if="conditionHasAttr('area_x1')">
                <td><label v-bind:for="_2dash('area_x1')">{{ sp('area_x1') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('area_x1')"
                           @change="update('area_x1', $event)"
                           v-bind:value="condition.area_x1"></td>
            </tr>
            <tr v-if="conditionHasAttr('area_y1')">
                <td><label v-bind:for="_2dash('area_y1')">{{ sp('area_y1') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('area_y1')"
                           @change="update('area_y1', $event)"
                           v-bind:value="condition.area_y1"></td>
            </tr>
            <tr v-if="conditionHasAttr('area_x2')">
                <td><label v-bind:for="_2dash('area_x2')">{{ sp('area_x2') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('area_x2')"
                           @change="update('area_x2', $event)"
                           v-bind:value="condition.area_x2"></td>
            </tr>
            <tr v-if="conditionHasAttr('area_y2')">
                <td><label v-bind:for="_2dash('area_y2')">{{ sp('area_y2') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('area_y2')"
                           @change="update('area_y2', $event)"
                           v-bind:value="condition.area_y2"></td>
            </tr>
            <tr v-if="conditionHasAttr('object_group')">
                <td><label v-bind:for="_2dash('object_group')">{{ sp('object_group') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_group')"
                           @change="update('object_group', $event)"
                           v-bind:value="condition.object_group"></td>
            </tr>
            <tr v-if="conditionHasAttr('object_type')">
                <td><label v-bind:for="_2dash('object_type')">{{ sp('object_type') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_type')"
                           @change="update('object_type', $event)"
                           v-bind:value="condition.object_type"></td>
            </tr>
            <tr v-if="conditionHasAttr('ai_signal')">
                <td><label v-bind:for="_2dash('ai_signal')">{{ sp('ai_signal') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('ai_signal')"
                           @change="update('ai_signal', $event)"
                           v-bind:value="condition.ai_signal"></td>
            </tr>
            <tr v-if="conditionHasAttr('inverted')">
                <td><label v-bind:for="_2dash('inverted')">{{ sp('inverted') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('inverted')"
                           @change="update('inverted', $event)"
                           v-bind:value="condition.inverted"></td>
            </tr>
            <tr v-if="conditionHasAttr('variable')">
                <td><label v-bind:for="_2dash('variable')">{{ sp('variable') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('variable')"
                           @change="update('variable', $event)"
                           v-bind:value="condition.variable"></td>
            </tr>
            <tr v-if="conditionHasAttr('comparison')">
                <td><label v-bind:for="_2dash('comparison')">{{ sp('comparison') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('comparison')"
                           @change="update('comparison', $event)"
                           v-bind:value="condition.comparison"></td>
            </tr>
            <tr v-if="conditionHasAttr('target_player')">
                <td><label v-bind:for="_2dash('target_player')">{{ sp('target_player') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('target_player')"
                           @change="update('target_player', $event)"
                           v-bind:value="condition.target_player"></td>
            </tr>
            <tr v-if="conditionHasAttr('unit_ai_action')">
                <td><label v-bind:for="_2dash('unit_ai_action')">{{ sp('unit_ai_action') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('unit_ai_action')"
                           @change="update('unit_ai_action', $event)"
                           v-bind:value="condition.unit_ai_action"></td>
            </tr>
            <tr v-if="conditionHasAttr('xs_function')">
                <td><label v-bind:for="_2dash('xs_function')">{{ sp('xs_function') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('xs_function')"
                           @change="update('xs_function', $event)"
                           v-bind:value="condition.xs_function"></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Condition} from "@/interfaces/conditions";
import {_2dash, snakeToSpacedPascal} from "@/scripts/string-modifiers";
import {EventObject, Value} from "@/interfaces/general";
import {defaultCondition} from "@/defaults/default-condition";
import {hasOnlyDigits} from "@/scripts/validation";

export default defineComponent({
    name: "ConditionView",
    components: {},
    props: {
        condition: {
            type: Object as PropType<Condition>,
            default: () => defaultCondition
        }
    },
    methods: {
        sp: function (str: string): string {
            return snakeToSpacedPascal(str)
        },
        update(attr: string, event: EventObject): void {
            let value: Value = event.target.value

            if (hasOnlyDigits(value))
                value = parseInt(value)

            if (event.target.type == "checkbox")
                value = event.target.checked

            this.$emit('update-value', attr, value)
        },
        conditionHasAttr(attr: string): boolean {
            console.log(attr)
            console.log(this.condition.condition_type)
            console.log(this.$store.state.conditionAttributes[this.condition.condition_type])
            console.log(this.$store.state.conditionAttributes[this.condition.condition_type].includes(attr))
            return this.$store.state.conditionAttributes[this.condition.condition_type].includes(attr)
        },
        conditionNames: function (): Record<string, string> {
            return this.$store.state.conditionNames
        },
        _2dash: function (str: string): string {
            return _2dash(str)
        }
    },
    computed: {
        currentConditionAttr: function (): Array<string> {
            return this.$store.state.conditionAttributes[this.condition.condition_type]
        },
        orderedConditionNames: function (): Array<Array<string>> {
            const entries = Object.entries(this.conditionNames())
            entries.sort((a, b) => {
                if (b[1] === 'none') return 1  // Sort None before everything
                return a[1] > b[1] ? 1 : -1
            })
            return entries;
        }
    },
})
</script>

<style lang="scss" scoped>
#condition-content {
    padding: 10px;
    text-align: left;
    width: 100%;

    .condition-segment {
        margin: 5px 0;
    }

    select, input, option {
        margin: 3px;
        padding: 5px;
    }

    input[type="number"] {
        width: 100px;
    }

    input.small_input {
        width: 50px;
    }

    label {
        font-weight: bold;
    }
}
</style>
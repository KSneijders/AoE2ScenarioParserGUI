<template>
    <div id="effect-content">
        <label for="attr-effect-type">Effect Type:</label><br/>
        <select id="attr-effect-type" @change="update( 'effect_type', $event)">
            <option
                v-for="[id, name] in orderedEffectNames"
                v-bind:key="id"
                v-bind:selected="effect.effect_type === parseInt(id)"
                v-bind:value="id"
            >
                {{ sp(name) }}
            </option>
        </select>
        <table>
            <tr v-if="effectHasAttr('ai_script_goal')">
                <td><label v-bind:for="_2dash('ai_script_goal')">{{ sp('ai_script_goal') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('ai_script_goal')"
                           @change="update('ai_script_goal', $event)"
                           v-bind:value="effect.ai_script_goal"></td>
            </tr>
            <tr v-if="effectHasAttr('armour_attack_quantity')">
                <td><label v-bind:for="_2dash('armour_attack_quantity')">{{ sp('armour_attack_quantity') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('armour_attack_quantity')"
                           @change="update('armour_attack_quantity', $event)"
                           v-bind:value="effect.armour_attack_quantity"></td>
            </tr>
            <tr v-if="effectHasAttr('armour_attack_quantity')">
                <td><label v-bind:for="_2dash('armour_attack_class')">{{ sp('armour_attack_class') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('armour_attack_class')"
                           @change="update('armour_attack_class', $event)"
                           v-bind:value="effect.armour_attack_class"></td>
            </tr>
            <tr v-if="effectHasAttr('quantity')">
                <td><label v-bind:for="_2dash('quantity')">{{ sp('quantity') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('quantity')"
                           @change="update('quantity', $event)"
                           v-bind:value="effect.quantity"></td>
            </tr>
            <tr v-if="effectHasAttr('tribute_list')">
                <td><label v-bind:for="_2dash('tribute_list')">{{ sp('tribute_list') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('tribute_list')"
                           @change="update('tribute_list', $event)"
                           v-bind:value="effect.tribute_list"></td>
            </tr>
            <tr v-if="effectHasAttr('diplomacy')">
                <td><label v-bind:for="_2dash('diplomacy')">{{ sp('diplomacy') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('diplomacy')"
                           @change="update('diplomacy', $event)"
                           v-bind:value="effect.diplomacy"></td>
            </tr>
            <tr v-if="effectHasAttr('object_list_unit_id')">
                <td><label v-bind:for="_2dash('object_list_unit_id')">{{ sp('object_list_unit_id') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_list_unit_id')"
                           @change="update('object_list_unit_id', $event)"
                           v-bind:value="effect.object_list_unit_id"></td>
            </tr>
            <tr v-if="effectHasAttr('source_player')">
                <td><label v-bind:for="_2dash('source_player')">{{ sp('source_player') }}</label></td>
                <td>
                    <select @change="update('source_player', $event)">
                        <option v-for="i in [...Array(9).keys()]"
                                v-bind:key="i" v-bind:value="i"
                                v-bind:selected="i === effect.source_player">
                            {{ i === 0 ? 'GAIA' : i }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr v-if="effectHasAttr('target_player')">
                <td><label v-bind:for="_2dash('target_player')">{{ sp('target_player') }}</label></td>
                <td>
                    <select @change="update('target_player', $event)">
                        <option v-for="i in [...Array(9).keys()]"
                                v-bind:key="i" v-bind:value="i"
                                v-bind:selected="i === effect.target_player">
                            {{ i === 0 ? 'GAIA' : i }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr v-if="effectHasAttr('technology')">
                <td><label v-bind:for="_2dash('technology')">{{ sp('technology') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('technology')"
                           @change="update('technology', $event)"
                           v-bind:value="effect.technology"></td>
            </tr>
            <tr v-if="effectHasAttr('string_id')">
                <td><label v-bind:for="_2dash('string_id')">{{ sp('string_id') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('string_id')"
                           @change="update('string_id', $event)"
                           v-bind:value="effect.string_id"></td>
            </tr>
            <tr v-if="effectHasAttr('display_time')">
                <td><label v-bind:for="_2dash('display_time')">{{ sp('display_time') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('display_time')"
                           @change="update('display_time', $event)"
                           v-bind:value="effect.display_time"></td>
            </tr>
            <tr v-if="effectHasAttr('trigger_id')">
                <td><label v-bind:for="_2dash('trigger_id')">{{ sp('trigger_id') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('trigger_id')"
                           @change="update('trigger_id', $event)"
                           v-bind:value="effect.trigger_id"></td>
            </tr>
            <tr v-if="effectHasAttr('location_x')">
                <td><label>Location</label></td>
                <td>
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('location_x')"
                           @change="update('location_x', $event)"
                           v-bind:value="effect.location_x">
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('location_y')"
                           @change="update('location_y', $event)"
                           v-bind:value="effect.location_y">
                </td>
            </tr>
            <tr v-if="effectHasAttr('location_object_reference')">
                <td><label v-bind:for="_2dash('location_object_reference')">{{
                        sp('location_object_reference')
                    }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('location_object_reference')"
                           @change="update('location_object_reference', $event)"
                           v-bind:value="effect.location_object_reference"></td>
            </tr>
            <tr v-if="effectHasAttr('area_1_x')">
                <td><label>Area</label></td>
            </tr>
            <tr v-if="effectHasAttr('area_1_x')">
                <td colspan="2">
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('area_1_x')"
                           @change="update('area_1_x', $event)"
                           v-bind:value="effect.area_1_x">
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('area_1_y')"
                           @change="update('area_1_y', $event)"
                           v-bind:value="effect.area_1_y">
                    to
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('area_2_x')"
                           @change="update('area_2_x', $event)"
                           v-bind:value="effect.area_2_x">
                    <input type="number" class="small_input"
                           v-bind:id="_2dash('area_2_y')"
                           @change="update('area_2_y', $event)"
                           v-bind:value="effect.area_2_y">
                </td>
            </tr>
            <tr v-if="effectHasAttr('object_group')">
                <td><label v-bind:for="_2dash('object_group')">{{ sp('object_group') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_group')"
                           @change="update('object_group', $event)"
                           v-bind:value="effect.object_group"></td>
            </tr>
            <tr v-if="effectHasAttr('object_type')">
                <td><label v-bind:for="_2dash('object_type')">{{ sp('object_type') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_type')"
                           @change="update('object_type', $event)"
                           v-bind:value="effect.object_type"></td>
            </tr>
            <tr v-if="effectHasAttr('instruction_panel_position')">
                <td><label
                    v-bind:for="_2dash('instruction_panel_position')">{{ sp('instruction_panel_position') }}</label>
                </td>
                <td><input type="number"
                           v-bind:id="_2dash('instruction_panel_position')"
                           @change="update('instruction_panel_position', $event)"
                           v-bind:value="effect.instruction_panel_position"></td>
            </tr>
            <tr v-if="effectHasAttr('attack_stance')">
                <td><label v-bind:for="_2dash('attack_stance')">{{ sp('attack_stance') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('attack_stance')"
                           @change="update('attack_stance', $event)"
                           v-bind:value="effect.attack_stance"></td>
            </tr>
            <tr v-if="effectHasAttr('time_unit')">
                <td><label v-bind:for="_2dash('time_unit')">{{ sp('time_unit') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('time_unit')"
                           @change="update('time_unit', $event)"
                           v-bind:value="effect.time_unit"></td>
            </tr>
            <tr v-if="effectHasAttr('enabled')">
                <td><label v-bind:for="_2dash('enabled')">{{ sp('enabled') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('enabled')"
                           @change="update('enabled', $event)"
                           v-bind:value="effect.enabled"></td>
            </tr>
            <tr v-if="effectHasAttr('food')">
                <td><label v-bind:for="_2dash('food')">{{ sp('food') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('food')"
                           @change="update('food', $event)"
                           v-bind:value="effect.food"></td>
            </tr>
            <tr v-if="effectHasAttr('wood')">
                <td><label v-bind:for="_2dash('wood')">{{ sp('wood') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('wood')"
                           @change="update('wood', $event)"
                           v-bind:value="effect.wood"></td>
            </tr>
            <tr v-if="effectHasAttr('stone')">
                <td><label v-bind:for="_2dash('stone')">{{ sp('stone') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('stone')"
                           @change="update('stone', $event)"
                           v-bind:value="effect.stone"></td>
            </tr>
            <tr v-if="effectHasAttr('gold')">
                <td><label v-bind:for="_2dash('gold')">{{ sp('gold') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('gold')"
                           @change="update('gold', $event)"
                           v-bind:value="effect.gold"></td>
            </tr>
            <tr v-if="effectHasAttr('item_id')">
                <td><label v-bind:for="_2dash('item_id')">{{ sp('item_id') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('item_id')"
                           @change="update('item_id', $event)"
                           v-bind:value="effect.item_id"></td>
            </tr>
            <tr v-if="effectHasAttr('flash_object')">
                <td><label v-bind:for="_2dash('flash_object')">{{ sp('flash_object') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('flash_object')"
                           @change="update('flash_object', $event)"
                           v-bind:value="effect.flash_object"></td>
            </tr>
            <tr v-if="effectHasAttr('force_research_technology')">
                <td><label
                    v-bind:for="_2dash('force_research_technology')">{{ sp('force_research_technology') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('force_research_technology')"
                           @change="update('force_research_technology', $event)"
                           v-bind:value="effect.force_research_technology"></td>
            </tr>
            <tr v-if="effectHasAttr('visibility_state')">
                <td><label v-bind:for="_2dash('visibility_state')">{{ sp('visibility_state') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('visibility_state')"
                           @change="update('visibility_state', $event)"
                           v-bind:value="effect.visibility_state"></td>
            </tr>
            <tr v-if="effectHasAttr('scroll')">
                <td><label v-bind:for="_2dash('scroll')">{{ sp('scroll') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('scroll')"
                           @change="update('scroll', $event)"
                           v-bind:value="effect.scroll"></td>
            </tr>
            <tr v-if="effectHasAttr('operation')">
                <td><label v-bind:for="_2dash('operation')">{{ sp('operation') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('operation')"
                           @change="update('operation', $event)"
                           v-bind:value="effect.operation"></td>
            </tr>
            <tr v-if="effectHasAttr('object_list_unit_id_2')">
                <td><label v-bind:for="_2dash('object_list_unit_id_2')">{{ sp('object_list_unit_id_2') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_list_unit_id_2')"
                           @change="update('object_list_unit_id_2', $event)"
                           v-bind:value="effect.object_list_unit_id_2"></td>
            </tr>
            <tr v-if="effectHasAttr('button_location')">
                <td><label v-bind:for="_2dash('button_location')">{{ sp('button_location') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('button_location')"
                           @change="update('button_location', $event)"
                           v-bind:value="effect.button_location"></td>
            </tr>
            <tr v-if="effectHasAttr('ai_signal_value')">
                <td><label v-bind:for="_2dash('ai_signal_value')">{{ sp('ai_signal_value') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('ai_signal_value')"
                           @change="update('ai_signal_value', $event)"
                           v-bind:value="effect.ai_signal_value"></td>
            </tr>
            <tr v-if="effectHasAttr('object_attributes')">
                <td><label v-bind:for="_2dash('object_attributes')">{{ sp('object_attributes') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('object_attributes')"
                           @change="update('object_attributes', $event)"
                           v-bind:value="effect.object_attributes"></td>
            </tr>
            <tr v-if="effectHasAttr('variable')">
                <td><label v-bind:for="_2dash('variable')">{{ sp('variable') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('variable')"
                           @change="update('variable', $event)"
                           v-bind:value="effect.variable"></td>
            </tr>
            <tr v-if="effectHasAttr('timer')">
                <td><label v-bind:for="_2dash('timer')">{{ sp('timer') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('timer')"
                           @change="update('timer', $event)"
                           v-bind:value="effect.timer"></td>
            </tr>
            <tr v-if="effectHasAttr('facet')">
                <td><label v-bind:for="_2dash('facet')">{{ sp('facet') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('facet')"
                           @change="update('facet', $event)"
                           v-bind:value="effect.facet"></td>
            </tr>
            <tr v-if="effectHasAttr('play_sound')">
                <td><label v-bind:for="_2dash('play_sound')">{{ sp('play_sound') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('play_sound')"
                           @change="update('play_sound', $event)"
                           v-bind:value="effect.play_sound"></td>
            </tr>
            <tr v-if="effectHasAttr('player_color')">
                <td><label v-bind:for="_2dash('player_color')">{{ sp('player_color') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('player_color')"
                           @change="update('player_color', $event)"
                           v-bind:value="effect.player_color"></td>
            </tr>
            <tr v-if="effectHasAttr('message')">
                <td colspan="2">
                    <label v-bind:for="_2dash('message')">{{ sp('message') }}</label>
                    <br/>
                    <input type="text"
                           v-bind:id="_2dash('message')"
                           @change="update('message', $event)"
                           v-bind:value="effect.message">
                </td>
            </tr>
            <tr v-if="effectHasAttr('sound_name')">
                <td><label v-bind:for="_2dash('sound_name')">{{ sp('sound_name') }}</label></td>
                <td><input type="text"
                           v-bind:id="_2dash('sound_name')"
                           @change="update('sound_name', $event)"
                           v-bind:value="effect.sound_name"></td>
            </tr>
            <tr v-if="effectHasAttr('selected_object_ids')">
                <td><label v-bind:for="_2dash('selected_object_ids')">{{ sp('selected_object_ids') }}</label></td>
                <td><input type="number"
                           v-bind:id="_2dash('selected_object_ids')"
                           @change="update('selected_object_ids', $event)"
                           v-bind:value="effect.selected_object_ids"></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Effect} from "@/interfaces/effects";
import {_2dash, snakeToSpacedPascal} from "@/scripts/string-modifiers";
import {EventObject, Value} from "@/interfaces/general";
import {defaultEffect} from "@/defaults/default-effect";
import {hasOnlyDigits} from "@/scripts/validation";

export default defineComponent({
    name: "EffectView",
    components: {},
    props: {
        effect: {
            type: Object as PropType<Effect>,
            default: () => defaultEffect
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
        effectHasAttr(attr: string): boolean {
            return this.$store.state.effectAttributes[this.effect.effect_type].includes(attr)
        },
        effectNames: function (): Record<string, string> {
            return this.$store.state.effectNames
        },
        _2dash: function (str: string): string {
            return _2dash(str)
        }
    },
    computed: {
        currentEffectAttr: function (): Array<string> {
            return this.$store.state.effectAttributes[this.effect.effect_type]
        },
        orderedEffectNames: function (): Array<Array<string>> {
            const entries = Object.entries(this.effectNames())
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
#effect-content {
    padding: 10px;
    text-align: left;
    width: 100%;

    .effect-segment {
        margin: 5px 0;
    }

    select, input, option {
        margin: 3px;
        padding: 5px;
    }

    input[type="number"] {
        width: 100px;
    }

    input[type="text"] {
        width: 100%;
        margin-left: 0;
    }

    input.small_input {
        width: 50px;
    }

    label {
        font-weight: bold;
    }
}
</style>
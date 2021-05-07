<template>
    <div>
        <table>
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
            <tr v-for="trigger in triggersInDO" v-bind:key="trigger['id']">
                <td>{{ trigger['id'] }}</td>
                <td><input type="checkbox" v-bind:checked="trigger['enabled']"></td>
                <td><input type="checkbox" v-bind:checked="trigger['looping']"></td>
                <td>{{ trigger['name'] }}</td>
                <td>{{ trigger['description'] }}</td>
            </tr>
            </tbody>
        </table>
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
    data() {  // eslint-disable-line @typescript-eslint/no-empty-function
    },
    computed: {
        triggersInDO: function (): Array<Trigger> {
            return this.triggerInformation.triggerDisplayOrder.map(i => this.triggerInformation.triggers[i])
        }
    }
})
</script>

<style lang="scss" scoped>
table {
    border-spacing: 0;

    tr {
        td {
            text-align: left;
        }

        th {
            background-color: whitesmoke;
            position: sticky;
            top: 0;
        }
    }
}
</style>
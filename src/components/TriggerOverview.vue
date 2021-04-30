<template>
    <div>
        <table>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Enabled</td>
                <td>Looping</td>
                <td>Description</td>
            </tr>
            <tr v-for="trigger in triggers" v-bind:key="trigger.id">
                <td>{{ trigger['id'] }}</td>
                <td>{{ trigger['name'] }}</td>
                <td>{{ trigger['enabled'] }}</td>
                <td>{{ trigger['looping'] }}</td>
                <td>{{ trigger['description'] }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "TriggerOverview",
    mounted() {
        this.$http.get('http://localhost:5000/triggers').then(response => {
            this.triggers = response.data.triggers  // Todo: Change API side to direct list, not object.triggers[...]
        }, response => {
            console.log("Failed")
            console.log(response)
        })
    },
    data() {
        return {
            triggers: {}
        }
    }
}
</script>

<style scoped>

</style>
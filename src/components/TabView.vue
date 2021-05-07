<template>
    <div id="tab-view">
        <div class="tab-item"
              v-for="(entry, index) of tabs"
              v-bind:key="entry.name"
              v-on:click="selectTab(index)"
              v-bind:class="{selected: (index === selectedTab)}"
        >
            {{ entry.name }}
        </div>
    </div>
</template>

<script lang="ts">
import {TabEntry} from "@/interfaces/general";
import {defineComponent} from "vue";
import {mod} from "@/scripts/numbers";


export default defineComponent({
    name: "TabView",
    data() {
        return {
            tabs: [
                {'name': 'Players'},
                {'name': 'Map'},
                {'name': 'Units'},
                {'name': 'Triggers'},
            ] as Array<TabEntry>,
            selectedTab: 3
        }
    },
    methods: {
        getTab: function (tabName: string): TabEntry {
            return this.tabs.filter((entry: TabEntry) => entry.name === tabName)[0]
        },
        selectTab: function (index: number): void {
            this.selectedTab = index
            this.$emit('tab-select', this.tabs[index].name)
        }
    },
    mounted() {
        this.selectTab(this.selectedTab)

        // Register tab event
        const checkTabPress = (e: KeyboardEvent) => {
            if (e.code === "Tab" && e.ctrlKey) {
                const direction = e.shiftKey ? -1 : 1
                this.selectTab(mod(this.selectedTab + direction,  this.tabs.length))
            }
        }
        document?.querySelector('body')?.addEventListener('keyup', checkTabPress);
    }
});

</script>

<style lang="scss" scoped>
#tab-view {
    width: 100%;
    text-align: left;
}
.tab-item {
    display: inline-block;
    padding: 5px;
    border-color: black;
    border-style: solid;
    border-width: 1px 1px 0 1px;
    border-radius: 5px 5px 0 0;
    user-select: none;
    min-width: 100px;
    text-align: center;
    margin: 1px;

    &:hover {
        cursor: pointer;
    }

    &.selected {
        background-color: whitesmoke;
    }
}
</style>

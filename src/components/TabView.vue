<template>
    <div id="tab-view">
        <div class="tab-item"
              v-for="(entry, index) of tabs"
              v-bind:key="entry.name"
              v-on:click="selectTab(index)"
              v-bind:class="{selected: (index === selectedTab), disabled: !entry.enabled}"
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
            selectedTab: 3,
            tabs: [
                {'name': 'Players',     'enabled': false},
                {'name': 'Map',         'enabled': false},
                {'name': 'Units',       'enabled': false},
                {'name': 'Triggers',    'enabled': true},
                {'name': 'TriggerText', 'enabled': false},
            ] as Array<TabEntry>
        }
    },
    methods: {
        getTab: function (tabName: string): TabEntry {
            return this.tabs.filter((entry: TabEntry) => entry.name === tabName)[0]
        },
        selectTab: function (index: number): void {
            if (this.tabs[index].enabled) {
                this.selectedTab = index
                this.$emit('tab-select', this.tabs[index].name)
            }
        }
    },
    mounted() {
        this.selectTab(this.selectedTab)

        // Register tab event
        const checkTabPress = (e: KeyboardEvent) => {
            if (e.code === "Tab" && e.ctrlKey) {
                const direction = e.shiftKey ? -1 : 1
                let newIndex = mod(this.selectedTab + direction,  this.tabs.length)

                let maxSteps = 10;  // No inf loop!
                while (!this.tabs[newIndex].enabled && maxSteps > 0) {
                    newIndex = mod(newIndex + direction,  this.tabs.length)
                    maxSteps--
                }

                if (maxSteps !== 0) this.selectTab(newIndex)
            }
        }
        document?.querySelector('body')?.addEventListener('keyup', checkTabPress);
    }
});

</script>

<style lang="scss" scoped>
#tab-view {
    background-color: white;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid black;
    position: sticky;
    top: 0;
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
        background-color: lightgray;
    }

    &.disabled {
        color: #d0d0d0;
        border-color: #d0d0d0;

        &:hover {
            cursor: not-allowed;
        }
    }
}
</style>

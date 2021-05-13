import {createStore} from 'vuex'
import {Effect} from "@/interfaces/effects";
import {Condition} from "@/interfaces/conditions";

export default createStore({
    state() {
        return {
            effectAttributes: [] as Array<Effect>,
            effectNames: [] as Record<number, string>,
            conditionAttributes: [] as Array<Condition>,
            conditionNames: [] as Record<number, string>,
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})

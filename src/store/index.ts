import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            effectAttributes: [] as Array<string>,
            effectNames: {} as Record<string, string>,
            conditionAttributes: [] as Array<string>,
            conditionNames: {} as Record<string, string>,
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})

import {Effect} from "@/interfaces/effects";
import {Condition} from "@/interfaces/conditions";

export interface Trigger {
    [key: string]: number | string | boolean | Array<Effect | Condition | number>;
    id: number;
    name: string;
    enabled: boolean;
    looping: boolean;
    description: string;
    description_stid: number;
    short_description: string;
    short_description_stid: number;
    description_order: number;
    display_as_objective: boolean;
    display_on_screen: boolean;
    header: boolean;
    mute_objectives: boolean;
    conditions: Array<Condition>;
    condition_order: Array<number>;
    effects: Array<Effect>;
    effect_order: Array<number>;
}

export interface TriggerInformation {
    triggers: Trigger[];
    triggerDisplayOrder: Array<number>;
}

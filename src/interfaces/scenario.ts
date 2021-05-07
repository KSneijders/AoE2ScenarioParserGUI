
export interface Trigger {
    id: number;
    name: string;
    enabled: boolean;
    looping: boolean;
    description: string;
    description_stid: number;
    short_description: string;
    short_description_stid: number;
    description_order: string;
    display_as_objective: boolean;
    display_on_screen: boolean;
    header: boolean;
    mute_objectives: boolean;
}

export interface TriggerInformation {
    triggers: Array<Trigger>;
    triggerDisplayOrder: Array<number>;
}

export interface ScenarioRequest {
    triggerInformation: TriggerInformation;
}
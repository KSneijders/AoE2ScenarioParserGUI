
export interface Trigger {
    id: number;
    name: string;
    enabled: boolean;
    looping: boolean;
    description: string;
}

export interface TriggerInformation {
    triggers: Array<Trigger>;
    triggerDisplayOrder: Array<number>;
}

export interface ScenarioRequest {
    triggerInformation: TriggerInformation;
}
import {TriggerInformation} from "@/interfaces/triggers";

export interface ScenarioRequest {
    success: boolean;
    data: {
        triggerInformation: TriggerInformation;
    };
    error?: {
        reason: string;
    };
}

export interface ScenarioRequestReturn {
    triggerInformation: string;
}
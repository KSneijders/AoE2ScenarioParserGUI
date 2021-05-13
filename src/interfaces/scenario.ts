import {TriggerInformation} from "@/interfaces/triggers";

export interface ScenarioRequest {
    triggerInformation: TriggerInformation;
}

export interface ScenarioRequestReturn {
    triggerInformation: string;
}
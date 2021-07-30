export interface TabEntry {
    name: string;
    enabled: boolean;
}

export interface EventObject {
    target: {
        value: string;
        type: string;
        checked: boolean;
    };
}

export interface ParserInstalledRequest {
    code: number;
    message: string;
}

export interface FileSelected {
    filepath: string;
}

export interface FileSelectionError {
    reason: string;
}

export type Value = string | number | boolean
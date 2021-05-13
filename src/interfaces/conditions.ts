export interface Condition {
    condition_type: number;
    quantity?: number;
    attribute?: number;
    unit_object?: number;
    next_object?: number;
    object_list?: number;
    source_player?: number;
    technology?: number;
    timer?: number;
    area_1_x?: number;
    area_1_y?: number;
    area_2_x?: number;
    area_2_y?: number;
    object_group?: number;
    object_type?: number;
    ai_signal?: number;
    inverted?: number;
    variable?: number;
    comparison?: number;
    target_player?: number;
    unit_ai_action?: number;
    xs_function?: string;
}
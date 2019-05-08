export type PartialState<T = any, K extends string = string> = { [P in K]: T }

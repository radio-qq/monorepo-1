declare interface Recordable<T = unknown> {
  [key: string]: T
}

declare type Nullable<T> = T | null

declare type Arrayable<T> = T | T[]

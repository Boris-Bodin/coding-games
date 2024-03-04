declare function readline(): string;

declare interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

declare interface Iterable<T> {
}

declare interface Set<T> extends Iterable<T> {
    constructor(args?: Array<T>);
}
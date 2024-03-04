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

class Vector {
    constructor(public readonly id: number, public readonly x: number, public readonly y: number, public visited: boolean = false) {
    }

    getDistanceTo(destination: Vector) {
        return Math.sqrt(Math.pow(this.x - destination.x, 2) + Math.pow(this.y - destination.y, 2));
    }
}

function DFS(vertices: Array<Vector>, vertex: Vector): Array<Vector> {
    vertex.visited = true;
    const connexeVertex = [vertex];
    const sortedVertices = vertices.sort((a, b) => vertex.getDistanceTo(a) - vertex.getDistanceTo(b));
    for (let neighbour of sortedVertices) {
        if (!neighbour.visited) {
            connexeVertex.push(...DFS(vertices, neighbour));
        }
    }
    return connexeVertex;
}

const NB_VECTOR: number = parseInt(readline());
const ALL_VECTOR: Array<Vector> = [];


for (let i = 0; i < NB_VECTOR; i++) {
    const inputs: string[] = readline().split(' ');
    let vector = new Vector(i, parseInt(inputs[0]), parseInt(inputs[1]));
    ALL_VECTOR.push(vector);
}

const path = DFS(ALL_VECTOR, ALL_VECTOR[0]);
console.log(path.map(value => value.id).join(' ') + ' ' + ALL_VECTOR[0].id);

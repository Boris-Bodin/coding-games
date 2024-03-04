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
    constructor(public readonly id: number, public readonly x: number, public readonly y: number) {
    }

    getDistanceTo(destination: Vector) {
        return Math.sqrt(Math.pow(this.x - destination.x, 2) + Math.pow(this.y - destination.y, 2));
    }
}

function DFS(vertices: Array<Vector>, vertex: Vector): {path:Array<Vector>, cost: number} {
    let minimalCost = 1800*1800*300;
    let minimalPath = [];
    if(!vertex){
        return {path:minimalPath, cost:minimalCost};
    }
    if(vertices.length === 0) {
        return {path:[vertex, ALL_VECTOR[0]], cost: vertex.getDistanceTo(ALL_VECTOR[0])};
    }
    const sortedVertices = vertices.slice(0).sort((a, b) => vertex.getDistanceTo(a) - vertex.getDistanceTo(b));
    for(let i = 0; i < sortedVertices.length && (NB_VECTOR < 10 || i < 1);i++){
        let {path, cost} = DFS(sortedVertices.slice(0,i).concat(sortedVertices.slice(i+1)), sortedVertices[i]);
        if(path.length === 0) {
            continue;
        }
        const newCost = cost + vertex.getDistanceTo(path[0]);
        if(minimalCost > newCost){
            minimalCost = newCost;
            minimalPath = [vertex, ...path];
        }
    }
    return {path:minimalPath, cost:minimalCost};
}

const NB_VECTOR: number = parseInt(readline());
const ALL_VECTOR: Array<Vector> = [];


for (let i = 0; i < NB_VECTOR; i++) {
    const inputs: string[] = readline().split(' ');
    let vector = new Vector(i, parseInt(inputs[0]), parseInt(inputs[1]));
    ALL_VECTOR.push(vector);
}

const {path, cost} = DFS(ALL_VECTOR.slice(1), ALL_VECTOR[0]);
console.log(path.map(value => value.id).join(' '));

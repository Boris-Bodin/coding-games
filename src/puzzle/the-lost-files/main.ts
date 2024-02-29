declare function readline(): string;

const GRAPH_SIZE: number = parseInt(readline());

interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

class Vertex {
    name: number = -1;
    children: Array<Vertex> = [];
    edges: Array<Edge> = [];

    visited: boolean = false;
    index: number = -1;
    lowIndex: number = GRAPH_SIZE;

    constructor(name: number) {
        this.name = name
    }

    toString() {
        return this.name + ': ' + this.edges.map((edge: Edge) => '(' + edge.toString() + ')').join(' ')
            + '\n    ' + this.children.map((vertex: Vertex) => vertex.name).join(' ');
    }

    hashCode() {
        return this.name;
    }
}

class Edge {
    v1: Vertex;
    v2: Vertex;
    tilesValidationNumber: number = 0;

    index: number = -1;
    lowIndex: number = GRAPH_SIZE;

    constructor(v1: Vertex, v2: Vertex) {
        this.v1 = v1;
        this.v2 = v2;
    }

    toString() {
        return this.v1.name + ' -> ' + this.v2.name + ': ' + this.index + '/' + this.lowIndex;
    }

    hashCode() {
        return this.v1.name * GRAPH_SIZE + this.v2.name;
    }
}

class Graph {

    vertices: Array<Vertex> = [];
    edges: Array<Edge> = [];

    static from(connectedComponent: Vertex[]): any {
        let graph = new Graph();
        connectedComponent.forEach((vertex: Vertex) => {
            graph.vertices.push(vertex);
            vertex.edges.forEach((edge: Edge) => {
                if (!graph.edges.find((e: Edge) => e === edge)) {
                    graph.edges.push(edge);
                }
            });
        })
        return graph;
    }

    static init() {
        let graph = new Graph();
        for (let i = 0; i < GRAPH_SIZE; i++) {
            const inputs: number[] = readline().split(' ').map(value => parseInt(value.trim())).sort((a, b) => a - b);
            graph.add(inputs[0], inputs[1]);
        }

        let nbVertices: number = graph.vertices.length;
        do {
            nbVertices = graph.vertices.length
            Graph.clean(graph);
        } while (nbVertices !== graph.vertices.length);

        // console.error(graph.toString());

        return graph;
    }

    private static clean(graph: Graph) {
        graph.vertices.forEach(vertex => {

            if (vertex.edges.length !== 2) {
                return;
            }

            let v1 = vertex.edges[0].v1 === vertex ? vertex.edges[0].v2 : vertex.edges[0].v1;
            let v2 = vertex.edges[1].v1 === vertex ? vertex.edges[1].v2 : vertex.edges[1].v1;

            if (v1.children.includes(v2)) {
                return;
            }

            v1.edges = v1.edges.filter(e => e !== vertex.edges[0]);
            v2.edges = v2.edges.filter(e => e !== vertex.edges[1]);
            graph.edges = graph.edges.filter(e => e !== vertex.edges[0] && e !== vertex.edges[1]);
            v1.children = v1.children.filter(v => v !== vertex);
            v2.children = v2.children.filter(v => v !== vertex);
            graph.vertices = graph.vertices.filter(v => v !== vertex);
            if (v1.name < v2.name)
                graph.add(v1.name, v2.name);
            else
                graph.add(v2.name, v1.name);
        });
    }

    private add(n1: number, n2: number) {
        const vertex1 = this.getVertex(n1);
        const vertex2 = this.getVertex(n2);
        const edge = new Edge(vertex1, vertex2);
        vertex1.children.push(vertex2);
        vertex1.edges.push(edge);
        vertex2.children.push(vertex1);
        vertex2.edges.push(edge);
        this.edges.push(edge);
    }

    private getVertex(n1: number) {
        const foundVertex = this.findVertex(n1);
        if (foundVertex) {
            return foundVertex;
        }
        const newVertex = new Vertex(n1);
        this.vertices.push(newVertex);
        return newVertex;
    }

    private findVertex(name: number): Vertex {
        return this.vertices.find((vertex: Vertex) => vertex.name === name);
    }

    toString() {
        return 'Graph:\n  Vertices:\n    ' +
            this.vertices.map((vertex: Vertex) => vertex.toString()).join('\n    ') + '\n  Edges:\n    ' +
            this.edges.map((edge: Edge) => edge.toString()).join('\n    ');
    }

}

class DFSRunner {

    public findConnectedComponents(graph: Graph): Array<Graph> {
        const connectedComponents: Array<Graph> = []
        for (let vertex of graph.vertices) {
            if (!vertex.visited) {
                let vertices = this.DFS(vertex);
                connectedComponents.push(Graph.from(vertices));
            }
        }
        return connectedComponents
    }

    public DFS(vertex: Vertex): Array<Vertex> {
        vertex.visited = true;
        const connexeVertex = [vertex];
        for (let child of vertex.children) {
            if (!child.visited) {
                connexeVertex.push(...this.DFS(child));
            }
        }
        return connexeVertex;
    }
}

class PolygonFinder {

    private minimalStack: Array<Vertex> = []

    execute(graph: Graph): Array<Array<Vertex>> {
        const strongConnect: Array<Array<Vertex>> = [];
        for (let edge of graph.edges) {
            strongConnect.push(...this.findPolygonsFor(edge, graph, strongConnect));
        }
        return strongConnect
    };

    private findPolygonsFor(edge: Edge, graph: Graph, alreadyFoundPolygon: Array<Array<Vertex>>): Array<Array<Vertex>> {
        if (edge.tilesValidationNumber >= 2) {
            return [];
        }

        graph.edges.forEach((edge: Edge) => {
            edge.index = -1;
            edge.lowIndex = GRAPH_SIZE;
        });
        graph.vertices.forEach((vertex: Vertex) => {
            vertex.index = -1;
            vertex.lowIndex = GRAPH_SIZE;
        });
        this.minimalStack = []

        this.BFS(edge.v1, edge, alreadyFoundPolygon);

        const alreadyExist = alreadyFoundPolygon.some(p => this.hashPolygon(p) === this.hashPolygon(this.minimalStack));
        if (alreadyExist) {
            return [];
        }
        for (let i = 0; i < this.minimalStack.length; i++) {
            const firstVertex = this.minimalStack[i];
            const secondVertex = this.minimalStack[i + 1] ?? this.minimalStack[0];
            const edge = firstVertex.edges.find((edge: Edge) => edge.v1.name === Math.min(firstVertex.name, secondVertex.name) && edge.v2.name === Math.max(firstVertex.name, secondVertex.name));
            edge.tilesValidationNumber++;
        }

        // console.error(this.minimalStack.map(value => '(' + value.name + ')').join(','));

        return [this.minimalStack];
    }

    public hashPolygon(p: Array<Vertex>) {
        return p.map(v => v.name).sort((a, b) => a - b).join(',');
    }

    public BFS(vertex: Vertex, edge: Edge, alreadyFoundPolygon: Array<Array<Vertex>>) {
        const queue: Array<BFSState> = [new BFSState(vertex, edge)];
        while (queue.length > 0) {
            const currentState: BFSState = queue.shift();
            queue.push(...this.BFSProcess(currentState, alreadyFoundPolygon));
        }
    }

    private BFSProcess(currentState: BFSState, alreadyFoundPolygon: Array<Array<Vertex>>): Array<BFSState> {
        let stack = currentState.stack;
        let edge = currentState.edge;
        let vertex = currentState.vertex;
        let currentIndex = currentState.currentIndex;

        if (this.minimalStack.length > 0 && this.minimalStack.length <= stack.length) {
            return [];
        }

        const nextVertex: Vertex = edge.v1 === vertex ? edge.v2 : edge.v1;
        if (edge.index === -1) {
            edge.index = currentIndex;
        }
        if (stack.includes(nextVertex)) {
            if (nextVertex === stack[0]) {
                if (this.minimalStack.length === 0 || this.minimalStack.length > stack.length) {
                    this.minimalStack = [...stack];
                }
                edge.lowIndex = Math.min(currentIndex, edge.lowIndex);
                stack.forEach((value, index) => {
                    if (value.lowIndex > edge.lowIndex) {
                        value.index = index;
                        value.lowIndex = edge.lowIndex;
                    }
                });
            }
            return [];
        }

        return nextVertex.edges.filter(e => e !== edge).map(e => new BFSState(nextVertex, e, currentIndex + 1, [...stack, nextVertex]));
    }
}

class BFSState {
    constructor(public vertex: Vertex, public edge: Edge, public currentIndex = 0, public stack: Array<Vertex> = [vertex]) {
    }

    toString() {
        return 'v: ' + this.vertex.name + ', e: ' + this.edge.toString() + ', i: ' + this.currentIndex + ', s: [' + this.stack.map(v => v.name).join(', ') + ']';
    }
}

const graph: Graph = Graph.init();
const connectedComponents: Array<Graph> = new DFSRunner().findConnectedComponents(graph);
const tiles = connectedComponents.flatMap((connectedComponent: Graph) => new PolygonFinder().execute(connectedComponent));
console.log(connectedComponents.length + ' ' + tiles.length);

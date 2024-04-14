declare function readline(): string;

const GRAPH_SIZE: number = parseInt(readline());

class Vertex {
    name: number = -1;
    children: Array<Vertex> = [];
    edges: Array<Edge> = [];

    visited: boolean = false;

    constructor(name: number) {
        this.name = name
    }

}

class Edge {
    v1: Vertex;
    v2: Vertex;


    constructor(v1: Vertex, v2: Vertex) {
        this.v1 = v1;
        this.v2 = v2;
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


const graph: Graph = Graph.init();
const connectedComponents: Array<Graph> = new DFSRunner().findConnectedComponents(graph);

const eulerNumber: number = connectedComponents
    .flatMap((graph: Graph) => graph.edges.length - graph.vertices.length + 1)
    .reduce((a,b) => a+b,0);
console.log(connectedComponents.length + ' ' + eulerNumber);

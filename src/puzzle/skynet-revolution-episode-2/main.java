import java.util.*;
import java.io.*;
import java.math.*;

class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);

        int nbNoeud = in.nextInt();
        int nbLien = in.nextInt();
        int nbPasserelle = in.nextInt();

        List<Lien> liens = new ArrayList<>();
        List<Passerelle> passerelles = new ArrayList<>();


        for(int i=0; i<nbLien ; i++){
            int noeud1 = in.nextInt();
            int noeud2 = in.nextInt();
            Lien lien = new Lien(noeud1,noeud2);
            liens.add(lien);
     //       System.err.println("lien " + lien);
        }

        for(int i=0; i<nbPasserelle ; i++){
            int indexNoeud = in.nextInt();
            Passerelle passerelle = new Passerelle(indexNoeud);
            passerelles.add(passerelle);
     //       System.err.println("passerelle " + passerelle);
        }

        while (true) {
            // Read information from standard input
            int position = in.nextInt();
   //         System.err.println("position " + position);
            // Compute logic here
            String coupeLien = choixCoupe(liens,passerelles,position,nbNoeud);
            // System.err.println("Debug messages...");

            // Write action to standard output
            System.out.println(coupeLien);
        }
    }

    public static String choixCoupe(List<Lien> liens,List<Passerelle> passerelles , int position, int nbNoeud ){
        int distanceMin = 9000;
        int idMin = -1;
        for(int i=0; i<liens.size(); i++){
            if(liens.get(i).havePasserelle(passerelles))
            {
                if(position == liens.get(i).getNoeud1() || position == liens.get(i).getNoeud2()){
                    String retour = ""+liens.get(i);
                    liens.remove(i);
                    return retour;
                }

                for(int j=0; j<liens.size(); j++){
                    if(i != j
                        && liens.get(j).havePasserelle(passerelles)
                        && liens.get(j).getNoPasserelle(passerelles) == liens.get(i).getNoPasserelle(passerelles) )
                        {
                            int distance = liens.get(i).getMinDistance(liens,passerelles, position,nbNoeud);
                            System.err.println("distance " + distance);
                            if(distance < distanceMin)
                            {
                                idMin = i;
                                distanceMin = distance;
                            }
                            break;
                        }
                }

                //if(distanceMin == 0)
                  //  break;
            }
        }
        if(idMin != -1)
        {
            String retour = ""+liens.get(idMin);
            liens.remove(idMin);
            return retour;
        }
        for(int i=0; i<liens.size(); i++){
            if(liens.get(i).havePasserelle(passerelles))
            {
                if(position == liens.get(i).getNoeud1() || position == liens.get(i).getNoeud2()){
                    String retour = ""+liens.get(i);
                    liens.remove(i);
                    return retour;
                }
                int distance = liens.get(i).getMinDistance(liens,passerelles, position,nbNoeud);
                if(distance < distanceMin)
                {
                    idMin = i;
                    distanceMin = distance;
                }
                //if(distanceMin == 0)
                  //  break;
            }
        }
        String retour = ""+liens.get(idMin);
        liens.remove(idMin);
        return retour;
    }
}

class Lien{
    private int noeud1;
    private int noeud2;
    private int passerelle;

    Lien(int noeud1, int noeud2){
        this.noeud1 = noeud1;
        this.noeud2 = noeud2;
        passerelle = -1;
    }
    int getMinDistance(List<Lien> liens,List<Passerelle> passerelles, int position, int nbNoeud)
    {
        List<Vertex> nodes = new ArrayList<Vertex>();
        List<Edge> edges = new ArrayList<Edge>();
        for (int i = 0; i < nbNoeud; i++) {
          Vertex location = new Vertex(i, "" + i);
          nodes.add(location);
        }

        for(int j=0; j<liens.size(); j++){
            if(liens.get(j).havePasserelle(passerelles))
            {
                Edge lane = new Edge(j,nodes.get(liens.get(j).getNoPasserelle(passerelles)), nodes.get(liens.get(j).getPasserelle(passerelles)),  1);
                edges.add(lane);
            }
            else
            {
                Edge lane1 = new Edge(j,nodes.get(liens.get(j).getNoeud1()), nodes.get(liens.get(j).getNoeud2()),  1);
                edges.add(lane1);
                Edge lane2 = new Edge(j,nodes.get(liens.get(j).getNoeud2()), nodes.get(liens.get(j).getNoeud1()),  1);
                edges.add(lane2);
            }
        }
        Graph graph = new Graph(nodes, edges);

        DijkstraAlgorithm dijkstra = new DijkstraAlgorithm(graph);
        dijkstra.execute(nodes.get(position));
        LinkedList<Vertex> chemin = dijkstra.getPath(nodes.get(getNoPasserelle(passerelles)));
        if(chemin == null)
            return 999;
        int nb = 0;
        for(int i=0; i< chemin.size(); i++){
            for(int j=0; j<liens.size(); j++){
                if(chemin.get(i).getId() == liens.get(j).getNoeud1() || chemin.get(i).getId() == liens.get(j).getNoeud2())
                {
                    if(//chemin.get(i) != position &&
                        liens.get(j).havePasserelle(passerelles))
                    {
                        nb++;
                        break;
                    }
                }
            }
        }
        return chemin.size() - nb;
    }

    boolean havePasserelle(List<Passerelle> passerelles)
    {
        if (passerelle == -1)
            for(int i=0; i<passerelles.size(); i++){
    			if((noeud1 == passerelles.get(i).getIndexNoeud() || noeud2 == passerelles.get(i).getIndexNoeud()))
    			{
    			    passerelle =  passerelles.get(i).getIndexNoeud();
                    return true;
    			}
            }
        if (passerelle > -1)
            return true;
        passerelle = -2;
        return false;
    }
    int getPasserelle(List<Passerelle> passerelles)
    {
        havePasserelle(passerelles);
        return passerelle;
    }

    int getNoPasserelle(List<Passerelle> passerelles)
    {
        havePasserelle(passerelles);
        if(passerelle == noeud1)
            return noeud2;
        else
            return noeud1;
    }

    public int getNoeud1(){
        return noeud1;
    }
    public int getNoeud2(){
        return noeud2;
    }
    public String toString(){
        return noeud1+" "+noeud2;
    }
}

class Passerelle{
    private int indexNoeud;

    Passerelle(int indexNoeud){
        this.indexNoeud = indexNoeud;
    }
    public int getIndexNoeud(){
        return indexNoeud;
    }
    public String toString(){
        return ""+indexNoeud;
    }

}

class DijkstraAlgorithm {

  private final List<Vertex> nodes;
  private final List<Edge> edges;
  private Set<Vertex> settledNodes;
  private Set<Vertex> unSettledNodes;
  private Map<Vertex, Vertex> predecessors;
  private Map<Vertex, Integer> distance;

  public DijkstraAlgorithm(Graph graph) {
    // create a copy of the array so that we can operate on this array
    this.nodes = new ArrayList<Vertex>(graph.getVertexes());
    this.edges = new ArrayList<Edge>(graph.getEdges());
  }

  public void execute(Vertex source) {
    settledNodes = new HashSet<Vertex>();
    unSettledNodes = new HashSet<Vertex>();
    distance = new HashMap<Vertex, Integer>();
    predecessors = new HashMap<Vertex, Vertex>();
    distance.put(source, 0);
    unSettledNodes.add(source);
    while (unSettledNodes.size() > 0) {
      Vertex node = getMinimum(unSettledNodes);
      settledNodes.add(node);
      unSettledNodes.remove(node);
      findMinimalDistances(node);
    }
  }

  private void findMinimalDistances(Vertex node) {
    List<Vertex> adjacentNodes = getNeighbors(node);
    for (Vertex target : adjacentNodes) {
      if (getShortestDistance(target) > getShortestDistance(node)
          + getDistance(node, target)) {
        distance.put(target, getShortestDistance(node)
            + getDistance(node, target));
        predecessors.put(target, node);
        unSettledNodes.add(target);
      }
    }

  }

  private int getDistance(Vertex node, Vertex target) {
    for (Edge edge : edges) {
      if (edge.getSource().equals(node)
          && edge.getDestination().equals(target)) {
        return edge.getWeight();
      }
    }
    throw new RuntimeException("Should not happen");
  }

  private List<Vertex> getNeighbors(Vertex node) {
    List<Vertex> neighbors = new ArrayList<Vertex>();
    for (Edge edge : edges) {
      if (edge.getSource().equals(node)
          && !isSettled(edge.getDestination())) {
        neighbors.add(edge.getDestination());
      }
    }
    return neighbors;
  }

  private Vertex getMinimum(Set<Vertex> vertexes) {
    Vertex minimum = null;
    for (Vertex vertex : vertexes) {
      if (minimum == null) {
        minimum = vertex;
      } else {
        if (getShortestDistance(vertex) < getShortestDistance(minimum)) {
          minimum = vertex;
        }
      }
    }
    return minimum;
  }

  private boolean isSettled(Vertex vertex) {
    return settledNodes.contains(vertex);
  }

  private int getShortestDistance(Vertex destination) {
    Integer d = distance.get(destination);
    if (d == null) {
      return Integer.MAX_VALUE;
    } else {
      return d;
    }
  }

  /*
   * This method returns the path from the source to the selected target and
   * NULL if no path exists
   */
  public LinkedList<Vertex> getPath(Vertex target) {
    LinkedList<Vertex> path = new LinkedList<Vertex>();
    Vertex step = target;
    // check if a path exists
    if (predecessors.get(step) == null) {
      return null;
    }
    path.add(step);
    while (predecessors.get(step) != null) {
      step = predecessors.get(step);
      path.add(step);
    }
    // Put it into the correct order
    Collections.reverse(path);
    return path;
  }

}

class Graph {
  private final List<Vertex> vertexes;
  private final List<Edge> edges;

  public Graph(List<Vertex> vertexes, List<Edge> edges) {
    this.vertexes = vertexes;
    this.edges = edges;
  }

  public List<Vertex> getVertexes() {
    return vertexes;
  }

  public List<Edge> getEdges() {
    return edges;
  }

}
class Edge  {
  private final int id;
  private final Vertex source;
  private final Vertex destination;
  private final int weight;

  public Edge(int id, Vertex source, Vertex destination, int weight) {
    this.id = id;
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }

  public int getId() {
    return id;
  }
  public Vertex getDestination() {
    return destination;
  }

  public Vertex getSource() {
    return source;
  }
  public int getWeight() {
    return weight;
  }

  @Override
  public String toString() {
    return source + " " + destination;
  }
}

class Vertex {
  final private int id;
  final private String name;


  public Vertex(int id, String name) {
    this.id = id;
    this.name = name;
  }
  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + id;
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Vertex other = (Vertex) obj;
    if (!(id == other.id))
      return false;
    return true;
  }

  @Override
  public String toString() {
    return name;
  }
}
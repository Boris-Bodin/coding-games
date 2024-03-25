import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

enum EntityType {
    MONSTER,
    MY_HERO,
    OP_HERO;

    public static EntityType valueFor(final int type) {
        switch (type) {
            case 0:
                return EntityType.MONSTER;
            case 1:
                return EntityType.MY_HERO;
            case 2:
                return EntityType.OP_HERO;
        }
        throw new IllegalStateException("Unexpected type: " + type);
    }

    public Entity create(int id) {
        return new Entity(id, this);
    }
}

enum SpellType {
    WIND,
    SHIELD,
    CONTROL
}

enum OrderType {
    WAIT {
        public String toString(Order order) {
            return "WAIT";
        }
    },
    MOVE {
        public String toString(Order order) {
            final Position target = ((Order.Move) order).target;
            return "MOVE " + target.x + " " + target.y;
        }
    };

    public String toString(final Order order) {
        throw new IllegalStateException("Unexpected order type: " + this);
    }
}

interface IA {

    Order makeOrder(final List<Entity> monsters);

    void cleanEntities(final List<Entity> monsters);

}

class Player {

    public static final int RANGE_MONSTER_FOCUS_BASE = 5000;

    public static final Position MAX_POSITION = new Position(17630, 9000);

    public static final int ATTACK_RANGE_GUARD = 800;

    public static final int ATTACK_DOMMAGE_GUARD = 2;

    public static final int SPEED_GUARD = 800;

    public static final int ATTACK_RANGE_MONSTERS = 300;

    public static final int SPEED_MONSTER = 400;

    public static final int MANA_COST_ATTACK = 10;

    public static Scanner in = new Scanner(System.in);

    public static void main(String[] args) {
        GameEngine.INSTANCE.run();
    }

}

class Order {

    public OrderType type;

    public String toString() {
        return type.toString(this);
    }

    static class Wait extends Order {

        public static final Order INSTANCE = new Wait();

        public Wait() {
            type = OrderType.WAIT;
        }

    }

    static class Move extends Order {

        public Position target;

        public Move(Position target) {
            type = OrderType.MOVE;
            this.target = target;
        }

        public static Order of(Position target) {
            return new Move(target);
        }

    }

    static abstract class Spell extends Order {

        public SpellType spell;

        public Spell(SpellType spell) {
            type = OrderType.MOVE;
            this.spell = spell;
        }

        static class Wind extends Spell {

            public Position target;

            public Wind(Position target) {
                super(SpellType.WIND);
                this.target = target;
            }

            public static Order of(Position target) {
                return new Wind(target);
            }

        }

        static class Shield extends Spell {

            public int id;

            public Shield(int id) {
                super(SpellType.SHIELD);
                this.id = id;
            }

            public static Order of(int id) {
                return new Shield(id);
            }

        }

        static class Control extends Spell {

            public Position target;
            public int id;

            public Control(int id, Position target) {
                super(SpellType.CONTROL);
                this.target = target;
                this.id = id;
            }

            public static Order of(int id, Position target) {
                return new Control(id, target);
            }

        }

    }

}

class Position {

    int x, y;

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void move(final Position vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    public double distance(final int x, final int y) {
        return Math.hypot(this.x - x, this.y - y);
    }

    @Override
    public int hashCode() {
        return x * 31 + y;
    }

    @Override
    public boolean equals(final Object other) {
        if (other == null) {
            return false;
        }
        if (other == this) {
            return true;
        }
        if (!(other instanceof Position)) {
            return false;
        }
        final Position otherPosition = (Position) other;
        return x == otherPosition.x && y == otherPosition.y;
    }

    @Override
    public String toString() {
        return "(" + x + "," + y + ")";
    }

    public void moveTo(final Position destination, final int speed) {
        final double distance = this.distance(destination);
        final double dx = (destination.x - x) / distance;
        final double dy = (destination.y - y) / distance;
        move(dx * speed, dy * speed);
    }

    public double distance(final Position other) {
        return Math.hypot(x - other.x, y - other.y);
    }

    public void move(double dx, double dy) {
        this.x += dx;
        this.y += dy;
    }

    public Position plus(final Position vector) {
        return new Position(x + vector.x, y + vector.y);
    }

    public Position minus(final Position position) {
        return new Position(x - position.x, y - position.y);
    }

    public Position abs() {
        return new Position(Math.abs(x), Math.abs(y));
    }

    public Position getCopy() {
        return new Position(x, y);
    }

}

class Entity {

    public int id;

    public EntityType type;

    public Position position;

    public Position standByPosition;

    public int shieldLife;

    public int isControlled;

    public int health;

    public Position vector;

    public int nearBase;

    public int threatFor;

    public Entity mainTarget;

    public Order order;

    public Set<Entity> isTargetedBy = new HashSet<>();

    public IA ia;

    Entity(
        int id, EntityType type
    ) {
        this.id = id;
        this.type = type;
    }

    public void updateLoop() {
        final int px = Player.in.nextInt();
        final int py = Player.in.nextInt();
        position = new Position(px, py);               // Position of this entity
        shieldLife = Player.in.nextInt();      // Ignore for this league; Count down until shield spell fades
        isControlled = Player.in.nextInt();    // Ignore for this league; Equals 1 when this entity is under a control spell
        health = Player.in.nextInt();          // Remaining health of this monster
        final int vx = Player.in.nextInt();
        final int vy = Player.in.nextInt();
        vector = new Position(vx, vy);               // Trajectory of this monster
        nearBase = Player.in.nextInt();        // 0=monster with no target yet, 1=monster targeting a base
        threatFor = Player.in.nextInt();       // Given this monster's trajectory, is it a threat to 1=your base, 2=your opponent's base, 0=neither
    }

    public Position nextPosition() {
        return position.plus(vector);
    }

    public void setTarget(final Entity monster) {
        if (mainTarget != null) {
            mainTarget.isTargetedBy.remove(this);
        }
        mainTarget = monster;
        mainTarget.isTargetedBy.add(this);
    }

    public boolean willBeKilledWithout(final Entity guard, final Base base) {
        final HashSet<Entity> guards = new HashSet<>(isTargetedBy);
        guards.remove(guard);
        return willBeKilledByBefore(guards, base);
    }

    private boolean willBeKilledByBefore(final HashSet<Entity> guards, final Base base) {
        if (guards.isEmpty()) {
            return false;
        }

        Position currentPosition = this.position.getCopy();
        Position basePosition = base.position.getCopy();
        int currentLifePoint = health;

        HashMap<Entity, Position> guardCoordonner = new HashMap<>();
        for (Entity guard : guards) {
            guardCoordonner.put(guard, guard.position.getCopy());
        }

        double distanceToBase;
        do {
            distanceToBase = currentPosition.distance(basePosition);
            if (distanceToBase >= Player.RANGE_MONSTER_FOCUS_BASE) {
                currentPosition.move(vector);
            } else {
                currentPosition.moveTo(basePosition, Player.SPEED_MONSTER);
            }
            distanceToBase = currentPosition.distance(basePosition);

            for (Entity guard : guardCoordonner.keySet()) {

                final Position guardPosition = guardCoordonner.get(guard);
                guardPosition.moveTo(currentPosition, Player.SPEED_GUARD);

                final double distance = guardPosition.distance(currentPosition);
                if (distance <= Player.ATTACK_RANGE_GUARD) {
                    currentLifePoint -= Player.ATTACK_DOMMAGE_GUARD;
                }
            }
        } while (distanceToBase >= Player.ATTACK_RANGE_MONSTERS && currentLifePoint > 0);

        return currentLifePoint <= 0;
    }

    public int timeForGoTo(final Position target) {
        Position currentPosition = this.position.getCopy();

        double distanceToBase;
        int nbTurn = 0;
        distanceToBase = currentPosition.distance(target);

        while (distanceToBase > Player.RANGE_MONSTER_FOCUS_BASE) {
            currentPosition.move(vector);
            distanceToBase = currentPosition.distance(target);
            nbTurn++;
        }

        return (int) Math.floor(nbTurn + (distanceToBase / Player.SPEED_MONSTER));
    }

}

class AttackerIA extends DefenderIA {

    AttackerIA(final Base base, final Entity guard) {
        super(base, guard);
    }

    @Override
    public Order makeOrder(final List<Entity> monsters) {
        //        if (base.myMana < Player.MANA_COST_ATTACK) {
        //            return super.makeOrder(monsters);
        //        }
        return super.makeOrder(monsters);
    }

}

class DefenderIA implements IA {

    public final Base base;

    public final Entity guard;

    DefenderIA(final Base base, final Entity guard) {
        this.base = base;
        this.guard = guard;
    }

    @Override
    public Order makeOrder(final List<Entity> monsters) {

        List<Entity> nearestMonster = findOrderedTarget(monsters);
        if (nearestMonster.isEmpty()) {
            guard.mainTarget = null;
            if (!guard.position.equals(guard.standByPosition)) {
                return Order.Move.of(guard.standByPosition);
            }
            return Order.Wait.INSTANCE;
        }

        for (final Entity monster : nearestMonster) {
            if (!monster.willBeKilledWithout(guard, base)) {
                guard.setTarget(monster);
                break;
            }
        }

        if (guard.mainTarget == null) {
            return Order.Wait.INSTANCE;
        }

        return Order.Move.of(guard.mainTarget.nextPosition());
    }

    public List<Entity> findOrderedTarget(final List<Entity> monsters) {
        return monsters.stream()
            .filter(m -> m.threatFor == 1)
            .sorted(Comparator.comparing(monster -> monster.timeForGoTo(base.position)))
            .collect(Collectors.toList());
    }

    @Override
    public void cleanEntities(final List<Entity> monsters) {
        if (guard.mainTarget != null) {
            final Entity actualTarget = monsters.stream()
                .filter(monster -> monster.id == guard.mainTarget.id)
                .findFirst()
                .orElse(null);
            if (actualTarget == null) {
                guard.mainTarget = null;
            }
        }
    }

}

class Base {

    public Position position;

    public int nbGuards;

    public int myHealth;

    public int myMana;

    public List<Entity> guards = new ArrayList<>();

    Base(Position position, int nbGuards) {
        this.position = position;
        this.nbGuards = nbGuards;
    }

    public void updateLoop() {
        myHealth = Player.in.nextInt(); // Your base health
        myMana = Player.in.nextInt(); // Ignore in the first league; Spend ten mana to cast a spell
    }

    public void makeOrder(final List<Entity> monsters) {
        for (final Entity guard : guards) {
            guard.order = guard.ia.makeOrder(monsters);
        }
    }

    public void callOrder() {
        for (Entity guard : guards) {
            System.out.println(guard.order.toString());
        }
    }

    public void checkGuardsTarget(final List<Entity> monsters) {
        for (final Entity guard : guards) {
            guard.ia.cleanEntities(monsters);
        }
    }

}

class EntityFactory {

    private final GameEngine gameEngine;

    public EntityFactory(final GameEngine gameEngine) {
        this.gameEngine = gameEngine;
    }

    public Entity getEntity(final int id, final int type) {
        final EntityType entityType = EntityType.valueFor(type);
        Entity entity = null;

        switch (entityType) {
            case MONSTER:
                entity = gameEngine.monsters.stream().filter(monster -> monster.id == id).findFirst().orElse(null);
                break;
            case MY_HERO:
                entity = gameEngine.myBase.guards.stream().filter(guard -> guard.id == id).findFirst().orElse(null);
                break;
            case OP_HERO:
                entity = gameEngine.opBase.guards.stream().filter(guard -> guard.id == id).findFirst().orElse(null);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + entityType);
        }

        if (entity == null) {
            entity = entityType.create(id);
            switch (entityType) {
                case MONSTER:
                    gameEngine.monsters.add(entity);
                    break;
                case MY_HERO:
                    gameEngine.myBase.guards.add(entity);
                    if (gameEngine.myBase.guards.size() == 3) {
                        entity.ia = new AttackerIA(GameEngine.INSTANCE.myBase, entity);
                        entity.standByPosition = gameEngine.myBase.position.minus(new Position(4500, 4500)).abs();
                    } else {
                        entity.ia = new DefenderIA(GameEngine.INSTANCE.myBase, entity);
                        if (gameEngine.myBase.guards.size() == 1) {
                            entity.standByPosition = gameEngine.myBase.position.minus(new Position(1000, 4500)).abs();
                        }
                        if (gameEngine.myBase.guards.size() == 2) {
                            entity.standByPosition = gameEngine.myBase.position.minus(new Position(4500, 1000)).abs();
                        }
                    }
                    break;
                case OP_HERO:
                    gameEngine.opBase.guards.add(entity);
                    break;
            }
        }
        return entity;
    }

}

class GameEngine {

    public static final GameEngine INSTANCE = new GameEngine();

    Base myBase;

    Base opBase;

    List<Entity> monsters = new ArrayList<>();

    private boolean running = false;

    private EntityFactory entityFactory;

    GameEngine() {
        init();
    }

    private void init() {
        running = true;
        entityFactory = new EntityFactory(this);
        myBase = new Base(new Position(Player.in.nextInt(), Player.in.nextInt()), Player.in.nextInt());
        opBase = new Base(Player.MAX_POSITION.minus(myBase.position), myBase.nbGuards);
    }

    public void run() {
        while (running) {
            loop();
        }
    }

    private void loop() {
        initLoop();

        myBase.makeOrder(monsters);
        myBase.callOrder();
    }

    private void initLoop() {
        myBase.updateLoop();
        opBase.updateLoop();

        int entityCount = Player.in.nextInt(); // the number of entities

        final ArrayList<Object> aliveEntityIds = new ArrayList<>();
        for (int i = 0; i < entityCount; i++) {

            int id = Player.in.nextInt();              // Unique identifier
            int type = Player.in.nextInt();            // 0=monster, 1=your hero, 2=opponent hero

            aliveEntityIds.add(id);
            final Entity entity = entityFactory.getEntity(id, type);
            entity.updateLoop();
        }

        monsters.removeIf(monster -> !aliveEntityIds.contains(monster.id));
        myBase.checkGuardsTarget(monsters);
    }

}
// TODO:
//  - multiple attack
//  - laisser les guard les plus prés d'un monstre le tuée
//  - IA attackers

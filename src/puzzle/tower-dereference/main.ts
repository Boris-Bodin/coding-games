/**
 * POLYFILLS
 */

 declare function readline(): string;

 interface Array<T> {
     flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];
 
     find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;
 
     includes(searchElement: T, fromIndex?: number): boolean;
 
     keys(): Array<number>;
 }
 
 /**
  * CODE
  */
 
 const TOWER_ORDER: string[] = ['HEALTOWER', 'FIRETOWER', 'GUNTOWER', 'GLUETOWER'];
 
 class Constants {
 
     static TURN_COUNT = 200;
 
     static MAP_WIDTH = 17;
     static MAP_HEIGHT = 17;
 
     static PLAYER_MONEY = 350;
     static PLAYER_LIVES = 20;
 
     static GUNTOWER_COST = 100;
     static GUNTOWER_DAMAGE = [5, 8, 15, 30];
     static GUNTOWER_RANGE = [3, 4, 5, 6];
     static GUNTOWER_RELOAD = [5, 4, 3, 2];
     static FIRETOWER_COST = 100;
     static FIRETOWER_DAMAGE = [2, 3, 5, 7];
     static FIRETOWER_RANGE = [1.5, 2, 2.3, 2.5];
     static FIRETOWER_RELOAD = [8, 7, 6, 5];
     static FIRE_EFFECT_DURATION = 2;
     static GLUETOWER_COST = 70;
     static GLUETOWER_DAMAGE = [8, 15, 25, 40]; // duration of slowdown effect
     static GLUETOWER_RANGE = [3, 4, 5, 6];
     static GLUETOWER_RELOAD = [4, 3, 2, 1];
     static GLUE_SLOWDOWN = 4;
     static HEALTOWER_COST = 100;
     static HEALTOWER_DAMAGE = [5, 8, 15, 30];
     static HEALTOWER_RANGE = [3, 4, 5, 6];
     static HEALTOWER_RELOAD = [5, 4, 3, 2];
     static TOWER_UPGRADE_COSTS = [50, 100, 150, 0];
 
     static WAVE_TIME = 3;
     static WAVE_COMPLETION = 1.5;
     static WAVE_START = [1, 16, 31, 46, 61, 71, 81, 91, 101];
     static WAVE_COUNT = [4, 4, 5, 6, 6, 7, 7, 8, 8];
     static WAVE_SPEED = [10, 12, 10, 15, 10, 10, 12, 13, 14];
     static WAVE_HP = [5, 8, 12, 8, 12, 15, 15, 18, 18];
     static WAVE_BOUNTY = [25, 30, 30, 20, 22, 25, 25, 30, 30];
 
     static NUM_UPGRADE_SPRITES = 3;
 }
 
 enum TowerProperty {
     RELOAD,
     RANGE,
     DAMAGE
 }
 
 abstract class Tower {
     id: number;
     type: string;
     tile: Tile;
     upgradeStates: Array<number>;
     properties: Array<Array<number>>;
     cooldown: number;
     cost: number;
     owner: Player;
 
     protected constructor(type: string, tile: Tile, id: number) {
         this.id = id;
         this.type = type;
         this.tile = tile;
         this.upgradeStates = [];
         this.properties = [];
     }
 
     canUpgrade(property: TowerProperty): boolean {
         const upgradeState: number = this.upgradeStates[property.valueOf()];
         const values: Array<number> = this.properties[property.valueOf()];
         const upgradeCost: number = Constants.TOWER_UPGRADE_COSTS[upgradeState];
         return !!values[property.valueOf() + 1] && this.owner.money >= upgradeCost;
     }
 
     upgrade(property: TowerProperty) {
         const upgradeState: number = this.upgradeStates[property.valueOf()];
         const upgradeCost: number = Constants.TOWER_UPGRADE_COSTS[upgradeState];
         this.owner.spendMoney(upgradeCost);
         this.upgradeStates[property.valueOf()]++;
     }
 
     getProperty(property: TowerProperty): number {
         const updateState: number = this.upgradeStates[property.valueOf()];
         const values: Array<number> = this.properties[property.valueOf()];
         return values[updateState];
     }
 
     attack(attackers: Array<Attacker>) {
         if (this.cooldown > 0) {
             this.cooldown--;
             return;
         }
         if (this.doAttack(attackers)) {
             this.cooldown = +this.getProperty(TowerProperty.RELOAD) - 1;
         }
     }
 
     inRange(a: Attacker): boolean {
         for (const sub of a.steps) {
             const dx: number = sub.getX() - this.tile.x;
             const dy: number = sub.getY() - this.tile.y;
             const rangeIndex: number = TowerProperty.RANGE.valueOf();
             const range: number = this.properties[rangeIndex][this.upgradeStates[rangeIndex]];
             const dist: number = Math.sqrt(dx * dx + dy * dy);
             if (range >= dist) {
                 return true;
             }
         }
         return false;
     }
 
     doAttack(_: Array<Attacker>): boolean {
         return false;
     }
 
     toString() {
         return `${this.type} ${this.id} ${this.owner.id} ${this.tile.toString()}` +
             `${this.tile.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH)} ${this.upgradeStates} ${this.cooldown}`;
     }
 }
 
 class Attacker {
     remainingPath: Array<SubTile>;
     id: number;
     maxHealth: number;
     hitPoints: number;
     maxSpeed: number;
     slowCountdown: number;
     bounty: number;
     owner: Player;
     enemy: Player;
     steps: Array<SubTile>;
 
     constructor(id: number, path: Array<SubTile>, hp: number, speed: number, bounty: number, owner: Player, enemy: Player) {
         this.id = id;
         this.remainingPath = path;
         this.owner = owner;
         this.enemy = enemy;
         this.maxSpeed = speed;
         this.hitPoints = hp;
         this.bounty = bounty;
         this.maxHealth = this.hitPoints;
     }
 
     getSpeed(): number {
         if (this.slowCountdown === 0) {
             return this.maxSpeed;
         }
         return this.maxSpeed / Constants.GLUE_SLOWDOWN;
     }
 
     isSlow(): boolean {
         return this.slowCountdown > 0;
     }
 
     getPathLength(): number {
         return this.remainingPath.length;
     }
 
     getLocation(): SubTile {
         return this.remainingPath[this.remainingPath.length - 1];
     }
 
     kill() {
         this.dealDamage(this.hitPoints);
     }
 
     canHeal(): boolean {
         return this.hitPoints < this.maxHealth;
     }
 
     heal(health: number) {
         this.hitPoints = Math.min(this.hitPoints + health, this.maxHealth);
     }
 
     dealDamage(damage: number) {
         this.hitPoints = Math.max(0, this.hitPoints - damage);
     }
 
     slowDown(countdown: number) {
         this.slowCountdown = countdown;
     }
 
     isDead(): boolean {
         return this.hitPoints <= 0;
     }
 
     hasSucceeded(): boolean {
         return this.remainingPath.length === 1;
     }
 
     move() {
         const speed: number = this.getSpeed();
         const steps = [];
         while (steps.length < speed && this.remainingPath.length > 1) {
             steps.push(this.remainingPath[this.remainingPath.length - 1]);
             this.remainingPath.pop();
         }
         if (this.slowCountdown > 0) {
             this.slowCountdown--;
         }
     }
 
     toString() {
         return `${this.id} ${this.owner.id} ${this.getLocation().toString()} ${this.hitPoints}` +
             ` ${this.maxHealth} ${this.maxSpeed} ${this.maxSpeed} ${this.slowCountdown} ${this.bounty}`;
     }
 }
 
 class GunTower extends Tower {
     constructor(tile: Tile, id: number) {
         super('GUNTOWER', tile, id);
         this.properties[TowerProperty.DAMAGE.valueOf()] = Constants.GUNTOWER_DAMAGE;
         this.properties[TowerProperty.RANGE.valueOf()] = Constants.GUNTOWER_RANGE;
         this.properties[TowerProperty.RELOAD.valueOf()] = Constants.GUNTOWER_RELOAD;
         this.cost = Constants.GUNTOWER_COST;
     }
 
     doAttack(attackers: Array<Attacker>): boolean {
         let target: Attacker = null;
         for (const a of attackers) {
             if (this.owner === a.owner || !this.inRange(a)) {
                 continue;
             }
             if (target == null || a.getPathLength() < target.getPathLength()) {
                 target = a;
             }
         }
         if (target == null) {
             return false;
         }
 
         target.dealDamage(+this.getProperty(TowerProperty.DAMAGE));
         return true;
     }
 }
 
 class FireTower extends Tower {
     alreadyAttacked: Array<Attacker> = [];
     fireEffect = 0;
 
     constructor(tile: Tile, id: number) {
         super('FIRETOWER', tile, id);
         this.properties[TowerProperty.DAMAGE.valueOf()] = Constants.FIRETOWER_DAMAGE;
         this.properties[TowerProperty.RANGE.valueOf()] = Constants.FIRETOWER_RANGE;
         this.properties[TowerProperty.RELOAD.valueOf()] = Constants.FIRETOWER_RELOAD;
         this.cost = Constants.FIRETOWER_COST;
     }
 
     attack(attackers: Array<Attacker>) {
         if (this.cooldown > 0) {
             this.cooldown--;
         }
         if (this.fireEffect > 0) {
             this.fireEffect--;
             this.doAttack(attackers);
         }
         if (this.cooldown > 0) {
             return;
         }
         if (this.doAttack(attackers)) {
             this.cooldown = +this.getProperty(TowerProperty.RELOAD) - 1;
             this.fireEffect = Constants.FIRE_EFFECT_DURATION - 1;
         }
     }
 
     doAttack(attackers: Array<Attacker>): boolean {
         if (this.cooldown === 0) {
             this.alreadyAttacked = [];
         }
         let firing = false;
         for (const a of attackers) {
             if (this.owner === a.owner || !this.inRange(a) || this.alreadyAttacked.includes(a)) {
                 continue;
             }
             a.dealDamage(+this.getProperty(TowerProperty.DAMAGE));
             this.alreadyAttacked.push(a);
             firing = true;
         }
         return firing;
     }
 }
 
 class GlueTower extends Tower {
     constructor(tile: Tile, id: number) {
         super('GLUETOWER', tile, id);
         this.properties[TowerProperty.DAMAGE.valueOf()] = Constants.GLUETOWER_DAMAGE;
         this.properties[TowerProperty.RANGE.valueOf()] = Constants.GLUETOWER_RANGE;
         this.properties[TowerProperty.RELOAD.valueOf()] = Constants.GLUETOWER_RELOAD;
         this.cost = Constants.GLUETOWER_COST;
     }
 
     doAttack(attackers: Array<Attacker>): boolean {
         let attacked = false;
         for (const a of attackers) {
             if (this.owner === a.owner || !this.inRange(a) || a.isSlow()) {
                 continue;
             }
             a.slowDown(+this.getProperty(TowerProperty.DAMAGE));
             attacked = true;
         }
         return attacked;
     }
 
 }
 
 class HealTower extends Tower {
     constructor(tile: Tile, id: number) {
         super('HEALTOWER', tile, id);
         this.properties[TowerProperty.DAMAGE.valueOf()] = Constants.HEALTOWER_DAMAGE;
         this.properties[TowerProperty.RANGE.valueOf()] = Constants.HEALTOWER_RANGE;
         this.properties[TowerProperty.RELOAD.valueOf()] = Constants.HEALTOWER_RELOAD;
         this.cost = Constants.HEALTOWER_COST;
     }
 
     doAttack(attackers: Array<Attacker>): boolean {
         let target: Attacker = null;
         for (const a of attackers) {
             if (this.owner !== a.owner || !this.inRange(a) || !a.canHeal()) {
                 continue;
             }
             if (target == null || a.getPathLength() < target.getPathLength()) {
                 target = a;
             }
         }
         if (target == null) {
             return false;
         }
 
         target.heal(+this.getProperty(TowerProperty.DAMAGE));
         return true;
     }
 }
 
 class TowerFactory {
     static create(type: string, tile: Tile, id: number) {
         switch (type) {
             case 'GUNTOWER':
                 return new GunTower(tile, id);
             case 'FIRETOWER':
                 return new FireTower(tile, id);
             case 'GLUETOWER':
                 return new GlueTower(tile, id);
             case 'HEALTOWER':
                 return new HealTower(tile, id);
         }
     }
 }
 
 class Tile {
     static dx = [0, 1, 0, -1];
     static dy = [1, 0, -1, 0];
 
     x: number;
     y: number;
     canyon: boolean;
 
     neighbors: Array<Tile> = [];
     nbNeighborsCanyon: Array<number> = [];
 
     constructor(x: number, y: number, canyon: boolean) {
         this.x = x;
         this.y = y;
         this.canyon = canyon;
     }
 
     canEnter(): boolean {
         return this.canyon;
     }
 
     canBuild(): boolean {
         return !this.canyon;
     }
 
     initNeighbors(grid: Array<Array<Tile>>) {
         for (let dir = 0; dir < 4; dir++) {
             const x_ = this.x + Tile.dx[dir];
             const y_ = this.y + Tile.dy[dir];
             if (x_ >= 0 && x_ < grid.length && y_ >= 0 && y_ < grid[0].length) {
                 this.neighbors[dir] = grid[x_][y_];
             }
         }
     }
 
     connectTo(to: Tile): Array<SubTile> {
         const result: Array<SubTile> = [];
         if (this.x < to.x) {
             for (let i = 0; i < SubTile.SUBTILE_SIZE; i++) {
                 result.push(new SubTile(this, i, 0));
             }
         } else if (this.y < to.y) {
             for (let i = 0; i < SubTile.SUBTILE_SIZE; i++) {
                 result.push(new SubTile(this, 0, i));
             }
         } else if (this.x > to.x) {
             for (let i = SubTile.SUBTILE_SIZE; i > 0; i--) {
                 result.push(new SubTile(to, i, 0));
             }
         } else if (this.y > to.y) {
             for (let i = SubTile.SUBTILE_SIZE; i > 0; i--) {
                 result.push(new SubTile(to, 0, i));
             }
         }
         return result;
     }
 
     toString() {
         return `(${this.x}, ${this.y})`;
     }
 
     countNeighborsCanyon(depth: number = 0): number {
         if (this.nbNeighborsCanyon[depth] !== undefined) {
             return this.nbNeighborsCanyon[depth];
         }
         const count = this.getNeighborsInDepth(depth).reduce((sum, tile) => sum + (tile.canEnter() ? 1 : 0), 0);
         this.nbNeighborsCanyon[depth] = count;
         return count;
     }
 
     getNeighborsInDepth(depth: number = 0): Array<Tile> {
         if (depth === 0) {
             return this.neighbors;
         }
         return Array.from(new Set(this.neighbors.flatMap(tile => tile.getNeighborsInDepth(depth - 1))));
     }
 }
 
 
 class SubTile {
 
     static SUBTILE_SIZE = 10;
     tile: Tile;
     subX: number;
     subY: number;
 
     constructor(tile: Tile, subX: number, subY: number) {
         this.tile = tile;
         this.subX = subX;
         this.subY = subY;
     }
 
     getX(): number {
         return this.tile.x + this.subX / SubTile.SUBTILE_SIZE;
     }
 
     getY(): number {
         return this.tile.y + this.subY / SubTile.SUBTILE_SIZE;
     }
 
     toString() {
         return `(${this.getX()}, ${this.getY()})`;
     }
 }
 
 class Player {
     id: number;
     money = Constants.PLAYER_MONEY;
     lives = Constants.PLAYER_LIVES;
 
     constructor(id: number) {
         this.id = id;
     }
 
     // kill(a: Attacker) {
     //     if (a) {
     //         this.money += a.bounty;
     //     } else {
     //         this.lives = 0;
     //     }
     // }
     //
     // buy(tower: Tower): boolean {
     //     if (this.money < tower.cost) {
     //         return false;
     //     }
     //     this.money -= tower.cost;
     //     tower.owner = this;
     //     return true;
     // }
 
     spendMoney(money: number) {
         this.money -= money;
     }
 
     // loseLife() {
     //     this.lives--;
     // }
     //
     // getScorePoints(): number {
     //     if (this.isDead()) {
     //         return 0;
     //     }
     //     return 100 * this.lives + this.money;
     // }
 
     isDead() {
         return this.lives <= 0;
     }
 
     update() {
         const inputs: string[] = readline().split(' ');
         this.money = parseInt(inputs[0], 10);
         this.lives = parseInt(inputs[1], 10);
     }
 }
 
 class Board {
     grid: Array<Array<Tile>>;
     attackers: Array<Attacker> = [];
     veterans: Array<Attacker> = [];
     towers: Array<Tower> = [];
     width: number;
     height: number;
     players: Array<Player>;
     waveIndex = 0;
     earliestWaveStart = 1;
     futureAttackers: Array<Array<Attacker>> = [];
     // buildActions:Array<BuildAction> = [];
     paths: Array<Array<SubTile>> = [];
     waveNumber = 0;
 
 
     constructor(_grid: Array<Array<Tile>>, _players: Array<Player>) {
         this.players = _players;
 
         for (let i = 0; i <= Constants.TURN_COUNT + Constants.WAVE_TIME; i++) {
             this.futureAttackers.push([]);
         }
 
         this.grid = _grid;
         this.width = _grid.length;
         this.height = _grid[0].length;
 
         const targets = [];
 
         for (let y = 0; y < this.height; y++) {
             const tile = this.grid[this.width - 1][y];
 
             if (tile.canEnter()) {
                 targets.push(tile);
             }
         }
 
         for (const target of targets) {
             this.findPaths(this.grid, this.width, this.height, target, this.paths);
         }
     }
 
     findPaths(grid: Array<Array<Tile>>, width: number, height: number, target: Tile, paths: Array<Array<SubTile>>) {
         const dist = [];
         for (let x = 0; x < width; x++) {
             dist[x] = [];
             for (let y = 0; y < height; y++) {
                 dist[x][y] = -1;
             }
         }
 
         dist[target.x][target.y] = 0;
         const bfs: Array<Tile> = [];
         bfs.push(target);
 
         while (bfs.length > 0) {
             const sub = bfs.shift();
             for (const neighbor of sub.neighbors) {
                 if (neighbor == null || !neighbor.canEnter()) {
                     continue;
                 }
                 if (dist[neighbor.x][neighbor.y] >= 0) {
                     continue;
                 }
                 dist[neighbor.x][neighbor.y] = dist[sub.x][sub.y] + 1;
                 bfs.push(neighbor);
             }
         }
 
         this.buildPaths(grid, width, height, target, paths, dist, []);
     }
 
     buildPaths(
         grid: Array<Array<Tile>>,
         width: number,
         height: number,
         currentTile: Tile,
         paths: Array<Array<SubTile>>,
         dist: Array<Array<number>>,
         currentPath: Array<Tile>) {
         currentPath.push(currentTile);
         if (currentTile.x === 0) {
             const path = [
                 new Tile(currentPath[0].x + 1, currentPath[0].y, true),
                 ...currentPath,
                 new Tile(currentTile.x - 1, currentTile.y, true)
             ];
             const result = [];
             for (let i = 1; i < path.length; i++) {
                 const t1 = path[i - 1];
                 const t2 = path[i];
                 for (const sub of t1.connectTo(t2)) {
                     result.push(sub);
                 }
             }
             paths.push(result);
 
             currentPath.pop();
             return;
         }
 
         for (const neighbor of currentTile.neighbors) {
             if (neighbor != null && dist[neighbor.x][neighbor.y] === dist[currentTile.x][currentTile.y] + 1) {
                 this.buildPaths(grid, width, height, neighbor, paths, dist, currentPath);
             }
         }
 
         currentPath.pop();
     }
 
     toString() {
         return `${this.grid.map(row => row.map(tile => tile.canyon ? '.' : '#').join('')).join('\n')}
   ${this.paths.length} Paths.
   Towers :
   ${this.towers.map(tower => tower.toString()).join('\n')}
   Attackers :
   ${this.attackers.map(attacker => attacker.toString()).join('\n')}`;
     }
 }
 
 class Game {
     board: Board;
     players: Array<Player>;
     player: Player;
     opponent: Player;
 
     constructor() {
 
         const leftPlayer: Player = new Player(0);
         const rightPlayer: Player = new Player(1);
 
         const playerId: number = parseInt(readline(), 10);
         this.players = [leftPlayer, rightPlayer];
 
         this.player = this.players[playerId];
         this.opponent = this.players[1 - playerId];
 
         this.board = this.initBoard(this.players);
     }
 
     initBoard(players: Array<Player>) {
 
         const inputs: string[] = readline().split(' ');
         const width: number = parseInt(inputs[0], 10);
         const height: number = parseInt(inputs[1], 10);
 
         const tiles: Array<Array<Tile>> = [];
         for (let i = 0; i < width; i++) {
             tiles[i] = [];
         }
 
         for (let i = 0; i < height; i++) {
             readline().split('').map((c, j) => tiles[j][i] = new Tile(j, i, c === '.'));
         }
 
         for (let i = 0; i < width; i++) {
             for (let j = 0; j < height; j++) {
                 tiles[i][j].initNeighbors(tiles);
             }
         }
 
 
         return new Board(tiles, players);
     }
 
     update() {
         this.player.update();
         this.opponent.update();
 
         this.board.towers = [...Array(parseInt(readline(), 10)).keys()].map(
             () => readline().split(' ')
         ).map(([type, id, owner, x, y, damage, range, reload, cooldown]) => {
             const oldTower = this.board.towers.find(tower => tower.id === parseInt(id, 10));
             if (oldTower) {
                 oldTower.upgradeStates = [
                     parseInt(reload, 10),
                     parseInt(range, 10),
                     parseInt(damage, 10)
                 ];
                 oldTower.cooldown = parseInt(cooldown, 10);
                 return oldTower;
             }
             const tile = this.board.grid[x][y];
             const newTower: Tower = TowerFactory.create(type, tile, parseInt(id, 10));
             newTower.owner = this.players[parseInt(owner, 10)];
             newTower.upgradeStates = [
                 parseInt(reload, 10),
                 parseInt(range, 10),
                 parseInt(damage, 10)
             ];
             newTower.cooldown = parseInt(cooldown, 10);
             return newTower;
         });
 
         this.board.attackers = [...Array(parseInt(readline(), 10)).keys()].map(
             () => readline().split(' ')
         ).map(([id, owner, x, y, hp, maxHp, speed, maxSpeed, slowTime, bounty]) => {
             const oldAttacker = this.board.attackers.find((attacker: Attacker) => attacker.id === parseInt(id, 10));
             if (oldAttacker) {
                 oldAttacker.hitPoints = parseInt(hp, 10);
                 oldAttacker.slowCountdown = parseInt(slowTime, 10);
                 oldAttacker.move();
                 return oldAttacker;
             }
             const path = this.board.paths.find(p =>
                 p.some(st => Math.abs(st.getX() - parseFloat(x)) < 0.001 && Math.abs(st.getY() - parseFloat(y)) < 0.001));
 
             const newAttacker = new Attacker(
                 parseInt(id, 10),
                 path.slice(0),
                 parseInt(maxHp, 10),
                 parseFloat(maxSpeed),
                 parseInt(bounty, 10),
                 this.players[parseInt(owner, 10)],
                 this.players[1 - parseInt(owner, 10)]
             );
             newAttacker.hitPoints = parseInt(hp, 10);
             // attacker.speed = parseInt(speed);
             newAttacker.slowCountdown = parseInt(slowTime, 10);
             return newAttacker;
         });
     }
 }
 
 class SolutionHelper {
     public static MINIMAL_SCORE_FOR_UPGRADE_GUN_TOWER = 4;
     public static GUN_TOWER_DEPTH = 2;
 
     constructor(private game: Game) {
     }
 
     canUseMoneyOnGunTower() {
         return this.canBuyGunTower() || this.canUpgradeDamageGunTower();
     }
 
     useMoneyOnGunTower() {
         const betterNewTile: Tile = this.findBetterTileForTowerGunTower();
         if (betterNewTile.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH) < SolutionHelper.MINIMAL_SCORE_FOR_UPGRADE_GUN_TOWER
             && this.canUpgradeDamageGunTower()) {
             for (const tower of this.getUpgradableDamageGunTower()
                 .sort((a, b) => b.tile.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH)
                     - a.tile.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH))) {
                 if (tower.canUpgrade(TowerProperty.DAMAGE)) {
                     tower.upgrade(TowerProperty.DAMAGE);
                     return `UPGRADE ${tower.id} DAMAGE`;
                 }
             }
         }
 
         if (betterNewTile) {
             if (this.canBuyGunTower()) {
                 this.game.player.spendMoney(Constants.GUNTOWER_COST);
                 this.game.board.towers.push(new GunTower(betterNewTile, -1));
                 return `BUILD ${betterNewTile.x} ${betterNewTile.y} GUNTOWER`;
             }
         }
     }
 
     private canBuyGunTower() {
         return this.game.player.money >= Constants.GUNTOWER_COST;
     }
 
     private canUpgradeDamageGunTower() {
         return this.getUpgradableDamageGunTower().length > 0;
     }
 
     private findBetterTileForTowerGunTower(): Tile {
         return this.getAllTileForTower().sort(
             (a: Tile, b: Tile) => b.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH) -
                 a.countNeighborsCanyon(SolutionHelper.GUN_TOWER_DEPTH)
         )[0];
     }
 
     private haveTower(tile: Tile): boolean {
         return this.game.board.towers.some(tower => tower.tile === tile);
     }
 
     private getAllTileForTower(): Array<Tile> {
         return this.game.board.grid.flatMap(row => row).filter(tile => tile.canBuild() && !this.haveTower(tile));
     }
 
     private getUpgradableDamageGunTower() {
         return this.game.board.towers
             .filter(tower => tower.id !== -1 && tower.owner === this.game.player && tower.type === 'GUNTOWER')
             .filter(tower => tower.canUpgrade(TowerProperty.DAMAGE));
     }
 }
 
 /**
  * Initialization
  **/
 
 const GAME: Game = new Game();
 const HS: SolutionHelper = new SolutionHelper(GAME);
 let round = 0;
 
 while (true) {
     round++;
     GAME.update();
 
     console.error(GAME.board.toString());
 
     const actions: Array<string> = [];
     let breakInnerLoop = false;
     while (HS.canUseMoneyOnGunTower() && !breakInnerLoop) {
         const action = HS.useMoneyOnGunTower();
         if (!action) {
             breakInnerLoop = true;
         } else {
             actions.push(action);
         }
     }
     actions.push('PASS');
     console.log(actions.join(';'));
 }
  
 
 /**
  * TODO :
  *  - Upgrade Range and reload ?
  *  - Fire, Heal and Glue Tower.
  *  - Verif if tower is on each path.
  */
 

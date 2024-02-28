namespace BottersOfTheGallaxy {

    /**********************
     * Constant
     **********************/

    const HEIGHT = 750;
    const WIDTH = 1920;

    const INITIALX1 = 200;
    const INITIALY1 = 590;
    const INITIALX2 = 1720;
    const INITIALY2 = 590;

    enum CommandType {
        WAIT = 'WAIT',
        MOVE = 'MOVE',
        ATTACK = 'ATTACK',
        ATTACK_NEAREST = 'ATTACK_NEAREST',
        MOVE_ATTACK = 'MOVE_ATTACK',
        BUY = 'BUY',
        SELL = 'SELL'
    }

    enum HeroesType {
        DEADPOOL = 'DEADPOOL',
        HULK = 'HULK',
        VALKYRIE = 'VALKYRIE',
        DOCTOR_STRANGE = 'DOCTOR_STRANGE',
        IRONMAN = 'IRONMAN'
    }

    const TIMEMAX = 1;
    const ASPHEROES = 0.1;
    const ASPUNITS = 0.2;

    enum NeutralEntityType {
        BUSH = 'BUSH',
        SPAWN = 'SPAWN'
    }

    enum EntityType {
        NONE,
        UNIT = 'UNIT',
        HERO = 'HERO',
        TOWER = 'TOWER',
        GROOT = 'GROOT'
    }

    /**********************
     * Class
     **********************/

    class Position {

        static zero: Position = new Position(0, 0);

        constructor(
            public x: number,
            public y: number) {

        }

        distanceTo(pos: Position): number {
            return Math.sqrt(this.computeDistance(pos));
        }

        computeDistance(pos: Position): number {
            return Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2);
        }

        public isInRange(position: Position, range: number): boolean {
            return this.distanceTo(position) <= range;
        }
    }

    class Entity {

        public team: number;
        public unitId: number;
        public position: Position;
        public attackRange: number;
        public health: number;
        public maxHealth: number;
        public shield: number;
        public attackDamage: number;
        public movementSpeed: number;
        public stunDuration: number;
        public goldValue: number;

        public get isRange(): boolean {
            return this.attackRange > 150;
        }
        public get otherTeamId(): number {
            return this.team === 0 ? 1 : 0;
        }

        public get type(): EntityType {
            return EntityType.NONE;
        }

        constructor() {
        }

        public static Update() {
            const inputs = readline().split(' ');
            const unitId = parseInt(inputs[0], 10);
            if (Entitys[unitId] != null) {
                Entitys[unitId].Update(inputs);
            } else {
                switch (inputs[2]) {
                    case EntityType.HERO :
                        Entitys[unitId] = new Hero();
                        break;
                    case EntityType.UNIT :
                        Entitys[unitId] = new Unit();
                        break;
                    case EntityType.TOWER :
                        Entitys[unitId] = new Tower();
                        break;
                    case EntityType.GROOT :
                        Entitys[unitId] = new Groot();
                        break;
                }
            }
            Entitys[unitId].Update(inputs);
        }

        public Update(inputs: Array<string>) {
            this.team = parseInt(inputs[1], 10);
            this.unitId = parseInt(inputs[0], 10);
            this.position = new Position(parseInt(inputs[3], 10), parseInt(inputs[4], 10));
            this.attackRange = parseInt(inputs[5], 10);
            this.health = parseInt(inputs[6], 10);
            this.maxHealth = parseInt(inputs[7], 10);
            this.shield = parseInt(inputs[8], 10); // useful in bronze
            this.attackDamage = parseInt(inputs[9], 10);
            this.movementSpeed = parseInt(inputs[10], 10);
            this.stunDuration = parseInt(inputs[11], 10); // useful in bronze
            this.goldValue = parseInt(inputs[12], 10);
        }


        public canAttack(entity: Entity, withMove: boolean = false) {
            const distance = this.position.distanceTo(entity.position) - this.attackRange;

            if (distance < 0) {
                return true;
            }

            if (!withMove) {
                return false;
            }

            const attackTime = this.timeForAttack(this.attackRange) + this.timeToMove(distance);
            return attackTime < TIMEMAX;
        }

        public isUnderTower() {
            return Tower.getForTeam(this.team === 0 ? 1 : 0).canAttack(this);
        }

        protected timeToMove(distance: number) {
            return distance / this.movementSpeed;
        }

        protected timeForAttack(distance: number) {
            let time = this.type === EntityType.HERO ? ASPHEROES : ASPUNITS;
            if (this.isRange) {
                time += (distance / this.attackRange);
            }

            return  time;
        }
    }

    class Hero extends Entity {

        public countDown1: number;
        public countDown2: number;
        public countDown3: number;
        public mana: number;
        public maxMana: number;
        public manaRegeneration: number;
        public heroType: string;
        public isVisible: number;
        public itemsOwned: number;
        public action: any;

        public get type(): EntityType {
            return EntityType.HERO;
        }

        constructor() {
            super();
        }

        static getForTeam(idTeam: number): Array<Hero> {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.HERO && Entitys[name].team === idTeam;
            }).map(name => Entitys[name] as Hero);
        }

        init(maxHealth, maxMana, attackDamage, movementSpeed, manaRegeneration, attackRange): Hero {
            this.maxHealth = maxHealth;
            this.maxMana = maxMana;
            this.attackDamage = attackDamage;
            this.movementSpeed = movementSpeed;
            this.manaRegeneration = manaRegeneration;
            this.attackRange = attackRange;

            return this;
        }

        public Update(inputs: Array<string>) {
            super.Update(inputs);

            this.countDown1 = parseInt(inputs[13], 10);
            this.countDown2 = parseInt(inputs[14], 10);
            this.countDown3 = parseInt(inputs[15], 10);
            this.mana = parseInt(inputs[16], 10);
            this.maxMana = parseInt(inputs[17], 10);
            this.manaRegeneration = parseInt(inputs[18], 10);
            this.heroType = inputs[19];
            this.isVisible = parseInt(inputs[20], 10);
            this.itemsOwned = parseInt(inputs[21], 10);
        }

        public process() {
            if (MyUnits.length > 0
                && MyUnits.some(
                    x => this.team === 0 && x.position.x > this.position.x || this.team === 1 && x.position.x < this.position.x)
                && !this.isUnderTower()) {

                /***************
                 * Has Units And Secure
                 */

                for (let i = 0; i < Groots.length; i++) {
                    const groot: Groot = Groots[i];
                    if (groot.position.distanceTo(this.position) < 150) {

                        /***************
                         * Groot Attack
                         */

                        return print([CommandType.ATTACK, groot.unitId, '; I am GROOOT !!!!'].join(' '));
                    }
                }


                for (let i = 0; i < EnemyHeroes.length; i++) {
                    const hero = EnemyHeroes[i];
                    if (EnemyHeroes[i].canAttack(this)
                        && ( EnemyUnits.length === 0
                            || EnemyUnits.every(
                                (x) => hero.team === 0 && x.position.x < hero.position.x
                                    || hero.team === 1 && x.position.x > hero.position.x))) {

                        /***************
                         * If At Range Ennemy
                         */

                        if (this.lookForSkill()) {
                            return;
                        }
                        return print([CommandType.ATTACK, EnemyHeroes[i].unitId, '; BONZAI'].join(' '));
                    }
                }

                let myFrontUnit = MyUnits.filter((u) => this.canAttack(u));
                if (myFrontUnit.length < 0) {
                    myFrontUnit = MyUnits.slice(0);
                }
                myFrontUnit = myFrontUnit.sort((a, b) => {
                    if (this.team = 0) {
                        return b.position.x - a.position.x;
                    } else {
                        return a.position.x - b.position.x;
                    }
                });
                const myLowUnit = myFrontUnit.filter(
                    u => u.health < u.maxHealth * 0.25 && u.health <= this.attackDamage && this.canAttack(u)
                );



                if (myLowUnit.length > 0) {

                    /***************
                     * Has One Low Units For Deny
                     */

                    Entity[myLowUnit[0].unitId] = undefined;
                    return print([CommandType.ATTACK, myLowUnit[0].unitId, ';', 'Deny'].join(' '));
                } else {
                    const origin = this.position;
                    this.position = new Position(
                        this.position.x + (this.team === 0 ?  this.movementSpeed : -this.movementSpeed),
                        this.position.y);
                    if (this.isUnderTower()) {

                        /***************
                         * Is Under Tower
                         */

                        return print([CommandType.MOVE, MyTower.position.x, MyTower.position.y, ';', 'RETAITE'].join(' '));
                    } else {
                        const lowestEnemy = EnemyUnits.filter(u => u.health < this.attackDamage && this.canAttack(u));
                        const closestEnemy = EnemyUnits.filter(u => this.canAttack(u));
                        if (lowestEnemy.length > 0) {
                            /***************
                             * Can Last Hit
                             */
                            Entity[lowestEnemy[0].unitId] = undefined;
                            return print([
                                             CommandType.ATTACK,
                                             lowestEnemy[0].unitId, ';', 'Last Hit'].join(' '));
                        } else if (closestEnemy.length > 0) {

                            /***************
                             * Push
                             */

                            if (this.lookForItem()) {
                                return;
                            }

                            this.position = origin;
                            if (this.lookForSkill()) {
                                return;
                            }
                            this.position = new Position(
                                this.position.x + (this.team === 0 ?  this.movementSpeed : -this.movementSpeed),
                                this.position.y);

                            return print([
                                             CommandType.ATTACK,
                                             closestEnemy[0].unitId, ';', 'Attack'].join(' '));
                        } else  {

                            /***************
                             * Move To Front Line
                             */

                            if (this.lookForItem()) {
                                return;
                            }

                            this.position = origin;
                            if (this.lookForSkill()) {
                                return;
                            }
                            this.position = new Position(
                                this.position.x + (this.team === 0 ?  this.movementSpeed : -this.movementSpeed),
                                this.position.y);

                            return print([CommandType.MOVE, this.position.x, this.position.y, ';', 'Move'].join(' '));
                        }
                    }
                }
            } else {

                /***************
                 * No Units Or UnSecure
                 */

                return print([CommandType.MOVE, MyTower.position.x, MyTower.position.y, ';', 'RETAITE'].join(' '));
            }
        }

        public lookForSkill() {
            if (this.heroType === HeroesType.IRONMAN) {

                if (this.countDown1 === 0 && this.mana >= 50) {
                    for (let i = 0; i < MyHeroes.length; i++) {
                        const hero = MyHeroes[i];

                        for (let j = 0; j < EnemyHeroes.length; j++) {
                            const enemy = EnemyHeroes[j];

                            if (enemy.canAttack(hero) && hero !== this &&  hero.position.distanceTo(this.position) <= 200) {
                                print(['BLINK', hero.position.x, hero.position.y, '; JUMPY JUMPA !!!!'].join(' '));
                                return true;
                            }
                        }
                    }
                }

                if (this.countDown2 === 0 && this.mana >= 60) {
                    for (let j = 0; j < EnemyHeroes.length; j++) {
                        const hero = EnemyHeroes[j];

                        if (hero.position.distanceTo(this.position) <= 900) {
                            print(['FIREBALL', hero.position.x, hero.position.y, '; Ka-Me-Ha-Me-Haaaaa!!!!'].join(' '));
                            return true;
                        }
                    }
                }

                if (this.countDown3 === 0 && this.mana >= 50) {
                    for (let i = 0; i < MyHeroes.length; i++) {
                        const hero = MyHeroes[i];

                        for (let j = 0; j < EnemyHeroes.length; j++) {
                            const enemy = EnemyHeroes[j];

                            if (enemy.canAttack(hero) && hero !== this &&  enemy.position.distanceTo(this.position) <= 250) {
                                print(['BURNING', enemy.position.x, enemy.position.y, '; JUMPY JUMPA !!!!'].join(' '));
                                return true;
                            }
                        }
                    }
                }
            }
            if (this.heroType === HeroesType.DOCTOR_STRANGE) {

                if (this.countDown1 === 0 && this.mana >= 50) {
                    for (let i = 0; i < MyHeroes.length; i++) {
                        const hero = MyHeroes[i];

                        if (hero.health < hero.maxHealth * 0.5) {
                            print(['AOEHEAL', hero.position.x, hero.position.y, '; Take This Buddy !!!!'].join(' '));
                            return true;
                        }
                    }
                }

                if (this.countDown2 === 0 && this.mana >= 40) {
                    for (let i = 0; i < MyHeroes.length; i++) {
                        const hero = MyHeroes[i];

                        for (let j = 0; j < EnemyHeroes.length; j++) {
                            const enemy = EnemyHeroes[j];

                            if (enemy.canAttack(hero)) {
                                print(['SHIELD', hero.unitId, '; PROTECT !!!!'].join(' '));
                                return true;
                            }
                        }
                    }
                }

                if (this.countDown3 === 0 && this.mana >= 54) {
                    for (let i = 0; i < EnemyHeroes.length; i++) {
                        const hero = EnemyHeroes[i];

                        if (hero.position.distanceTo(this.position) <= 400) {
                            print(['PULL', hero.unitId, '; I Love You !!!!'].join(' '));
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public lookForItem() {
            if (this.health < this.maxHealth * 0.3 && healthPotions.length > 0) {
                print([
                          CommandType.BUY,
                          healthPotions[0].itemName, ';', 'POPO HP'].join(' '));
                PlayerOne.gold -= healthPotions[0].itemCost;
                return true;
            } else if (false && this.mana < this.maxMana * 0.25 && manaPotions.length > 0) {
                // @ts-ignore
                print([
                          CommandType.BUY,
                          manaPotions[0].itemName, ';', 'POPO MP'].join(' '));
                PlayerOne.gold -= manaPotions[0].itemCost;
                return true;
            } else if (affordableItems.length > 0) {
                if (this.itemsOwned < 3) {
                    MyItems[this.heroType].push(affordableItems[0]);
                    print([
                              CommandType.BUY,
                              affordableItems[0].itemName, ';', 'STUFF'].join(' '));
                    PlayerOne.gold -= affordableItems[0].itemCost;
                    return true;
                } else if (affordableItems[0].value > MyItems[this.heroType][0].value) {
                    print([
                              CommandType.SELL,
                              MyItems[this.heroType].splice(0, 1)[0].itemName, ';', 'Sell'].join(' '));
                    return true;
                }
            }
            return false;
        }
    }

    class Unit extends Entity {

        public get type(): EntityType {
            return EntityType.UNIT;
        }

        constructor() {
            super();
        }

        static getForTeam(idTeam: number): Array<Hero> {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.UNIT && Entitys[name].team === idTeam;
            }).map(name => Entitys[name] as Hero);
        }

    }

    class Groot extends Entity {

        public get type(): EntityType {
            return EntityType.GROOT;
        }

        constructor() {
            super();
        }

        static getAll(): Array<Hero> {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.GROOT;
            }).map(name => Entitys[name] as Hero);
        }

    }

    class Tower extends Entity {

        public get type(): EntityType {
            return EntityType.TOWER;
        }

        constructor() {
            super();
        }

        static getForTeam(idTeam: number): Tower {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.TOWER && Entitys[name].team === idTeam;
            }).map(name => Entitys[name] as Tower)[0];
        }

        public canAttack(entity: Entity) {
            const distance = this.position.distanceTo(entity.position) - this.attackRange;

            if (distance < 0) {
                return true;
            }
        }

    }

    class NeutralEntity {

        private _type: NeutralEntityType;
        private _x: number;
        private _y: number;
        private _radius: number;

        constructor() {
            const inputs = readline().split(' ');
            this._type = NeutralEntityType[inputs[0]];
            this._x = parseInt(inputs[1], 10);
            this._y = parseInt(inputs[2], 10);
            this._radius = parseInt(inputs[3], 10);
        }
    }

    class Item {
        public itemName: string;
        public itemCost: number;
        public damage: number;
        public health: number;
        public maxHealth: number;
        public mana: number;
        public maxMana: number;
        public moveSpeed: number;
        public manaRegeneration: number;
        public isPotion: number;

        public get value() {
            return this.damage * 7. + this.health * 4. + this.mana * 2.;
        }

        constructor() {
            const inputs = readline().split(' ');
            this.itemName = inputs[0]; // contains keywords such as BRONZE, SILVER and BLADE, BOOTS connected by "_"
            this.itemCost = parseInt(inputs[1], 10); // BRONZE items have lowest cost, the most expensive items are LEGENDARY
            this.damage = parseInt(inputs[2], 10); // keyword BLADE is present if the most important item stat is damage
            this.health = parseInt(inputs[3], 10);
            this.maxHealth = parseInt(inputs[4], 10);
            this.mana = parseInt(inputs[5], 10);
            this.maxMana = parseInt(inputs[6], 10);
            this.moveSpeed = parseInt(inputs[7], 10); // keyword BOOTS is present if the most important item stat is moveSpeed
            this.manaRegeneration = parseInt(inputs[8], 10);
            this.isPotion = parseInt(inputs[9], 10); // 0 if it's not instantly consumed
        }

        public static stuffForGold(gold: number) {
            return Items.filter(item => {
                return item.itemCost <= gold && !item.isPotion;
            });
        }

        public static healthForGold(gold: number) {
            return Items.filter(item => {
                return item.itemCost <= gold && item.isPotion && item.health > 0;
            });
        }
        public static manaForGold(gold: number) {
            return Items.filter(item => {
                return item.itemCost <= gold && item.isPotion && item.mana > 0;
            });
        }
    }

    class Player {

        public gold: number;

        public get teamId(): number {
            return this._id;
        }

        constructor(private _id: number) {
        }

        public Update() {
            this.gold = parseInt(readline(), 10);
        }

        public process(roundType: number) {
            if (roundType < 0) {

                /**********************
                 * Draft
                 */

                if (MyHeroesType.length === 0) {
                    MyHeroesType.push(HeroesType.IRONMAN);
                    print(HeroesType.IRONMAN);
                    MyItems[HeroesType.IRONMAN] = [];
                } else {

                    MyHeroesType.push(HeroesType.DOCTOR_STRANGE);
                    print(HeroesType.DOCTOR_STRANGE);
                    MyItems[HeroesType.DOCTOR_STRANGE] = [];
                }

            } else if (roundType > 0) {

                /**********************
                 * Battle
                 */

                MyHeroesType.forEach(type => {
                    const hero = MyHeroes.find(x => x.heroType === type);
                    if (hero != null) {

                        MyItems[hero.heroType] = MyItems[hero.heroType].sort((a, b) => {
                            return a.value - b.value;
                        });
                        affordableItems = Item.stuffForGold(this.gold).sort((a, b) => {
                            return b.value - a.value;
                        });
                        healthPotions = Item.healthForGold(this.gold).sort((a, b) => {
                            return b.health - a.health;
                        });
                        manaPotions  = Item.manaForGold(this.gold).sort((a, b) => {
                            return b.mana - a.mana;
                        });

                        hero.process();
                    }
                });
            }
        }
    }

    /**********************
     * Global
     **********************/

    const Players: Array<Player> = [new Player(0), new Player(1)];
    const PlayerOne: Player = Players[parseInt(readline(), 10)];
    const PlayerTwo: Player = Players[PlayerOne.teamId === 0 ? 1 : 0];
    let Entitys: { [key: string]: Entity } = {};
    const MyHeroesType = [];
    const Heroes: { [key: string]: Hero } = {
        'DEADPOOL': new Hero().init(1380, 100, 80, 200, 1, 110),
        'HULK': new Hero().init(1450, 90, 90, 200, 1, 95),
        'VALKYRIE': new Hero().init(1400, 155, 65, 200, 2, 130),
        'IRONMAN': new Hero().init(820, 200, 60, 200, 2, 270),
        'DOCTOR_STRANGE': new Hero().init(955, 300, 50, 200, 2, 245)
    };
    const NeutralEntities: Array<NeutralEntity> = [];

    let MyTower: Tower = Tower.getForTeam(PlayerOne.teamId);
    let EnemyTower: Tower  = Tower.getForTeam(PlayerTwo.teamId);
    let MyUnits: Array<Unit>  = Unit.getForTeam(PlayerOne.teamId);
    let EnemyUnits: Array<Unit> = Unit.getForTeam(PlayerTwo.teamId);
    let MyHeroes: Array<Hero> = Hero.getForTeam(PlayerOne.teamId);
    let EnemyHeroes: Array<Hero> = Hero.getForTeam(PlayerTwo.teamId);
    let Groots: Array<Groot> = Groot.getAll();

    const MyItems = {};
    let affordableItems: Array<Item> = [];
    let healthPotions: Array<Item> = [];
    let manaPotions: Array<Item> = [];

    /**********************
     * Initialisation
     **********************/

    const bushAndSpawnPointCount = parseInt(readline(), 10);
    for (let i = 0; i < bushAndSpawnPointCount; i++) {
        NeutralEntities.push(new NeutralEntity());
    }
    const Items: Array<Item> = [];
    const itemCount = parseInt(readline(), 10);
    for (let i = 0; i < itemCount; i++) {
        Items.push(new Item());
    }

    /**********************
     * Main
     **********************/

    // game loop
    while (true) {

        /**********************
         * Update
         **********************/

        PlayerOne.Update();
        PlayerTwo.Update();
        const roundType = parseInt(readline(), 10);

        Entitys = {};
        const entityCount = parseInt(readline(), 10);
        for (let i = 0; i < entityCount; i++) {
            Entity.Update();
        }

        MyTower = Tower.getForTeam(PlayerOne.teamId);
        EnemyTower = Tower.getForTeam(PlayerTwo.teamId);
        MyUnits = Unit.getForTeam(PlayerOne.teamId);
        EnemyUnits = Unit.getForTeam(PlayerTwo.teamId);
        MyHeroes = Hero.getForTeam(PlayerOne.teamId);
        EnemyHeroes = Hero.getForTeam(PlayerTwo.teamId);
        Groots = Groot.getAll();

        /**********************
         * Play
         **********************/

        PlayerOne.process(roundType);
    }
}

var BottersOfTheGallaxy;
(function (BottersOfTheGallaxy) {
    /**********************
     * Constant
     **********************/
    const HEIGHT = 750;
    const WIDTH = 1920;
    const INITIALX1 = 200;
    const INITIALY1 = 590;
    const INITIALX2 = 1720;
    const INITIALY2 = 590;
    let CommandType;
    (function (CommandType) {
        CommandType["WAIT"] = "WAIT";
        CommandType["MOVE"] = "MOVE";
        CommandType["ATTACK"] = "ATTACK";
        CommandType["ATTACK_NEAREST"] = "ATTACK_NEAREST";
        CommandType["MOVE_ATTACK"] = "MOVE_ATTACK";
        CommandType["BUY"] = "BUY";
        CommandType["SELL"] = "SELL";
    })(CommandType || (CommandType = {}));
    let HeroesType;
    (function (HeroesType) {
        HeroesType["DEADPOOL"] = "DEADPOOL";
        HeroesType["HULK"] = "HULK";
        HeroesType["VALKYRIE"] = "VALKYRIE";
        HeroesType["DOCTOR_STRANGE"] = "DOCTOR_STRANGE";
        HeroesType["IRONMAN"] = "IRONMAN";
    })(HeroesType || (HeroesType = {}));
    const TIMEMAX = 1;
    const ASPHEROES = 0.1;
    const ASPUNITS = 0.2;
    let NeutralEntityType;
    (function (NeutralEntityType) {
        NeutralEntityType["BUSH"] = "BUSH";
        NeutralEntityType["SPAWN"] = "SPAWN";
    })(NeutralEntityType || (NeutralEntityType = {}));
    let EntityType;
    (function (EntityType) {
        EntityType[EntityType["NONE"] = 0] = "NONE";
        EntityType["UNIT"] = "UNIT";
        EntityType["HERO"] = "HERO";
        EntityType["TOWER"] = "TOWER";
        EntityType["GROOT"] = "GROOT";
    })(EntityType || (EntityType = {}));
    /**********************
     * Class
     **********************/
    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        distanceTo(pos) {
            return Math.sqrt(this.computeDistance(pos));
        }
        computeDistance(pos) {
            return Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2);
        }
        isInRange(position, range) {
            return this.distanceTo(position) <= range;
        }
    }
    Position.zero = new Position(0, 0);
    class Entity {
        get isRange() {
            return this.attackRange > 150;
        }
        get otherTeamId() {
            return this.team === 0 ? 1 : 0;
        }
        get type() {
            return EntityType.NONE;
        }
        constructor() {
        }
        static Update() {
            const inputs = readline().split(' ');
            const unitId = parseInt(inputs[0], 10);
            if (Entitys[unitId] != null) {
                Entitys[unitId].Update(inputs);
            }
            else {
                switch (inputs[2]) {
                    case EntityType.HERO:
                        Entitys[unitId] = new Hero();
                        break;
                    case EntityType.UNIT:
                        Entitys[unitId] = new Unit();
                        break;
                    case EntityType.TOWER:
                        Entitys[unitId] = new Tower();
                        break;
                    case EntityType.GROOT:
                        Entitys[unitId] = new Groot();
                        break;
                }
            }
            Entitys[unitId].Update(inputs);
        }
        Update(inputs) {
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
        canAttack(entity, withMove = false) {
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
        isUnderTower() {
            return Tower.getForTeam(this.team === 0 ? 1 : 0).canAttack(this);
        }
        timeToMove(distance) {
            return distance / this.movementSpeed;
        }
        timeForAttack(distance) {
            let time = this.type === EntityType.HERO ? ASPHEROES : ASPUNITS;
            if (this.isRange) {
                time += (distance / this.attackRange);
            }
            return time;
        }
    }
    class Hero extends Entity {
        get type() {
            return EntityType.HERO;
        }
        constructor() {
            super();
        }
        static getForTeam(idTeam) {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.HERO && Entitys[name].team === idTeam;
            }).map(name => Entitys[name]);
        }
        init(maxHealth, maxMana, attackDamage, movementSpeed, manaRegeneration, attackRange) {
            this.maxHealth = maxHealth;
            this.maxMana = maxMana;
            this.attackDamage = attackDamage;
            this.movementSpeed = movementSpeed;
            this.manaRegeneration = manaRegeneration;
            this.attackRange = attackRange;
            return this;
        }
        Update(inputs) {
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
        process() {
            if (MyUnits.length > 0
                && MyUnits.some(x => this.team === 0 && x.position.x > this.position.x || this.team === 1 && x.position.x < this.position.x)
                && !this.isUnderTower()) {
                /***************
                 * Has Units And Secure
                 */
                for (let i = 0; i < Groots.length; i++) {
                    const groot = Groots[i];
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
                        && (EnemyUnits.length === 0
                            || EnemyUnits.every((x) => hero.team === 0 && x.position.x < hero.position.x
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
                    }
                    else {
                        return a.position.x - b.position.x;
                    }
                });
                const myLowUnit = myFrontUnit.filter(u => u.health < u.maxHealth * 0.25 && u.health <= this.attackDamage && this.canAttack(u));
                if (myLowUnit.length > 0) {
                    /***************
                     * Has One Low Units For Deny
                     */
                    Entity[myLowUnit[0].unitId] = undefined;
                    return print([CommandType.ATTACK, myLowUnit[0].unitId, ';', 'Deny'].join(' '));
                }
                else {
                    const origin = this.position;
                    this.position = new Position(this.position.x + (this.team === 0 ? this.movementSpeed : -this.movementSpeed), this.position.y);
                    if (this.isUnderTower()) {
                        /***************
                         * Is Under Tower
                         */
                        return print([CommandType.MOVE, MyTower.position.x, MyTower.position.y, ';', 'RETAITE'].join(' '));
                    }
                    else {
                        const lowestEnemy = EnemyUnits.filter(u => u.health < this.attackDamage && this.canAttack(u));
                        const closestEnemy = EnemyUnits.filter(u => this.canAttack(u));
                        if (lowestEnemy.length > 0) {
                            /***************
                             * Can Last Hit
                             */
                            Entity[lowestEnemy[0].unitId] = undefined;
                            return print([
                                CommandType.ATTACK,
                                lowestEnemy[0].unitId, ';', 'Last Hit'
                            ].join(' '));
                        }
                        else if (closestEnemy.length > 0) {
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
                            this.position = new Position(this.position.x + (this.team === 0 ? this.movementSpeed : -this.movementSpeed), this.position.y);
                            return print([
                                CommandType.ATTACK,
                                closestEnemy[0].unitId, ';', 'Attack'
                            ].join(' '));
                        }
                        else {
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
                            this.position = new Position(this.position.x + (this.team === 0 ? this.movementSpeed : -this.movementSpeed), this.position.y);
                            return print([CommandType.MOVE, this.position.x, this.position.y, ';', 'Move'].join(' '));
                        }
                    }
                }
            }
            else {
                /***************
                 * No Units Or UnSecure
                 */
                return print([CommandType.MOVE, MyTower.position.x, MyTower.position.y, ';', 'RETAITE'].join(' '));
            }
        }
        lookForSkill() {
            if (this.heroType === HeroesType.IRONMAN) {
                if (this.countDown1 === 0 && this.mana >= 50) {
                    for (let i = 0; i < MyHeroes.length; i++) {
                        const hero = MyHeroes[i];
                        for (let j = 0; j < EnemyHeroes.length; j++) {
                            const enemy = EnemyHeroes[j];
                            if (enemy.canAttack(hero) && hero !== this && hero.position.distanceTo(this.position) <= 200) {
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
                            if (enemy.canAttack(hero) && hero !== this && enemy.position.distanceTo(this.position) <= 250) {
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
        lookForItem() {
            if (this.health < this.maxHealth * 0.3 && healthPotions.length > 0) {
                print([
                    CommandType.BUY,
                    healthPotions[0].itemName, ';', 'POPO HP'
                ].join(' '));
                PlayerOne.gold -= healthPotions[0].itemCost;
                return true;
            }
            else if (false && this.mana < this.maxMana * 0.25 && manaPotions.length > 0) {
                // @ts-ignore
                print([
                    CommandType.BUY,
                    manaPotions[0].itemName, ';', 'POPO MP'
                ].join(' '));
                PlayerOne.gold -= manaPotions[0].itemCost;
                return true;
            }
            else if (affordableItems.length > 0) {
                if (this.itemsOwned < 3) {
                    MyItems[this.heroType].push(affordableItems[0]);
                    print([
                        CommandType.BUY,
                        affordableItems[0].itemName, ';', 'STUFF'
                    ].join(' '));
                    PlayerOne.gold -= affordableItems[0].itemCost;
                    return true;
                }
                else if (affordableItems[0].value > MyItems[this.heroType][0].value) {
                    print([
                        CommandType.SELL,
                        MyItems[this.heroType].splice(0, 1)[0].itemName, ';', 'Sell'
                    ].join(' '));
                    return true;
                }
            }
            return false;
        }
    }
    class Unit extends Entity {
        get type() {
            return EntityType.UNIT;
        }
        constructor() {
            super();
        }
        static getForTeam(idTeam) {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.UNIT && Entitys[name].team === idTeam;
            }).map(name => Entitys[name]);
        }
    }
    class Groot extends Entity {
        get type() {
            return EntityType.GROOT;
        }
        constructor() {
            super();
        }
        static getAll() {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.GROOT;
            }).map(name => Entitys[name]);
        }
    }
    class Tower extends Entity {
        get type() {
            return EntityType.TOWER;
        }
        constructor() {
            super();
        }
        static getForTeam(idTeam) {
            return Object.keys(Entitys).filter(name => {
                return Entitys[name].type === EntityType.TOWER && Entitys[name].team === idTeam;
            }).map(name => Entitys[name])[0];
        }
        canAttack(entity) {
            const distance = this.position.distanceTo(entity.position) - this.attackRange;
            if (distance < 0) {
                return true;
            }
        }
    }
    class NeutralEntity {
        constructor() {
            const inputs = readline().split(' ');
            this._type = NeutralEntityType[inputs[0]];
            this._x = parseInt(inputs[1], 10);
            this._y = parseInt(inputs[2], 10);
            this._radius = parseInt(inputs[3], 10);
        }
    }
    class Item {
        get value() {
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
        static stuffForGold(gold) {
            return Items.filter(item => {
                return item.itemCost <= gold && !item.isPotion;
            });
        }
        static healthForGold(gold) {
            return Items.filter(item => {
                return item.itemCost <= gold && item.isPotion && item.health > 0;
            });
        }
        static manaForGold(gold) {
            return Items.filter(item => {
                return item.itemCost <= gold && item.isPotion && item.mana > 0;
            });
        }
    }
    class Player {
        constructor(_id) {
            this._id = _id;
        }
        get teamId() {
            return this._id;
        }
        Update() {
            this.gold = parseInt(readline(), 10);
        }
        process(roundType) {
            if (roundType < 0) {
                /**********************
                 * Draft
                 */
                if (MyHeroesType.length === 0) {
                    MyHeroesType.push(HeroesType.IRONMAN);
                    print(HeroesType.IRONMAN);
                    MyItems[HeroesType.IRONMAN] = [];
                }
                else {
                    MyHeroesType.push(HeroesType.DOCTOR_STRANGE);
                    print(HeroesType.DOCTOR_STRANGE);
                    MyItems[HeroesType.DOCTOR_STRANGE] = [];
                }
            }
            else if (roundType > 0) {
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
                        manaPotions = Item.manaForGold(this.gold).sort((a, b) => {
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
    const Players = [new Player(0), new Player(1)];
    const PlayerOne = Players[parseInt(readline(), 10)];
    const PlayerTwo = Players[PlayerOne.teamId === 0 ? 1 : 0];
    let Entitys = {};
    const MyHeroesType = [];
    const Heroes = {
        'DEADPOOL': new Hero().init(1380, 100, 80, 200, 1, 110),
        'HULK': new Hero().init(1450, 90, 90, 200, 1, 95),
        'VALKYRIE': new Hero().init(1400, 155, 65, 200, 2, 130),
        'IRONMAN': new Hero().init(820, 200, 60, 200, 2, 270),
        'DOCTOR_STRANGE': new Hero().init(955, 300, 50, 200, 2, 245)
    };
    const NeutralEntities = [];
    let MyTower = Tower.getForTeam(PlayerOne.teamId);
    let EnemyTower = Tower.getForTeam(PlayerTwo.teamId);
    let MyUnits = Unit.getForTeam(PlayerOne.teamId);
    let EnemyUnits = Unit.getForTeam(PlayerTwo.teamId);
    let MyHeroes = Hero.getForTeam(PlayerOne.teamId);
    let EnemyHeroes = Hero.getForTeam(PlayerTwo.teamId);
    let Groots = Groot.getAll();
    const MyItems = {};
    let affordableItems = [];
    let healthPotions = [];
    let manaPotions = [];
    /**********************
     * Initialisation
     **********************/
    const bushAndSpawnPointCount = parseInt(readline(), 10);
    for (let i = 0; i < bushAndSpawnPointCount; i++) {
        NeutralEntities.push(new NeutralEntity());
    }
    const Items = [];
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
})(BottersOfTheGallaxy || (BottersOfTheGallaxy = {}));

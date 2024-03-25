
namespace CodersStrikeBack {

    const EPSILON = 0.00001;
    const NB_LOOP = 10;
    const NB_SOLUTION = 1;
    const NB_MOVE = 5;

    const SHIELD_PROB = 0;
    const RADIUS_CHECKPOINT = 600;
    const RADIUS_POD = 400 ;

    const MAX_ANGLE = 18;
    const MAX_THRUST = 100;
    const MIN_THRUST = 0;
    const BOOST_THRUST = 650;
    const FRICTION_THRUST = 0.85;

    class Collision {

        constructor(public a: Unit,
                    public b: Unit,
                    public t: number) {
        }
    }

    class Point {

        constructor(public x: number, public y: number) {
        }

        public distanceTo(p: Point): number {
            return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
        }

        public distance(p: Point): number {
            return Math.sqrt(this.distanceTo(p));
        }

        public closest(a: Point, b: Point): Point {
            const da = b.y - a.y;
            const db = a.x - b.x;
            const c1 = da * a.x + db * a.y;
            const c2 = -db * this.x + da * this.y;
            const det = da * da + db * db;
            let cx = 0;
            let cy = 0;

            if (det !== 0) {
                cx = (da * c1 - db * c2) / det;
                cy = (da * c2 + db * c1) / det;
            } else {
                cx = this.x;
                cy = this.y;
            }

            return new Point(cx, cy);
        }
    }

    class Unit extends Point {
        protected cache: Array<any> = [];

        constructor(x: number,
                    y: number,
                    public id: number,
                    public r: number,
                    public vx: number,
                    public vy: number) {
            super(x, y);
        }

        public collision(u: Unit): Collision {
            const dist = this.distanceTo(u);

            const sr = (this.r + u.r) * (this.r + u.r);

            if (dist < sr) {
                return new Collision(this, u, 0.0);
            }

            if (this.vx === u.vx && this.vy === u.vy) {
                return null;
            }

            const x = this.x - u.x;
            const y = this.y - u.y;
            const myp = new Point(x, y);
            const vx = this.vx - u.vx;
            const vy = this.vy - u.vy;
            const up = new Point(0, 0);

            const p = up.closest(myp, new Point(x + vx, y + vy));

            let pdist = up.distanceTo(p);

            const mypdist = myp.distanceTo(p);

            if (pdist < sr) {
                // Our speed on the line
                const length = Math.sqrt(vx * vx + vy * vy);

                const backdist = Math.sqrt(sr - pdist);
                p.x = p.x - backdist * (vx / length);
                p.y = p.y - backdist * (vy / length);

                if (myp.distanceTo(p) > mypdist) {
                    return null;
                }

                pdist = p.distance(myp);

                if (pdist > length) {
                    return null;
                }

                const t = pdist / length;

                return new Collision(this, u, t);
            }

            return null;
        }

        public bounce(u: Unit) {
            printErr('BOUNCE UNIT');
        }

        public save() {
            this.cache[0] = this.x;
            this.cache[1] = this.y;
            this.cache[2] = this.vx;
            this.cache[3] = this.vy;
        }

        public load() {
            this.x = this.cache[0];
            this.y = this.cache[1];
            this.vx = this.cache[2];
            this.vy = this.cache[3];
        }
    }

    class Checkpoint extends Unit {

        constructor(x: number,
                    y: number,
                    id: number) {
            super(x, y, id, RADIUS_CHECKPOINT, 0, 0);
        }
    }

    class Pod extends Unit {

        public checked: number;
        private counterShield: number;
        private shield: boolean;
        private booster: boolean;

        constructor(x: number,
                    y: number,
                    id: number,
                    public angle: number,
                    public nextCheckPointId: number,
                    public timeout: number,
                    public partner: Pod,
                    public shieldAvailable: boolean,
                    public boostAvailable: boolean) {
            super(x, y, id, RADIUS_POD, 0, 0);
        }

        public getAngle(p: Point): number {
            const d = this.distance(p);
            const dx = (p.x - this.x) / d;
            const dy = (p.y - this.y) / d;

            let a = Math.acos(dx) * 180.0 / Math.PI;

            if (dy < 0) {
                a = 360.0 - a;
            }

            return a;
        }

        public diffAngle(p: Point): number {
            const a = this.getAngle(p);

            const right = this.angle <= a ? a - this.angle : 360.0 - this.angle + a;
            const left = this.angle >= a ? this.angle - a : this.angle + 360.0 - a;

            if (right < left) {
                return right;
            } else {
                return -left;
            }
        }

        public rotate(p: Point) {
            let a = this.diffAngle(p);

            if (a > MAX_ANGLE) {
                a = MAX_ANGLE;
            } else if (a < -MAX_ANGLE) {
                a = -MAX_ANGLE;
            }

            this.angle += a;

            if (this.angle >= 360.0) {
                this.angle = this.angle - 360.0;
            } else if (this.angle < 0.0) {
                this.angle += 360.0;
            }
        }

        public boost(thrust: number) {

            const ra = this.angle * Math.PI / 180.0;

            if (this.counterShield > 0) {
                return;
            }
            if (this.booster) {
                this.vx += Math.cos(ra) * BOOST_THRUST;
                this.vy += Math.sin(ra) * BOOST_THRUST;
                this.booster = false;
            } else {
                this.vx += Math.cos(ra) * thrust;
                this.vy += Math.sin(ra) * thrust;
            }
        }

        public move(t: number) {
            this.x += this.vx * t;
            this.y += this.vy * t;
        }

        public end() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.vx = Math.trunc(this.vx * FRICTION_THRUST);
            this.vy = Math.trunc(this.vy * FRICTION_THRUST);
            this.timeout -= 1;
            this.booster = false;

            if (this.shield) {
                this.counterShield--;
                if (this.counterShield === 0) {
                    this.shield = false;
                }
            }
        }

        public play(p: Point, thrust: number) {
            this.rotate(p);
            this.boost(thrust);
            this.move(1.0);
            this.end();
        }

        public score(): number {
            return this.checked * 50000 - this.distance(this.checkpoint());
        }

        public bounce(u: Unit) {
            if (u instanceof Checkpoint) {
                this.bounceWithCheckpoint(u);
            } else if (u instanceof Pod) {

                const m1 = this.shield ? 10 : 1;
                const m2 = u.shield ? 10 : 1;
                const mcoeff = (m1 + m2) / (m1 * m2);

                const nx = this.x - u.x;
                const ny = this.y - u.y;

                const nxnysquare = nx * nx + ny * ny;

                const dvx = this.vx - u.vx;
                const dvy = this.vy - u.vy;

                const product = nx * dvx + ny * dvy / (nxnysquare * mcoeff);

                let fx = nx * product ;
                let fy = ny * product;

                // const m1_inv = 1.0 / m1;
                // const m2_inv = 1.0 / m2;

                const impulse = Math.sqrt(fx * fx + fy * fy);
                if (impulse < 120.0) {
                    const df = 120.0 / impulse;
                    fx *= df;
                    fy *= df;
                }

                this.vx -= fx / m1;
                this.vy -= fy / m1;
                u.vx += fx / m2;
                u.vy += fy / m2;
            }
        }

        public activateShield() {
            this.shield = true;
            this.counterShield = 3;
            this.shieldAvailable = false;
        }

        public output(move: Move) {
            let a = this.angle + move.angle;

            if (a >= 360.0) {
                a = a - 360.0;
            } else if (a < 0.0) {
                a += 360.0;
            }

            a = a * Math.PI / 180.0;
            const px = this.x + Math.cos(a) * 10000.0;
            const py = this.y + Math.sin(a) * 10000.0;

            if (move.shield) {
                print([Math.round(px), Math.round(py), 'SHIELD'].join(' '));
            } else if (move.boost) {
                print([Math.round(px), Math.round(py), 'BOOST'].join(' '));
            } else {
                print([Math.round(px), Math.round(py), Math.round(move.thrust)].join(' '));
            }

        }

        public bounceWithCheckpoint(checkpoint: Checkpoint) {

        }

        public checkpoint() {
            return CheckPoints[this.nextCheckPointId];
        }

        public apply(move: Move) {

            let a = this.angle + move.angle;

            if (a >= 360.0) {
                a = a - 360.0;
            } else if (a < 0.0) {
                a += 360.0;
            }

            a = a * Math.PI / 180.0;
            const px = this.x + Math.cos(a) * 10000.0;
            const py = this.y + Math.sin(a) * 10000.0;

            if (move.shield) {
                this.activateShield();
            }
            if (move.boost) {
                this.activateBoost();
            }

            this.rotate(new Point(Math.round(px), Math.round(py)));
            this.boost(move.thrust);
        }

        public save() {
            super.save();
            this.cache[4] = this.angle;
            this.cache[5] = this.shieldAvailable;
            this.cache[6] = this.boostAvailable;
            this.cache[7] = this.shield;
            this.cache[8] = this.booster;
            this.cache[9] = this.nextCheckPointId;
            this.cache[10] = this.timeout;
            this.cache[11] = this.counterShield;
        }

        public load() {
            super.load();
            this.angle = this.cache[4];
            this.shieldAvailable = this.cache[5];
            this.boostAvailable = this.cache[6];
            this.shield = this.cache[7];
            this.booster = this.cache[8];
            this.nextCheckPointId = this.cache[9];
            this.timeout = this.cache[10];
            this.counterShield = this.cache[11];
            this.checked = this.cache[12];
        }

        private activateBoost() {
            this.booster = true;
            this.boostAvailable = false;
        }
    }

    class BasicIA {

        public static getMove(pod: Pod): Move {

            const nextCheck = ( pod.nextCheckPointId + 1 === CheckPoints.length)
                ? CheckPoints[0]
                : CheckPoints[pod.nextCheckPointId + 1];

            const m = (pod.checkpoint().y - nextCheck.y) / (pod.checkpoint().x - nextCheck.x);
            const b = pod.checkpoint().y - m * pod.checkpoint().x;

            const x1 = (pod.checkpoint().x + 350 / Math.sqrt(1 + m * m));
            const x2 = (pod.checkpoint().x - 350 / Math.sqrt(1 + m * m));

            const point1 = new Point(x1, m * x1 + b);
            const point2 = new Point(x2, m * x2 + b);

            let target = point2;
            if (nextCheck.distanceTo(point1) < nextCheck.distanceTo(point2)) {
                target = point1;
            }

            const distance = pod.distance(target);
            const angle = pod.diffAngle(target);

            let speed: number | 'BOOST' = 100;
            if (Math.abs(angle) >= 75) {
                speed = 0;
            } else if (Math.abs(angle) >= 50 && distance <= 2000) {
                speed = 40;
            } else if (Math.abs(angle) >= 25 && distance <= 2000) {
                speed = 80;
            } else if (distance > 5000 && pod.boostAvailable &&  Math.abs(angle) <= 2) {
                speed = 'BOOST';
            } else if (distance <= 1000) {
                speed = 40;
            } else if (distance <= 1500) {
                speed = 60;
            } else if (distance <= 1800) {
                speed = 80;
            }

            if (Round === 0) {
                speed = 'BOOST';
            }

            return new Move(pod.diffAngle(target), speed === 'BOOST' ? 100 : speed as number, false, speed === 'BOOST');
        }
    }

    class Solution {

        public myMoves1: Array<Move> = [];
        public myMoves2: Array<Move> = [];
        public enemyMoves1: Array<Move> = [];
        public enemyMoves2: Array<Move> = [];
        public score: number;

        constructor() {
        }

        public static save(pods: Pod[]) {
            pods.forEach(pod => pod.save());
        }

        private static load(pods: Pod[]) {
            pods.forEach(pod => pod.load());
        }

        public GetNextTurn() {
            this.myMoves1.splice(0, 1);
            this.myMoves2.splice(0, 1);
          //  this.enemyMoves1.splice(0, 1);
          //  this.enemyMoves2.splice(0, 1);
            this.randomize();
        }

        public randomize() {
            Solution.load(Pods);

            for (let i = 0; i < this.myMoves1.length ; i++) {

                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
            //    EnemyPod1.apply(this.enemyMoves1[i]);
            //    EnemyPod2.apply(this.enemyMoves2[i]);

                this.play(Pods, CheckPoints);
            }

            for (let i = this.myMoves1.length; i < NB_MOVE ; i++) {

                const myMove1 = BasicIA.getMove(MyPod1);
                myMove1.mutate(0.01);
                this.myMoves1.push(myMove1);
                const myMove2 = BasicIA.getMove(MyPod2);
                myMove2.mutate(0.01);
                this.myMoves2.push(myMove2);
            /*    const enemyMove1 = BasicIA.getMove(EnemyPod1);
                enemyMove1.mutate(0.1);
                this.enemyMoves1.push(enemyMove1);
                const enemyMove2 = BasicIA.getMove(EnemyPod2);
                enemyMove2.mutate(0.1);
                this.enemyMoves2.push(enemyMove2);
*/
                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
            //    EnemyPod1.apply(this.enemyMoves1[i]);
            //    EnemyPod2.apply(this.enemyMoves2[i]);

                this.play(Pods, CheckPoints);
            }

            this.score = this.evaluation();

            Solution.load(Pods);
        }

        public basicIA() {
            Solution.load(Pods);

            for (let i = 0; i < this.myMoves1.length ; i++) {

                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
            //    EnemyPod1.apply(this.enemyMoves1[i]);
            //    EnemyPod2.apply(this.enemyMoves2[i]);

                this.play(Pods, CheckPoints);
            }

            for (let i = this.myMoves1.length; i < NB_MOVE ; i++) {

                this.myMoves1.push(BasicIA.getMove(MyPod1));
                this.myMoves2.push(BasicIA.getMove(MyPod2));
            //    this.enemyMoves1.push(BasicIA.getMove(EnemyPod1));
           //     this.enemyMoves2.push(BasicIA.getMove(EnemyPod2));

                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
            //    EnemyPod1.apply(this.enemyMoves1[i]);
            //    EnemyPod2.apply(this.enemyMoves2[i]);

                this.play(Pods, CheckPoints);
            }

            this.score = this.evaluation();

            Solution.load(Pods);
        }



        public play(pods: Pod[], checkpoints: Checkpoint[]) {
            let t = 0.0;
            let firstRun = true;
            for (let l = 0; l < NB_LOOP; l++) {
                while (t < 0.1) {

                    let firstCollision: Collision = null;

                    for (let i = 0; i < pods.length; ++i) {
                        for (let j = i + 1; j < pods.length; ++j) {
                            const colPod = pods[i].collision(pods[j]);

                            if ( colPod != null
                                && (firstRun || colPod.t > EPSILON)
                                && colPod.t + t < 1.0
                                && (firstCollision == null || colPod.t < firstCollision.t)) {
                                firstCollision = colPod;
                            }
                        }

                        const colCheck = pods[i].collision(checkpoints[pods[i].nextCheckPointId]);

                        if ( colCheck != null
                            && (firstRun || colCheck.t > EPSILON)
                            && colCheck.t + t < 1.0
                            && (firstCollision == null || colCheck.t < firstCollision.t)) {

                            firstCollision = colCheck;
                        }
                    }

                    if (firstCollision == null) {
                        for (let i = 0; i < pods.length; ++i) {
                            pods[i].move(1.0 - t);
                        }
                        t = 1.0;
                    } else {
                        for (let  i = 0; i < pods.length; ++i) {
                            pods[i].move(firstCollision.t);
                        }
                        t += firstCollision.t;

                        if (firstCollision.a.collision(firstCollision.b) != null) {
                            firstCollision.a.bounce(firstCollision.b);
                        }

                    }
                    firstRun = false;
                }
            }


            for (let  i = 0; i < pods.length; ++i) {
                pods[i].end();
            }
        }

        output() {
            MyPod1.output(this.myMoves1[0]);
            MyPod2.output(this.myMoves2[0]);
        }

        private evaluation(): number {
            let score = 0;
            if (MyPod1.timeout <= 0 && MyPod2.timeout <= 0) {
                return -Infinity;
            }
            if (EnemyPod1.timeout <= 0 && EnemyPod2.timeout <= 0) {
                return +Infinity;
            }

            const myRunner = MyPod1.score() >= MyPod2.score() ? MyPod1 : MyPod2;
            const myChasser = MyPod1.score() < MyPod2.score() ? MyPod1 : MyPod2;
            const hisRunner = EnemyPod1.score() > EnemyPod2.score() ? EnemyPod1 : EnemyPod2;


            score += myRunner.score() - hisRunner.score();
            score += myChasser.distance(hisRunner.checkpoint());
            score -= myChasser.diffAngle(hisRunner);

            return score;
        }

    }

    class Move {

        constructor( public angle: number,
                     public thrust: number,
                     public shield: boolean,
                     public boost: boolean) {
        }

        public mutate(amplitude: number) {
            let ramin = this.angle - 36.0 * amplitude;
            let ramax = this.angle + 36.0 * amplitude;

            if (ramin < -MAX_ANGLE) {
                ramin = -MAX_ANGLE;
            }

            if (ramax > MAX_ANGLE) {
                ramax = MAX_ANGLE;
            }

            this.angle = ramin + Math.random() * (ramax - ramin);

            if (!this.boost && Math.random() * 100 < SHIELD_PROB) {
                this.boost = true;
            } else {
                if (!this.shield && Math.random() * 100 < SHIELD_PROB) {
                    this.shield = true;
                } else {
                    let pmin = this.thrust - MAX_THRUST * amplitude;
                    let pmax = this.thrust + MAX_THRUST * amplitude;

                    if (pmin < 0) {
                        pmin = 0;
                    }

                    if (pmax > MAX_THRUST) {
                        pmax = MAX_THRUST;
                    }

                    this.thrust = pmin + Math.random() * (pmax - pmin);

                    this.shield = false;
                }
            }
        }
    }

    function readData() {
        Round++;

        const LineMyPod1 = readline().split(' ');
        const LineMyPod2 = readline().split(' ');
        const LineEnemyPod1 = readline().split(' ');
        const LineEnemyPod2 = readline().split(' ');

        MyPod1.x = parseInt(LineMyPod1[0], 10);
        MyPod1.y = parseInt(LineMyPod1[1], 10);
        MyPod1.vx = parseInt(LineMyPod1[2], 10);
        MyPod1.vy = parseInt(LineMyPod1[3], 10);
        MyPod1.angle = parseInt(LineMyPod1[4], 10);
        if (MyPod1.nextCheckPointId !== parseInt(LineMyPod1[5], 10)) {
            MyPod1.checked++;
            MyPod1.timeout = 100;
        }
        MyPod1.nextCheckPointId = parseInt(LineMyPod1[5], 10);

        MyPod2.x = parseInt(LineMyPod2[0], 10);
        MyPod2.y = parseInt(LineMyPod2[1], 10);
        MyPod2.vx = parseInt(LineMyPod2[2], 10);
        MyPod2.vy = parseInt(LineMyPod2[3], 10);
        MyPod2.angle = parseInt(LineMyPod2[4], 10);
        if (MyPod2.nextCheckPointId !== parseInt(LineMyPod2[5], 10)) {
            MyPod2.checked++;
            MyPod2.timeout = 100;
        }
        MyPod2.nextCheckPointId = parseInt(LineMyPod2[5], 10);

        EnemyPod1.x = parseInt(LineEnemyPod1[0], 10);
        EnemyPod1.y = parseInt(LineEnemyPod1[1], 10);
        EnemyPod1.vx = parseInt(LineEnemyPod1[2], 10);
        EnemyPod1.vy = parseInt(LineEnemyPod1[3], 10);
        EnemyPod1.angle = parseInt(LineEnemyPod1[4], 10);
        if (EnemyPod1.nextCheckPointId !== parseInt(LineEnemyPod1[5], 10)) {
            EnemyPod1.checked++;
            EnemyPod1.timeout = 100;
        }
        EnemyPod1.nextCheckPointId = parseInt(LineEnemyPod1[5], 10);

        EnemyPod2.x = parseInt(LineEnemyPod2[0], 10);
        EnemyPod2.y = parseInt(LineEnemyPod2[1], 10);
        EnemyPod2.vx = parseInt(LineEnemyPod2[2], 10);
        EnemyPod2.vy = parseInt(LineEnemyPod2[3], 10);
        EnemyPod2.angle = parseInt(LineEnemyPod2[4], 10);
        if (EnemyPod2.nextCheckPointId !== parseInt(LineEnemyPod2[5], 10)) {
            EnemyPod2.checked++;
            EnemyPod2.timeout = 100;
        }
        EnemyPod2.nextCheckPointId = parseInt(LineEnemyPod2[5], 10);

        Solution.save(Pods);
    }

    function InitialisationCheckpoint() {
        const N = parseInt(readline(), 10);
        for (let i = 0; i < N; i++) {
            const inputs = readline().split(' ');
            const nextCheckpointX = parseInt(inputs[0], 10);
            const nextCheckpointY = parseInt(inputs[1], 10);
            CheckPoints.push(new Checkpoint(nextCheckpointX, nextCheckpointY, CheckPoints.length));
        }

    }

    const MyPod1 = new Pod(0, 0, 0, 0, 0 , 100, null, false, true);
    const MyPod2 = new Pod(0, 0, 1, 0, 0 , 100, null, false, true);
    const EnemyPod1 = new Pod(0, 0, 2, 0, 0 , 100, null, false, true);
    const EnemyPod2 = new Pod(0, 0, 3, 0, 0 , 100, null, false, true);

    MyPod1.partner = MyPod2;
    MyPod2.partner = MyPod1;
    EnemyPod1.partner = EnemyPod2;
    EnemyPod2.partner = EnemyPod1;

    const CheckPoints: Array<Checkpoint> = [];
    const Pods = [MyPod1, MyPod2, EnemyPod1, EnemyPod2 ];
    const Solutions: Array<Solution> = [];

    const TotalLaps = parseInt(readline(), 10);
    let Round = -1;

    InitialisationCheckpoint();

    readData();
    let bestSolution: Solution = null;
    while (true) {
        Solutions.splice(0);

        let solution = new Solution();
        solution.basicIA();
        Solutions.push(solution);


        if (bestSolution !== null && Solutions.length < NB_SOLUTION) {
            bestSolution.GetNextTurn();
            Solutions.push(bestSolution);
        }

        for (let i = 1; i < NB_SOLUTION; i++) {
            solution = new Solution();
            solution.randomize();
            Solutions.push(solution);
        }

        Solutions.sort((a, b) => b.score - a.score);

        bestSolution = Solutions[0];
        bestSolution.output();

        readData();
    }
}

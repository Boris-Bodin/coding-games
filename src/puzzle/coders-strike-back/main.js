var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CodersStrikeBack;
(function (CodersStrikeBack) {
    var EPSILON = 0.00001;
    var NB_LOOP = 10;
    var NB_SOLUTION = 1;
    var NB_MOVE = 5;
    var SHIELD_PROB = 0;
    var RADIUS_CHECKPOINT = 600;
    var RADIUS_POD = 400;
    var MAX_ANGLE = 18;
    var MAX_THRUST = 100;
    var MIN_THRUST = 0;
    var BOOST_THRUST = 650;
    var FRICTION_THRUST = 0.85;
    var Collision = /** @class */ (function () {
        function Collision(a, b, t) {
            this.a = a;
            this.b = b;
            this.t = t;
        }
        return Collision;
    }());
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.distanceTo = function (p) {
            return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
        };
        Point.prototype.distance = function (p) {
            return Math.sqrt(this.distanceTo(p));
        };
        Point.prototype.closest = function (a, b) {
            var da = b.y - a.y;
            var db = a.x - b.x;
            var c1 = da * a.x + db * a.y;
            var c2 = -db * this.x + da * this.y;
            var det = da * da + db * db;
            var cx = 0;
            var cy = 0;
            if (det !== 0) {
                cx = (da * c1 - db * c2) / det;
                cy = (da * c2 + db * c1) / det;
            }
            else {
                cx = this.x;
                cy = this.y;
            }
            return new Point(cx, cy);
        };
        return Point;
    }());
    var Unit = /** @class */ (function (_super) {
        __extends(Unit, _super);
        function Unit(x, y, id, r, vx, vy) {
            var _this = _super.call(this, x, y) || this;
            _this.id = id;
            _this.r = r;
            _this.vx = vx;
            _this.vy = vy;
            _this.cache = [];
            return _this;
        }
        Unit.prototype.collision = function (u) {
            var dist = this.distanceTo(u);
            var sr = (this.r + u.r) * (this.r + u.r);
            if (dist < sr) {
                return new Collision(this, u, 0.0);
            }
            if (this.vx === u.vx && this.vy === u.vy) {
                return null;
            }
            var x = this.x - u.x;
            var y = this.y - u.y;
            var myp = new Point(x, y);
            var vx = this.vx - u.vx;
            var vy = this.vy - u.vy;
            var up = new Point(0, 0);
            var p = up.closest(myp, new Point(x + vx, y + vy));
            var pdist = up.distanceTo(p);
            var mypdist = myp.distanceTo(p);
            if (pdist < sr) {
                // Our speed on the line
                var length_1 = Math.sqrt(vx * vx + vy * vy);
                var backdist = Math.sqrt(sr - pdist);
                p.x = p.x - backdist * (vx / length_1);
                p.y = p.y - backdist * (vy / length_1);
                if (myp.distanceTo(p) > mypdist) {
                    return null;
                }
                pdist = p.distance(myp);
                if (pdist > length_1) {
                    return null;
                }
                var t = pdist / length_1;
                return new Collision(this, u, t);
            }
            return null;
        };
        Unit.prototype.bounce = function (u) {
            printErr('BOUNCE UNIT');
        };
        Unit.prototype.save = function () {
            this.cache[0] = this.x;
            this.cache[1] = this.y;
            this.cache[2] = this.vx;
            this.cache[3] = this.vy;
        };
        Unit.prototype.load = function () {
            this.x = this.cache[0];
            this.y = this.cache[1];
            this.vx = this.cache[2];
            this.vy = this.cache[3];
        };
        return Unit;
    }(Point));
    var Checkpoint = /** @class */ (function (_super) {
        __extends(Checkpoint, _super);
        function Checkpoint(x, y, id) {
            return _super.call(this, x, y, id, RADIUS_CHECKPOINT, 0, 0) || this;
        }
        return Checkpoint;
    }(Unit));
    var Pod = /** @class */ (function (_super) {
        __extends(Pod, _super);
        function Pod(x, y, id, angle, nextCheckPointId, timeout, partner, shieldAvailable, boostAvailable) {
            var _this = _super.call(this, x, y, id, RADIUS_POD, 0, 0) || this;
            _this.angle = angle;
            _this.nextCheckPointId = nextCheckPointId;
            _this.timeout = timeout;
            _this.partner = partner;
            _this.shieldAvailable = shieldAvailable;
            _this.boostAvailable = boostAvailable;
            return _this;
        }
        Pod.prototype.getAngle = function (p) {
            var d = this.distance(p);
            var dx = (p.x - this.x) / d;
            var dy = (p.y - this.y) / d;
            var a = Math.acos(dx) * 180.0 / Math.PI;
            if (dy < 0) {
                a = 360.0 - a;
            }
            return a;
        };
        Pod.prototype.diffAngle = function (p) {
            var a = this.getAngle(p);
            var right = this.angle <= a ? a - this.angle : 360.0 - this.angle + a;
            var left = this.angle >= a ? this.angle - a : this.angle + 360.0 - a;
            if (right < left) {
                return right;
            }
            else {
                return -left;
            }
        };
        Pod.prototype.rotate = function (p) {
            var a = this.diffAngle(p);
            if (a > MAX_ANGLE) {
                a = MAX_ANGLE;
            }
            else if (a < -MAX_ANGLE) {
                a = -MAX_ANGLE;
            }
            this.angle += a;
            if (this.angle >= 360.0) {
                this.angle = this.angle - 360.0;
            }
            else if (this.angle < 0.0) {
                this.angle += 360.0;
            }
        };
        Pod.prototype.boost = function (thrust) {
            var ra = this.angle * Math.PI / 180.0;
            if (this.counterShield > 0) {
                return;
            }
            if (this.booster) {
                this.vx += Math.cos(ra) * BOOST_THRUST;
                this.vy += Math.sin(ra) * BOOST_THRUST;
                this.booster = false;
            }
            else {
                this.vx += Math.cos(ra) * thrust;
                this.vy += Math.sin(ra) * thrust;
            }
        };
        Pod.prototype.move = function (t) {
            this.x += this.vx * t;
            this.y += this.vy * t;
        };
        Pod.prototype.end = function () {
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
        };
        Pod.prototype.play = function (p, thrust) {
            this.rotate(p);
            this.boost(thrust);
            this.move(1.0);
            this.end();
        };
        Pod.prototype.score = function () {
            return this.checked * 50000 - this.distance(this.checkpoint());
        };
        Pod.prototype.bounce = function (u) {
            if (u instanceof Checkpoint) {
                this.bounceWithCheckpoint(u);
            }
            else if (u instanceof Pod) {
                var m1 = this.shield ? 10 : 1;
                var m2 = u.shield ? 10 : 1;
                var mcoeff = (m1 + m2) / (m1 * m2);
                var nx = this.x - u.x;
                var ny = this.y - u.y;
                var nxnysquare = nx * nx + ny * ny;
                var dvx = this.vx - u.vx;
                var dvy = this.vy - u.vy;
                var product = nx * dvx + ny * dvy / (nxnysquare * mcoeff);
                var fx = nx * product;
                var fy = ny * product;
                // const m1_inv = 1.0 / m1;
                // const m2_inv = 1.0 / m2;
                var impulse = Math.sqrt(fx * fx + fy * fy);
                if (impulse < 120.0) {
                    var df = 120.0 / impulse;
                    fx *= df;
                    fy *= df;
                }
                this.vx -= fx / m1;
                this.vy -= fy / m1;
                u.vx += fx / m2;
                u.vy += fy / m2;
            }
        };
        Pod.prototype.activateShield = function () {
            this.shield = true;
            this.counterShield = 3;
            this.shieldAvailable = false;
        };
        Pod.prototype.output = function (move) {
            var a = this.angle + move.angle;
            if (a >= 360.0) {
                a = a - 360.0;
            }
            else if (a < 0.0) {
                a += 360.0;
            }
            a = a * Math.PI / 180.0;
            var px = this.x + Math.cos(a) * 10000.0;
            var py = this.y + Math.sin(a) * 10000.0;
            if (move.shield) {
                print([Math.round(px), Math.round(py), 'SHIELD'].join(' '));
            }
            else if (move.boost) {
                print([Math.round(px), Math.round(py), 'BOOST'].join(' '));
            }
            else {
                print([Math.round(px), Math.round(py), Math.round(move.thrust)].join(' '));
            }
        };
        Pod.prototype.bounceWithCheckpoint = function (checkpoint) {
        };
        Pod.prototype.checkpoint = function () {
            return CheckPoints[this.nextCheckPointId];
        };
        Pod.prototype.apply = function (move) {
            var a = this.angle + move.angle;
            if (a >= 360.0) {
                a = a - 360.0;
            }
            else if (a < 0.0) {
                a += 360.0;
            }
            a = a * Math.PI / 180.0;
            var px = this.x + Math.cos(a) * 10000.0;
            var py = this.y + Math.sin(a) * 10000.0;
            if (move.shield) {
                this.activateShield();
            }
            if (move.boost) {
                this.activateBoost();
            }
            this.rotate(new Point(Math.round(px), Math.round(py)));
            this.boost(move.thrust);
        };
        Pod.prototype.save = function () {
            _super.prototype.save.call(this);
            this.cache[4] = this.angle;
            this.cache[5] = this.shieldAvailable;
            this.cache[6] = this.boostAvailable;
            this.cache[7] = this.shield;
            this.cache[8] = this.booster;
            this.cache[9] = this.nextCheckPointId;
            this.cache[10] = this.timeout;
            this.cache[11] = this.counterShield;
        };
        Pod.prototype.load = function () {
            _super.prototype.load.call(this);
            this.angle = this.cache[4];
            this.shieldAvailable = this.cache[5];
            this.boostAvailable = this.cache[6];
            this.shield = this.cache[7];
            this.booster = this.cache[8];
            this.nextCheckPointId = this.cache[9];
            this.timeout = this.cache[10];
            this.counterShield = this.cache[11];
            this.checked = this.cache[12];
        };
        Pod.prototype.activateBoost = function () {
            this.booster = true;
            this.boostAvailable = false;
        };
        return Pod;
    }(Unit));
    var BasicIA = /** @class */ (function () {
        function BasicIA() {
        }
        BasicIA.getMove = function (pod) {
            var nextCheck = (pod.nextCheckPointId + 1 === CheckPoints.length)
                ? CheckPoints[0]
                : CheckPoints[pod.nextCheckPointId + 1];
            var m = (pod.checkpoint().y - nextCheck.y) / (pod.checkpoint().x - nextCheck.x);
            var b = pod.checkpoint().y - m * pod.checkpoint().x;
            var x1 = (pod.checkpoint().x + 350 / Math.sqrt(1 + m * m));
            var x2 = (pod.checkpoint().x - 350 / Math.sqrt(1 + m * m));
            var point1 = new Point(x1, m * x1 + b);
            var point2 = new Point(x2, m * x2 + b);
            var target = point2;
            if (nextCheck.distanceTo(point1) < nextCheck.distanceTo(point2)) {
                target = point1;
            }
            var distance = pod.distance(target);
            var angle = pod.diffAngle(target);
            var speed = 100;
            if (Math.abs(angle) >= 75) {
                speed = 0;
            }
            else if (Math.abs(angle) >= 50 && distance <= 2000) {
                speed = 40;
            }
            else if (Math.abs(angle) >= 25 && distance <= 2000) {
                speed = 80;
            }
            else if (distance > 5000 && pod.boostAvailable && Math.abs(angle) <= 2) {
                speed = 'BOOST';
            }
            else if (distance <= 1000) {
                speed = 40;
            }
            else if (distance <= 1500) {
                speed = 60;
            }
            else if (distance <= 1800) {
                speed = 80;
            }
            if (Round === 0) {
                speed = 'BOOST';
            }
            return new Move(pod.diffAngle(target), speed === 'BOOST' ? 100 : speed, false, speed === 'BOOST');
        };
        return BasicIA;
    }());
    var Solution = /** @class */ (function () {
        function Solution() {
            this.myMoves1 = [];
            this.myMoves2 = [];
            this.enemyMoves1 = [];
            this.enemyMoves2 = [];
        }
        Solution.save = function (pods) {
            pods.forEach(function (pod) { return pod.save(); });
        };
        Solution.load = function (pods) {
            pods.forEach(function (pod) { return pod.load(); });
        };
        Solution.prototype.GetNextTurn = function () {
            this.myMoves1.splice(0, 1);
            this.myMoves2.splice(0, 1);
            //  this.enemyMoves1.splice(0, 1);
            //  this.enemyMoves2.splice(0, 1);
            this.randomize();
        };
        Solution.prototype.randomize = function () {
            Solution.load(Pods);
            for (var i = 0; i < this.myMoves1.length; i++) {
                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
                //    EnemyPod1.apply(this.enemyMoves1[i]);
                //    EnemyPod2.apply(this.enemyMoves2[i]);
                this.play(Pods, CheckPoints);
            }
            for (var i = this.myMoves1.length; i < NB_MOVE; i++) {
                var myMove1 = BasicIA.getMove(MyPod1);
                myMove1.mutate(0.01);
                this.myMoves1.push(myMove1);
                var myMove2 = BasicIA.getMove(MyPod2);
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
        };
        Solution.prototype.basicIA = function () {
            Solution.load(Pods);
            for (var i = 0; i < this.myMoves1.length; i++) {
                MyPod1.apply(this.myMoves1[i]);
                MyPod2.apply(this.myMoves2[i]);
                //    EnemyPod1.apply(this.enemyMoves1[i]);
                //    EnemyPod2.apply(this.enemyMoves2[i]);
                this.play(Pods, CheckPoints);
            }
            for (var i = this.myMoves1.length; i < NB_MOVE; i++) {
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
        };
        Solution.prototype.play = function (pods, checkpoints) {
            var t = 0.0;
            var firstRun = true;
            for (var l = 0; l < NB_LOOP; l++) {
                while (t < 0.1) {
                    var firstCollision = null;
                    for (var i = 0; i < pods.length; ++i) {
                        for (var j = i + 1; j < pods.length; ++j) {
                            var colPod = pods[i].collision(pods[j]);
                            if (colPod != null
                                && (firstRun || colPod.t > EPSILON)
                                && colPod.t + t < 1.0
                                && (firstCollision == null || colPod.t < firstCollision.t)) {
                                firstCollision = colPod;
                            }
                        }
                        var colCheck = pods[i].collision(checkpoints[pods[i].nextCheckPointId]);
                        if (colCheck != null
                            && (firstRun || colCheck.t > EPSILON)
                            && colCheck.t + t < 1.0
                            && (firstCollision == null || colCheck.t < firstCollision.t)) {
                            firstCollision = colCheck;
                        }
                    }
                    if (firstCollision == null) {
                        for (var i = 0; i < pods.length; ++i) {
                            pods[i].move(1.0 - t);
                        }
                        t = 1.0;
                    }
                    else {
                        for (var i = 0; i < pods.length; ++i) {
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
            for (var i = 0; i < pods.length; ++i) {
                pods[i].end();
            }
        };
        Solution.prototype.output = function () {
            MyPod1.output(this.myMoves1[0]);
            MyPod2.output(this.myMoves2[0]);
        };
        Solution.prototype.evaluation = function () {
            var score = 0;
            if (MyPod1.timeout <= 0 && MyPod2.timeout <= 0) {
                return -Infinity;
            }
            if (EnemyPod1.timeout <= 0 && EnemyPod2.timeout <= 0) {
                return +Infinity;
            }
            var myRunner = MyPod1.score() >= MyPod2.score() ? MyPod1 : MyPod2;
            var myChasser = MyPod1.score() < MyPod2.score() ? MyPod1 : MyPod2;
            var hisRunner = EnemyPod1.score() > EnemyPod2.score() ? EnemyPod1 : EnemyPod2;
            score += myRunner.score() - hisRunner.score();
            score += myChasser.distance(hisRunner.checkpoint());
            score -= myChasser.diffAngle(hisRunner);
            return score;
        };
        return Solution;
    }());
    var Move = /** @class */ (function () {
        function Move(angle, thrust, shield, boost) {
            this.angle = angle;
            this.thrust = thrust;
            this.shield = shield;
            this.boost = boost;
        }
        Move.prototype.mutate = function (amplitude) {
            var ramin = this.angle - 36.0 * amplitude;
            var ramax = this.angle + 36.0 * amplitude;
            if (ramin < -MAX_ANGLE) {
                ramin = -MAX_ANGLE;
            }
            if (ramax > MAX_ANGLE) {
                ramax = MAX_ANGLE;
            }
            this.angle = ramin + Math.random() * (ramax - ramin);
            if (!this.boost && Math.random() * 100 < SHIELD_PROB) {
                this.boost = true;
            }
            else {
                if (!this.shield && Math.random() * 100 < SHIELD_PROB) {
                    this.shield = true;
                }
                else {
                    var pmin = this.thrust - MAX_THRUST * amplitude;
                    var pmax = this.thrust + MAX_THRUST * amplitude;
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
        };
        return Move;
    }());
    function readData() {
        Round++;
        var LineMyPod1 = readline().split(' ');
        var LineMyPod2 = readline().split(' ');
        var LineEnemyPod1 = readline().split(' ');
        var LineEnemyPod2 = readline().split(' ');
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
        var N = parseInt(readline(), 10);
        for (var i = 0; i < N; i++) {
            var inputs = readline().split(' ');
            var nextCheckpointX = parseInt(inputs[0], 10);
            var nextCheckpointY = parseInt(inputs[1], 10);
            CheckPoints.push(new Checkpoint(nextCheckpointX, nextCheckpointY, CheckPoints.length));
        }
    }
    var MyPod1 = new Pod(0, 0, 0, 0, 0, 100, null, false, true);
    var MyPod2 = new Pod(0, 0, 1, 0, 0, 100, null, false, true);
    var EnemyPod1 = new Pod(0, 0, 2, 0, 0, 100, null, false, true);
    var EnemyPod2 = new Pod(0, 0, 3, 0, 0, 100, null, false, true);
    MyPod1.partner = MyPod2;
    MyPod2.partner = MyPod1;
    EnemyPod1.partner = EnemyPod2;
    EnemyPod2.partner = EnemyPod1;
    var CheckPoints = [];
    var Pods = [MyPod1, MyPod2, EnemyPod1, EnemyPod2];
    var Solutions = [];
    var TotalLaps = parseInt(readline(), 10);
    var Round = -1;
    InitialisationCheckpoint();
    readData();
    var bestSolution = null;
    while (true) {
        Solutions.splice(0);
        var solution = new Solution();
        solution.basicIA();
        Solutions.push(solution);
        if (bestSolution !== null && Solutions.length < NB_SOLUTION) {
            bestSolution.GetNextTurn();
            Solutions.push(bestSolution);
        }
        for (var i = 1; i < NB_SOLUTION; i++) {
            solution = new Solution();
            solution.randomize();
            Solutions.push(solution);
        }
        Solutions.sort(function (a, b) { return b.score - a.score; });
        bestSolution = Solutions[0];
        bestSolution.output();
        readData();
    }
})(CodersStrikeBack || (CodersStrikeBack = {}));

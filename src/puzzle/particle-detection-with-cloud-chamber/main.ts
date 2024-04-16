declare function readline(): string;

type Point = {
    x: number;
    y: number;
}

type Particle = {
    masse: number;
    charge: number;
    symbol: string;
}

const C = 299792458;
const PARTICLES: Array<Particle> = [
    {masse: 0.511, charge: -1, symbol: 'e-'},
    {masse: 938, charge: +1, symbol: 'p+'},
    {masse: 3727, charge: +2, symbol: 'alpha'},
    {masse: 140, charge: +1, symbol: 'pi+'},
    {masse: 940, charge: 0, symbol: 'n0'},
];

const w: number = parseInt(readline()); // width of ASCII-art picture (one meter per column)
const h: number = parseInt(readline()); // height of ASCII-art picture (one meter per line)
const B: number = parseFloat(readline()); // strengh of magnetic field (tesla)
const V: number = parseFloat(readline()); // speed of the particle (speed-of-light unit)

const THRESHOLD_DISTANCE = Math.min(w / 6, h / 6);

function distanceABAndAC({x, y}: Point, firstPoint: Point , secondPoint: Point) {
    return Math.abs((x - firstPoint.x) + Math.abs(y - firstPoint.y)) + Math.abs((x - secondPoint.x) + Math.abs(y - secondPoint.y));
}

function findThreePointFromInput(): [Point, Point, Point] {

    let firstPoint;
    let secondPoint;
    let thirdPoint;

    for (let y = 0; y < h; y++) {
        const values: Array<string> = readline().split('');
        for (let x = 0; x < w; x++) {
            if (values[x] === ' ') {
                if (!firstPoint) {
                    firstPoint = {x, y};
                    continue;
                }
                if (!secondPoint) {
                    if (Math.abs((x + y) - (firstPoint.x + firstPoint.y)) > THRESHOLD_DISTANCE) {
                        secondPoint = {x, y};
                    }
                } else {
                    if (!thirdPoint) {
                        thirdPoint = {x, y};
                    } else if (distanceABAndAC({x, y}, firstPoint, secondPoint) > distanceABAndAC(thirdPoint, firstPoint, secondPoint)) {
                        thirdPoint = {x, y};
                    }
                }

            }
        }
    }
    return [firstPoint, secondPoint, thirdPoint];
}

function gamma(v: number) {
    return 1 / Math.sqrt(1 - v * v);
}


function radiusOf(particle: any) {
    return 1e6 * gamma(V) * particle.masse * V / (Math.abs(particle.charge) * B * C);
}

function computeRadius({x: x1, y: y1}: Point, {x: x2, y: y2}: Point, {x: x3, y: y3}: Point) {
    const dx2 = x2 - x1;
    const dy2 = y2 - y1;

    const dx3 = x3 - x1;
    const dy3 = y3 - y1;

    const comp1 = (dx2^2 * dy3 - dx3^2 * dy2 + dy2^2 * dy3 - dy3^2 * dy2) / (2 * (dx2 * dy3 - dx3 * dy2));
    const comp2 = (dx2^2 * dx3 - dx3^2 * dx2 + dy2^2 * dx3 - dy3^2 * dx2) / (2 * (dx3 * dy2 - dx2 * dy3));

    return Math.sqrt(Math.pow(comp1, 2) + Math.pow(comp2, 2));
}

function findParticle(ASCIIRadius: number) {
    let particleFound;
    for (let particle of PARTICLES) {
        if (particle.charge === 0 && (Number.isNaN(ASCIIRadius) || ASCIIRadius == Infinity)) {
            particleFound = particle;
            break;
        }
        const computedRadius = radiusOf(particle);
        const ratio = Math.abs(computedRadius - ASCIIRadius) / computedRadius;
        if (ratio < 0.5) {
            particleFound = particle;
            break;
        }
    }
    return particleFound;
}

const [firstPoint, secondPoint, thirdPoint]: [Point, Point, Point] = findThreePointFromInput();
const ASCIIRadius = computeRadius(firstPoint, secondPoint, thirdPoint);

let particleFound = findParticle(ASCIIRadius);

if (particleFound) {
    if (particleFound.charge === 0) {
        console.log(particleFound.symbol + ' inf');
    } else {
        console.log(particleFound.symbol + ' ' + Math.round(radiusOf(particleFound)));
    }
} else {
    console.log('I just won the Nobel prize in physics !');
}

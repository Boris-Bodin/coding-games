declare function readline(): string;

declare interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U[]): U[];

    find(predicate: (value: T, index: number, obj: T[]) => boolean): T | null;

    includes(searchElement: T, fromIndex?: number): boolean;
}

declare interface Iterable<T> {
}

declare interface Set<T> extends Iterable<T> {
    constructor(args?: Array<T>);
}

const NB_GUESS: number = parseInt(readline());

type NumberList = Array<number>;
type GuessSlot = { value: number, index: number };
type Guess = {
    answer: Array<GuessSlot>,
    nbGoodPlacement: number,
    nbBadPlacement: number
};

function readGuess(): Array<Guess> {
    const allGuess: Array<Guess> = [];
    for (let i = 0; i < NB_GUESS; i++) {
        const inputs = readline().split(" ");
        allGuess.push({
            answer: inputs[0].split("").map((value, index) => ({ value: parseInt(value), index })),
            nbGoodPlacement: parseInt(inputs[1]),
            nbBadPlacement: parseInt(inputs[2])
        });
    }
    return allGuess;
}

function findPossibleNumbers(guesses: Array<Guess>): NumberList {
    const excludeNumbers: NumberList = [];
    let onlyNumbers: NumberList = [];
    guesses.forEach(guess => {
        if (guess.nbGoodPlacement + guess.nbBadPlacement === 4) {
            onlyNumbers = guess.answer.map(value => value.value);
        }
        if (guess.nbGoodPlacement + guess.nbBadPlacement === 0) {
            guess.answer.forEach(value => {
                if (!excludeNumbers.includes(value.value)) {
                    excludeNumbers.push(value.value);
                }
            });
        }
    });
    const possibleNumbers: NumberList = onlyNumbers;
    if (possibleNumbers.length === 0) {
        for (let i = 0; i < 10; i++) {
            if (!excludeNumbers.includes(i)) {
                possibleNumbers.push(i);
            }
        }
    }
    // @ts-ignore
    return Array.from(new Set(possibleNumbers));
}

function findSolution(guesses: Array<Guess>): NumberList {
    const possibleNumbers = findPossibleNumbers(guesses);
    console.error("Possible Numbers: ", possibleNumbers);

    const possibleSolutions: Array<NumberList> = [];
    for (const i of possibleNumbers) {
        for (const j of possibleNumbers) {
            for (const k of possibleNumbers) {
                for (const l of possibleNumbers) {
                    const solution = [i, j, k, l];
                    if (guesses.every(guess => {
                        const nbGoodPlacement = guess.answer.filter((value, index) => value.value === solution[index]).length;
                        const nbBadPlacement = guess.answer.filter((value, index) => {
                            const solutionCount = solution.filter(solValue => solValue === value.value).length;
                            const guessCount = guess.answer.filter(guessValue => guessValue.value === value.value).length;
                            return solution.includes(value.value) && value.value !== solution[index] && guessCount <= solutionCount;
                        }).length;
                        return nbGoodPlacement === guess.nbGoodPlacement && nbBadPlacement === guess.nbBadPlacement;
                    })) {
                        possibleSolutions.push(solution);
                    }
                }
            }
        }
    }

    console.error("PS: ", possibleSolutions);
    return possibleSolutions[0];
}

console.log(findSolution(readGuess()).join(""));

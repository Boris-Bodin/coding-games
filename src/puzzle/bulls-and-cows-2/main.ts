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

const GUESS_SIZE: number = parseInt(readline());
const ALL_DIGITS: NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

type NumberList = Array<number>;
type GuessSlot = number;
type Guess = {
    answer: Array<GuessSlot>,
    nbGoodPlacement: number,
    nbBadPlacement: number
};

function readGuess(guessed: NumberList): Guess {
    const inputs = readline().split(" ");
    return {
        answer: guessed,
        nbGoodPlacement: parseInt(inputs[0]),
        nbBadPlacement: parseInt(inputs[1])
    };
}

function findPossibleNumbers(guesses: Array<Guess>): NumberList {
    const excludeNumbers: NumberList = [];
    let onlyNumbers: NumberList = [];
    guesses.forEach(guess => {
        if (guess.nbGoodPlacement + guess.nbBadPlacement === GUESS_SIZE) {
            onlyNumbers = [...guess.answer];
        }
        if (guess.nbGoodPlacement + guess.nbBadPlacement === 0) {
            guess.answer.forEach(value => {
                if (!excludeNumbers.includes(value)) {
                    excludeNumbers.push(value);
                }
            });
        }
    });
    const possibleNumbers: NumberList = onlyNumbers;
    if (possibleNumbers.length === 0) {
        for (let i = 0; i < ALL_DIGITS.length; i++) {
            if (!excludeNumbers.includes(i)) {
                possibleNumbers.push(i);
            }
        }
    }
    // @ts-ignore
    return Array.from(new Set(possibleNumbers));
}

let memo: { [key:string]:Array<NumberList>} = {};

function generateAllSolution(possibleNumbers: NumberList, solutionLength: number): Array<NumberList> {
    let result: Array<NumberList> = [];

    if (solutionLength === 1) {
        for (let num of possibleNumbers) {
            result.push([num]);
        }
        if (GUESS_SIZE === solutionLength) {
            return result.filter(value => value[0] !== 0);
        }
        return result;
    }

    for (let i = 0; i < possibleNumbers.length; i++) {
        let num = possibleNumbers[i];
        if(num === 0 && solutionLength === GUESS_SIZE) {
            continue;
        }

        // Exclude the current number from the remaining numbers
        let remainingNumbers = possibleNumbers.slice(0, i).concat(possibleNumbers.slice(i + 1));

        // Generate all permutations of the remaining numbers
        let remainingPermutations: Array<NumberList> = [];
        let key = remainingNumbers.toString() + "," + (solutionLength - 1).toString();
        if (memo[key]) {
            remainingPermutations = memo[key];
        } else {
            remainingPermutations = generateAllSolution(remainingNumbers, solutionLength - 1);
            memo[key] = remainingPermutations;
        }

        // Add the current number to the front of each permutation of the remaining numbers
        for (let perm of remainingPermutations) {
            result.push([num].concat(perm));
        }
    }
    return result;
}

function filterSolutions(solutions: Array<NumberList>, possibleNumbers: NumberList, guess: Guess): Array<NumberList> {
    return solutions.filter((solution, index, array) => {

        for (let i = 0; i < solution.length; i++) {
            if (!possibleNumbers.includes(solution[i])) {
                return false;
            }
        }
        return [guess].every(guess => {
            let nbGoodPlacement = 0;
            let nbBadPlacement = 0;

            for (let i = 0; i < solution.length; i++) {
                if (solution[i] === guess.answer[i]) {
                    nbGoodPlacement++;
                } else if (guess.answer.includes(solution[i])) {
                    nbBadPlacement++;
                }
            }

            return nbGoodPlacement === guess.nbGoodPlacement && nbBadPlacement === guess.nbBadPlacement;
        })
    });
}

function makeFirstGuess(): NumberList {
    readline();
    let firstGuess: string = "";
    for (let i = 0; i < GUESS_SIZE; i++) {
        firstGuess += ALL_DIGITS[i];
    }
    console.log(firstGuess);
    return firstGuess.split("").map(value => parseInt(value));
}

let allPossibleSolution: Array<NumberList> = generateAllSolution(ALL_DIGITS, GUESS_SIZE);

let guessed: NumberList = makeFirstGuess();

let allGuess: Array<Guess> = [];

while (1) {

    const lastGuess = readGuess(guessed);
    allGuess.push(lastGuess);

    const possibleNumbers: NumberList = findPossibleNumbers(allGuess);
    console.error("Possible Numbers: ", possibleNumbers);

    allPossibleSolution = filterSolutions(allPossibleSolution, possibleNumbers, lastGuess);
    guessed = allPossibleSolution[0];
    console.log(guessed.join(""));
}

declare function readline(): string;

const PIG_WORD = 'PIGS';
const FLY_WORD = 'FLY';

type WORD = string;
type OBJECT = WORD;
type TRAIT = WORD;
type ABILITY = WORD;
type VERB = 'are' | 'have' | 'can';


class Objects {
    public object: OBJECT;
    public traits: TRAIT[] = [];
    public abilities: ABILITY[] = [];
}

// The statement
// STATEMENT ::= OBJECTS (are OBJECT | have TRAIT | can ABILITY) | TRAIT are TRAIT
// OBJECTS ::= OBJECT [with TRAIT [and TRAIT]*] [that can ABILITY [and ABILITY]*]
// OBJECT ::= WORD
// TRAIT ::= WORD
// ABILITY ::= WORD
class Statement {

    public left: Objects | TRAIT;
    public right: OBJECT | TRAIT | ABILITY;
    public verb: VERB;

    constructor(public statement: string) {
        this.parse();
    }

    private parse() {
        const words: string[] = this.statement.split(' ');
        const areIndex: number = words.indexOf(' are ');
        const haveIndex: number = words.indexOf(' have ');
        const canIndex: number = words.indexOf(' can ');

    }
}

const N: number = parseInt(readline(), 10);
for (let i = 0; i < N; i++) {
    const statement: Statement = new Statement(readline());
}

console.log('All|Some|No  pigs can fly');

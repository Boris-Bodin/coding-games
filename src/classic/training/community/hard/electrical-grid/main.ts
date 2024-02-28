let inputs = readline().split(' ');
const N = parseInt(inputs[0], 10);
const M = parseInt(inputs[1], 10);

const Links = {};
let MaxCost = 0;
let ResLinks = [];
let OriginalLink = [];

for (let i = 0; i < M; i++) {
    inputs = readline().split(' ');
    const house1 = parseInt(inputs[0], 10);
    const house2 = parseInt(inputs[1], 10);
    const cost = parseInt(inputs[2], 10);
    Links[house1] = (Links[house1] || {});
    Links[house1][house2] = cost;
    if (cost > MaxCost) {
        MaxCost = cost;
    }
    let link = {
        house1: house1,
        house2: house2,
        cost: cost
    };
    OriginalLink.push(link);
    ResLinks.push(link);
   // if (house1 !== 1) {
        ResLinks.push({
                          house1: house2,
                          house2: house1,
                          cost: cost
                      });
   // }
}

let hasChange = true;

while (hasChange) {
    hasChange = false;
    for (let i = 2; i < N + 1; i++) {
        const links = ResLinks.filter(x => x.house2 === i).sort((a, b) => a.cost - b.cost);
        if (links.length > 1) {
            const lastLink = links[links.length - 1];
            const otherLink = links.slice(0, links.length - 1);
            hasChange = true;
            if (lastLink.house1 !== 1
                && otherLink.some(x => x.house1 === 1 || ResLinks.some(y => y.house2 === x.house1 && y.house1 !== x.house2))) {
                ResLinks.splice(ResLinks.indexOf(lastLink), 1);
            } else {
                otherLink.forEach(x => ResLinks.splice(ResLinks.indexOf(x), 1));
            }
        }
    }
}

ResLinks.forEach(x => {
    if (OriginalLink.some(y => x.house1 === y.house2 && x.house2 === y.house1)) {
        const tmp = x.house2;
        x.house2 = x.house1;
        x.house1 = tmp;
    }
});

hasChange = true;
while (hasChange) {
    hasChange = false;
    for (let i = 0; i < ResLinks.length; i++) {
        if (ResLinks.slice(i + 1).filter(x => ResLinks[i].house1 === x.house1 && ResLinks[i].house2 === x.house2).length > 0) {
            ResLinks.splice(i , 1);
            hasChange = true;
            break;
        }
    }

}
let costAll = 0;
ResLinks.forEach(x => {
    costAll += x.cost;
});

print(`${ResLinks.length} ${costAll}`);
ResLinks.sort((a, b) => (a.house1 * N + a.house2) - (b.house1 * N + b.house2)).forEach((x) => {
    print(`${x.house1} ${x.house2} ${x.cost}`);
});

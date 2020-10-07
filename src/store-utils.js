const getIndex = (a,id) => a.find(xx => xx.id == id).index;

function move(a, curr, dest) {
    a.forEach(xx => {
        if (xx.index == dest) {
            xx.index = curr;
        } else if (xx.index == curr) {
            xx.index = dest;
        }
    });
}

export function moveIndexLeft(a, id) {
    const curr = getIndex(a, id);
    const dest = curr - 1 < 0 ? curr : curr - 1;
    move(a, curr, dest);
}

export function moveIndexRight(a, id) {
    const curr = getIndex(a, id);
    const dest = curr + 1 > a.length - 1 ? curr : curr + 1;
    move(a, curr, dest);
}

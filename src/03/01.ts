import * as fs from 'fs';

const getPriorityValue = (value: string | undefined) => {
    if (!value) return 0;

    const asciiValue = value.charCodeAt(0);

    //a: 97 -> needs to be 1
    if (value === value.toLowerCase()) {
        return asciiValue - 96;
    }

    //A: 65 -> needs to be 27
    return asciiValue - 38;
};

try {
    const filename = `${__dirname}/input.txt`;
    const backpacks = fs.readFileSync(filename, 'utf-8');
    const backpackList = backpacks.split('\n');

    let prioritySum = 0;

    for (let index = 0; index < backpackList.length; index++) {
        const backpack = backpackList[index].trim();
        const division = Math.ceil(backpack.length / 2);
        const firstCompartment = backpack.substring(0, division);
        const secondCompartment = backpack.substring(division, backpack.length);

        const firstLetters = firstCompartment.split('');
        const priority = firstLetters.find((letter) => secondCompartment.includes(letter));

        const value = getPriorityValue(priority);
        prioritySum += value;

        console.log(
            `${backpack.length}: ${firstCompartment}  (${firstCompartment.length})||||(${
                secondCompartment.length
            })  ${secondCompartment} [${priority ?? 'NOPRIORITY'}][${value}]`
        );
    }

    console.log(`Total priority: ${prioritySum}`);
} catch (ex) {
    console.error('❌ uh oh');
    console.log(ex);
}

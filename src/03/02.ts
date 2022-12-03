import * as fs from 'fs';

function processBackpacks(backpackList: Array<string>) {
    const [first, second, third] = backpackList;
    const firstLetters = first.trim().split('');

    const firstSecondMatches = firstLetters.filter((letter) => second.includes(letter));
    if (!firstSecondMatches) return 0;

    const priority = firstSecondMatches.find((letter) => third.includes(letter));

    const value = getPriorityValue(priority);

    console.log(`${priority}: [${value}]`);

    return value;
}

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

    for (let index = 0; index < backpackList.length / 3; index++) {
        const lowerRange = index * 3;
        const upperRange = index * 3 + 3;

        const section = backpackList.slice(lowerRange, upperRange);

        const value = processBackpacks(section);

        prioritySum += value;
    }

    console.log(`Total priority: ${prioritySum}`);
} catch (ex) {
    console.error('❌ uh oh');
    console.log(ex);
}

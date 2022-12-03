import * as fs from 'fs';

//Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
try {
    const filename = `${__dirname}/input.txt`;
    const calories = fs.readFileSync(filename, 'utf-8');
    const elfList = calories.split('\n\n');

    let max = 0;

    for (let index = 0; index < elfList.length; index++) {
        const elf = elfList[index];

        const elfItems = elf.split('\n');
        const cals = elfItems.reduce((prev, item) => prev + Number(item), 0);

        if (cals > max) {
            max = cals;
        }
    }

    console.log(`Max calories: ${max}`);
} catch (ex) {
    console.error('❌ uh oh');
    console.error(ex);
}

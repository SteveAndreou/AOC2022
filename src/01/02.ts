import * as fs from 'fs';

//Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
try {
    const filename = `${__dirname}/input.txt`;
    const calories = fs.readFileSync(filename, 'utf-8');
    const elfList = calories.split('\n\n');

    let calorieList = [0, 0, 0];
    let smallest = 0;

    for (let index = 0; index < elfList.length; index++) {
        const elf = elfList[index];

        const elfItems = elf.split('\n');
        const cals = elfItems.reduce((prev, item) => prev + Number(item), 0);

        if (cals > smallest) {
            const smallestIndex = calorieList.indexOf(smallest);
            calorieList.splice(smallestIndex, 1, cals);

            //recalulate smallest
            smallest = Math.min(...calorieList);
        }
    }

    const total = calorieList.reduce((prev, next) => prev + next, 0);

    console.log(`Top 3 calories: ${calorieList}`);
    console.log(`Total calories: ${total}`);
} catch (ex) {
    console.error('❌ uh oh');
    console.error(ex);
}

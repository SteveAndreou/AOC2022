type RPS = 'Rock' | 'Paper' | 'Scissors';
type MyChoices = 'X' | 'Y' | 'Z';
type TheirChoices = 'A' | 'B' | 'C';

//A for Rock, B for Paper, and C for Scissors
const Opponent: { [K in TheirChoices]: RPS } = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
};

// X for Rock, Y for Paper, and Z for Scissors
const Me: { [K in MyChoices]: RPS } = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors',
};

const ScoreValue = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
};

const win = 6;
const draw = 3;
const loss = 0;

const outcomeValue = (me: RPS, opp: RPS): number => {
    if (me === opp) return draw;

    if (me === 'Rock') {
        if (opp === 'Paper') return loss;
        return win;
    }

    if (me === 'Paper') {
        if (opp === 'Scissors') return loss;
        return win;
    }

    if (me === 'Scissors') {
        if (opp === 'Rock') return loss;
        return win;
    }

    return loss;
};

const selectionValue = (me: RPS): number => {
    return ScoreValue[me];
};

/*
The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
*/

/*
In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.

In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).
*/

import * as fs from 'fs';

//What would your total score be if everything goes exactly according to your strategy guide?
try {
    const filename = `${__dirname}/input.txt`;
    const games = fs.readFileSync(filename, 'utf-8');
    const gameList = games.split('\n');

    let totalScore = 0;
    const permutation = new Map<string, number>();

    for (let index = 0; index < gameList.length; index++) {
        const game = gameList[index];

        let value = permutation.get(game);

        if (!value) {
            const [opp, me] = game.trim().split(' ');

            const myChoice = me as MyChoices;
            const theirChoice = opp as TheirChoices;

            const myRPS = Me[myChoice];
            const theirRPS = Opponent[theirChoice];

            const gameValue = outcomeValue(myRPS, theirRPS);
            const choiceValue = selectionValue(myRPS);

            value = gameValue + choiceValue;

            permutation.set(game, value);
        }

        totalScore += value;
    }

    console.log(`Total score ${totalScore}`);
} catch (ex) {
    console.error('❌ uh oh');
    console.error(ex);
}

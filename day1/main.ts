import * as fs from 'fs';
import * as path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');

const list1 = [];
const list2 = [];

rawInput
    .trim()
    .split('\n')
    .forEach(inputRow => {
        const [item1, item2] = inputRow.split('   ');
        list1.push(Number(item1));
        list2.push(Number(item2));
    });

list1.sort();
list2.sort();

const listDifferences = [];
for (let i = 0; i < list1.length; ++i) {
    const difference = Math.abs(list1[i] - list2[i]);
    listDifferences.push(difference);
}

const difference = listDifferences.reduce((x, y) => x + y);

console.log('List difference:', difference);

let similarityScore = 0;
list1.forEach(item => {
    const occurrencesInOtherList = list2.filter(x => x === item).length;
    similarityScore += item * occurrencesInOtherList;
});

console.log('List similarity score: ', similarityScore);

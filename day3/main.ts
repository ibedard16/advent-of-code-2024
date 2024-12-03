import * as fs from 'fs';
import * as path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').trim();

const regex = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g);

const multiplyInstructions = Array.from(rawInput.matchAll(regex));

const products = multiplyInstructions.map(([match, x, y]) => Number(x) * Number(y));
const sum = products.reduce((x, y) => x + y);

console.log('Sum of products:', sum);

const newRegex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
const instructions = Array.from(rawInput.matchAll(newRegex));

let multiplicationEnabled = true;
let newSum = 0;
instructions.forEach(([match, x, y]) => {
    if (match === 'do()') {
        multiplicationEnabled = true;
        return;
    }
    
    if (match === 'don\'t()') {
        multiplicationEnabled = false;
        return;
    }
    
    if (multiplicationEnabled) {
        newSum += Number(x) * Number(y);
    }
});

console.log('new sum:', newSum);

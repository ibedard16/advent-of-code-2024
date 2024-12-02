import * as fs from 'fs';
import * as path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').trim();

const reports: number[][] = rawInput.split('\n')
    .map(report => report.split(' ').map(Number));
    
const isSequenceValid = (sequence: number[]) => {
    const isIncreasing = sequence[0] < sequence[1];
    
    for (let index = 1; index < sequence.length; ++index) {
        const item = sequence[index];
        const previousItem = sequence[index - 1];
        const change = item - previousItem;
        
        if (change === 0) {
            return false;
        }
        
        if (isIncreasing && change < 0) {
            return false;
        }
        
        if (!isIncreasing && change > 0) {
            return false;
        }
        
        if (Math.abs(change) > 3) {
            return false;
        }
    };
    
    return true;
}
    
const safeReports = reports.map(isSequenceValid);

const safeReportCount = safeReports.filter(item => item).length;
console.log('Number of safe reports:', safeReportCount);

const trueSafeReports = reports.map(report => {
    if (isSequenceValid(report) === true) {
        return true;
    }
    
    for (let indexToRemove = 0; indexToRemove < report.length; ++indexToRemove) {
        const reportCopy = [...report];
        reportCopy.splice(indexToRemove, 1);
        if (isSequenceValid(reportCopy) === true) {
            return true;
        }
    }
});

const trueSafeReportCount = trueSafeReports.filter(item => item).length;
console.log('True number of safe reports:', trueSafeReportCount);
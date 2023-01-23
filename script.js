'use strict';

let firstNum = '';
let secondNum = '';
let operator = ''; // To keep track of the current operator
let exprDisplay = ''; // To keep track of the entered numbers and operators on display
let oprPattern = /[+-^x/]/g; // to find the first operator from the string

const showExp = document.querySelector('.display-expression');
const showResult = document.querySelector('.display-result');
const keyClearEl = document.querySelector('.key-clear');
const keyDelEl = document.querySelector('.key-del');
const keyEqualEl = document.querySelector('.key-equal');
const keySignEl = document.querySelector('.key-sign');
const keyDecEl = document.querySelector('.key-dec');
const keySqrtEl = document.querySelector('.key-sqrt');

const operate = (a, b, op) => op(+a, +b);
const addFn = (a, b) => a + b;
const subFn = (a, b) => a - b;
const multiplyFn = (a, b) => a * b;
const divideFn = (a, b) => a / b;
const expFn = (a, b) => a ** b;
const sqrtFn = (a) => Math.sqrt(+a);
const changeSignFn = (a) => +a * -1;
const toggleEnabling = function () {
    op2El.forEach((el) => {
        el.disabled = !el.disabled;
    });
};

// Math Operators that accept two operands (+, - , * , /, ^)
const op2El = document.querySelectorAll('.op2');
op2El.forEach((op2) => {
    op2.addEventListener('click', () => {
        operator = op2.value;
        keySqrtEl.disabled = false; // to allow using square root every after an operator is pressed
        // Check if firstNum is given or not
        if (firstNum && !secondNum) {
            showResult.textContent = firstNum;
            // Check if first num has square root symbol
            if (firstNum.toString().includes('√')) {
                let initialSqrtVal = firstNum;
                firstNum = sqrtFn(firstNum.split(' ').slice(-1)[0]);
                exprDisplay += `${initialSqrtVal} ${operator} `;
                showResult.textContent = firstNum;
            } else if (
                firstNum.toString().includes('√') === false &&
                exprDisplay === ''
            ) {
                exprDisplay += `${firstNum} ${operator} `;
            } else if (exprDisplay.includes('=')) {
                exprDisplay += ` ${firstNum} ${operator} `;
            } else if (
                exprDisplay.trim().slice(-1).match(oprPattern) !== null // This is when user wants to change the current operator
            ) {
                let updatedExprDisplay = `${exprDisplay
                    .trim()
                    .slice(0, -1)}  ${operator} `;
                exprDisplay = updatedExprDisplay;
            }
            showExp.textContent = exprDisplay;
        } else if (firstNum && secondNum) {
            // Check if second num has square root
            if (secondNum.toString().includes('√')) {
                let initialSqrtVal = secondNum; // To still show the square root val
                secondNum = sqrtFn(secondNum.split(' ').slice(-1)[0]);
                exprDisplay += `${initialSqrtVal} ${operator} `;
                showExp.textContent = exprDisplay;
                // Now operate the first two operands with the first operator
                let firstOperator = exprDisplay
                    .trim()
                    .split(' ')
                    .slice(1, 2)[0];
                // Check what operator and the result is kept to first num in order to track the current result of all operations applied
                if (firstOperator === '+') {
                    firstNum = operate(firstNum, secondNum, addFn);
                } else if (firstOperator === '-') {
                    firstNum = operate(firstNum, secondNum, subFn);
                } else if (firstOperator === '^') {
                    firstNum = operate(firstNum, secondNum, expFn);
                } else if (firstOperator === 'x') {
                    firstNum = operate(firstNum, secondNum, multiplyFn);
                } else if (firstOperator === '/') {
                    firstNum = operate(firstNum, secondNum, divideFn);
                }
                showResult.textContent = firstNum;
                secondNum = '';
            } else if (secondNum.includes('√') === false) {
                // Always operate the first operation first, do it by extracting the last operator from the expression
                let firstOperator = exprDisplay.trim().split('').slice(-1)[0];
                if (firstOperator === '+') {
                    firstNum = operate(firstNum, secondNum, addFn);
                } else if (firstOperator === '-') {
                    firstNum = operate(firstNum, secondNum, subFn);
                } else if (firstOperator === '^') {
                    firstNum = operate(firstNum, secondNum, expFn);
                } else if (firstOperator === 'x') {
                    firstNum = operate(firstNum, secondNum, multiplyFn);
                } else if (firstOperator === '/') {
                    firstNum = operate(firstNum, secondNum, divideFn);
                }
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                secondNum = '';
            }
        }
    });
});

// Equals operator
keyEqualEl.addEventListener('click', function () {
    if (firstNum && firstNum.toString().includes('√')) {
        firstNum = sqrtFn(firstNum.split(' ').slice(-1)[0]);
        showResult.textContent = firstNum;
    }

    if (firstNum && secondNum) {
        if (secondNum.toString().includes('√')) {
            let initialSqrtVal = secondNum;
            secondNum = sqrtFn(secondNum.split(' ').slice(-1)[0]);
            if (operator === '+') {
                firstNum = operate(firstNum, secondNum, addFn);
            } else if (operator === '-') {
                firstNum = operate(firstNum, secondNum, subFn);
            } else if (operator === '^') {
                firstNum = operate(firstNum, secondNum, expFn);
            } else if (operator === 'x') {
                firstNum = operate(firstNum, secondNum, multiplyFn);
            } else if (operator === '/') {
                firstNum = operate(firstNum, secondNum, divideFn);
            }
            showResult.textContent = firstNum;
            exprDisplay += `${initialSqrtVal} =`;
            showExp.textContent = exprDisplay;
            secondNum = '';
        } else if (secondNum.toString().includes('√') == false) {
            if (operator === '+') {
                firstNum = operate(firstNum, secondNum, addFn);
            } else if (operator === '-') {
                firstNum = operate(firstNum, secondNum, subFn);
            } else if (operator === '^') {
                firstNum = operate(firstNum, secondNum, expFn);
            } else if (operator === 'x') {
                firstNum = operate(firstNum, secondNum, multiplyFn);
            } else if (operator === '/') {
                firstNum = operate(firstNum, secondNum, divideFn);
            }
            showResult.textContent = firstNum;
            exprDisplay += `${secondNum} =`;
            showExp.textContent = exprDisplay;
            secondNum = '';
            console.log(exprDisplay);
        }
    }
    keySqrtEl.disabled = true; // to disallow having a number followed by square root
});

// Square root
keySqrtEl.addEventListener('click', function () {
    if (operator) {
        secondNum = `√ `;
        toggleEnabling();
        showResult.textContent = secondNum;
    } else {
        firstNum = `√ `;
        toggleEnabling();
        showResult.textContent = firstNum;
    }
    toggleEnabling();
});

// Decimal point
keyDecEl.addEventListener('click', function () {
    if (operator) {
        if (secondNum.toString().includes('.') === false) {
            secondNum += `.`;
            showResult.textContent = secondNum;
        }
    } else {
        if (firstNum.toString().includes('.') === false) {
            firstNum += `.`;
            showResult.textContent = firstNum;
        }
    }
});

// Math.sign
keySignEl.addEventListener('click', function () {
    if (operator) {
        secondNum = changeSignFn(secondNum);
        showResult.textContent = secondNum;
    } else {
        firstNum = changeSignFn(firstNum);
        showResult.textContent = firstNum;
    }
});

// Get all the number keys and  event listener
const keys = document.querySelectorAll('.key-num');
keys.forEach((numKey) => {
    toggleEnabling();
    numKey.addEventListener('click', () => {
        // check if operator is given, if so, set the number to secondNum
        if (operator) {
            secondNum += numKey.value;
            showResult.textContent = secondNum;
        } else {
            firstNum += numKey.value;
            showResult.textContent = firstNum;
        }
    });
    toggleEnabling();
});

// Deleting one digit or erasing a digit
keyDelEl.addEventListener('click', function () {
    if (operator) {
        secondNum = secondNum.toString().substring(0, secondNum.length - 1);
        showResult.textContent = secondNum;
    } else {
        firstNum = firstNum.toString().substring(0, firstNum.length - 1);
        showResult.textContent = firstNum;
    }
});

// Clear everything
keyClearEl.addEventListener('click', function () {
    firstNum = '';
    operator = '';
    secondNum = '';
    exprDisplay = '';
    showResult.textContent = '';
    showExp.textContent = '';
});

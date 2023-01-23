'use strict';

// Global variables
let firstNum = '';
let operator = '';
let secondNum = '';
let exprDisplay = ''; // To keep and monitor the entered numbers and operators
let oprPattern = /[+-^x/]/g; // For changing the last operator

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
        // Check if firstNum is given or not
        if (firstNum && !secondNum) {
            showResult.textContent = firstNum;
            if (firstNum.toString().includes('√')) {
                let num = sqrtFn(firstNum.split(' ').slice(-1)[0]);
                firstNum = num;
                exprDisplay += `${firstNum} ${operator} `;
                showExp.textContent = exprDisplay;
            } else if (
                firstNum.toString().includes('√') === false &&
                exprDisplay === ''
            ) {
                exprDisplay += `${firstNum} ${operator} `;
                showExp.textContent = exprDisplay;
            } else if (exprDisplay.includes('=')) {
                exprDisplay = `${firstNum} ${operator} `;
                showExp.textContent = exprDisplay;
            } else if (
                exprDisplay.trim().slice(-1).match(oprPattern) !== null
            ) {
                let updatedExprDisplay = `${exprDisplay
                    .trim()
                    .slice(0, -1)}  ${operator} `;

                exprDisplay = updatedExprDisplay;
                showExp.textContent = exprDisplay;
            }
        } else if (firstNum && secondNum) {
            // Check if second num has square root
            if (secondNum.toString().includes('√')) {
                let num = sqrtFn(secondNum.split(' ').slice(-1)[0]);
                secondNum = num;
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                console.log(
                    `second num ${secondNum},  exprs display ${exprDisplay}`
                );
                // Now operate the first two operands with the first operator
                let firstOperator = exprDisplay
                    .trim()
                    .split(' ')
                    .slice(1, 2)[0];
                // Check what operator
                if (firstOperator === '+') {
                    firstNum = operate(firstNum, secondNum, addFn);
                    // Now, you need to store the result to the firstNum to keep track of the operation result
                    showResult.textContent = firstNum;
                    // Show the expression every after the operator is pressed
                    exprDisplay = `${firstNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    // You need to make second num no value
                    secondNum = '';
                } else if (firstOperator === '-') {
                    firstNum = operate(firstNum, secondNum, subFn);
                    showResult.textContent = firstNum;
                    exprDisplay = `${firstNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === '^') {
                    firstNum = operate(firstNum, secondNum, expFn);
                    showResult.textContent = firstNum;
                    exprDisplay = `${firstNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === 'x') {
                    firstNum = operate(firstNum, secondNum, multiplyFn);
                    showResult.textContent = firstNum;
                    exprDisplay = `${firstNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === '/') {
                    firstNum = operate(firstNum, secondNum, divideFn);
                    showResult.textContent = firstNum;
                    exprDisplay = `${firstNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                }
            } else if (secondNum.includes('√') === false) {
                // Always operate the first operation first, do it by extracting the last operator from the expression
                let firstOperator = exprDisplay.trim().split('').slice(-1)[0];
                if (firstOperator === '+') {
                    // Now, you need to store the result to the firstNum to keep track of the operation result
                    firstNum = operate(firstNum, secondNum, addFn);

                    showResult.textContent = firstNum;
                    // Show the expression every after the operator is pressed
                    exprDisplay += `${secondNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    // You need to make second num no value
                    secondNum = '';
                } else if (firstOperator === '-') {
                    firstNum = operate(firstNum, secondNum, subFn);
                    showResult.textContent = firstNum;
                    exprDisplay += `${secondNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === '^') {
                    firstNum = operate(firstNum, secondNum, expFn);
                    showResult.textContent = firstNum;
                    exprDisplay += `${secondNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === 'x') {
                    firstNum = operate(firstNum, secondNum, multiplyFn);
                    showResult.textContent = firstNum;
                    exprDisplay += `${secondNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                } else if (firstOperator === '/') {
                    firstNum = operate(firstNum, secondNum, divideFn);
                    showResult.textContent = firstNum;
                    exprDisplay += `${secondNum} ${operator} `;
                    showExp.textContent = exprDisplay;
                    secondNum = '';
                }
            }
        }
    });
});

// Equals operator
keyEqualEl.addEventListener('click', function () {
    if (firstNum && firstNum.toString().includes('√')) {
        let num = sqrtFn(firstNum.split(' ').slice(-1)[0]);
        firstNum = num;
        showResult.textContent = firstNum;
    }

    if (firstNum && secondNum) {
        if (secondNum.toString().includes('√')) {
            let num = sqrtFn(secondNum.split(' ').slice(-1)[0]);
            secondNum = num;
            if (operator === '+') {
                // Now, you need to store the result to the firstNum to keep track of the operation result
                firstNum = operate(firstNum, secondNum, addFn);
                showResult.textContent = firstNum;
                // Show the expression every after the operator is pressed
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                // You need to make second num no value
                secondNum = '';
                console.log(firstNum);
                console.log(exprDisplay);
            } else if (operator === '-') {
                firstNum = operate(firstNum, secondNum, subFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                console.log(firstNum);
            } else if (operator === '^') {
                firstNum = operate(firstNum, secondNum, expFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                console.log(firstNum);
            } else if (operator === 'x') {
                firstNum = operate(firstNum, secondNum, multiplyFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                console.log(firstNum);
            } else if (operator === '/') {
                firstNum = operate(firstNum, secondNum, divideFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                console.log(firstNum);
            }
            console.log(firstNum);
        } else if (secondNum.toString().includes('√') == false) {
            if (operator === '+') {
                // Now, you need to store the result to the firstNum to keep track of the operation result
                firstNum = operate(firstNum, secondNum, addFn);
                showResult.textContent = firstNum;
                // Show the expression every after the operator is pressed
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                // You need to make second num no value
                secondNum = '';
                operator = '';
            } else if (operator === '-') {
                firstNum = operate(firstNum, secondNum, subFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                operator = '';
            } else if (operator === '^') {
                firstNum = operate(firstNum, secondNum, expFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                operator = '';
            } else if (operator === 'x') {
                firstNum = operate(firstNum, secondNum, multiplyFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                operator = '';
            } else if (operator === '/') {
                firstNum = operate(firstNum, secondNum, divideFn);
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} = ${firstNum}`;
                showExp.textContent = exprDisplay;
                secondNum = '';
                operator = '';
            }
        }
    }
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
    // Check which num are you deleting or erasing a digit
    if (operator) {
        secondNum = secondNum.substring(0, secondNum.length - 1);
        showResult.textContent = secondNum;
    } else {
        firstNum = firstNum.substring(0, firstNum.length - 1);
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

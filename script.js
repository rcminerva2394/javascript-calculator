'use strict';

// Global variables
let firstNum = '';
let operator = '';
let secondNum = '';
let exprDisplay = '';
let finalOprResult = '';
let oprPattern = /[+\-\^\x\/]/g;

const showExp = document.querySelector('.display-expression');
const showResult = document.querySelector('.display-result');
const outerTopEl = document.querySelector('.layout-top');
const keyClearEl = document.querySelector('.key-clear');
const keyDelEl = document.querySelector('.key-del');
const keyEqualEl = document.querySelector('.key-equal');
const keySignEl = document.querySelector('.key-sign');
const keyDecEl = document.querySelector('.key-dec');
const keySqrtEl = document.querySelector('.key-sqrt');

// Math Operators that accept two operands (+, - , * , /, ^)
const op2El = document.querySelectorAll('.op2');
op2El.forEach((op2) => {
    op2.addEventListener('click', () => {
        operator = op2.value;
        // Check if firstNum is given or not
        if (firstNum && !secondNum) {
            finalOprResult = firstNum;
            showResult.textContent = finalOprResult;
            // if (firstNum.includes('√')) {
            //     let num = firstNum.split(' ').slice(-1)[0];
            //     firstNum = sqrtFn(num);
            //     exprDisplay += `${firstNum} ${operator} `;
            //     showExp.textContent = exprDisplay;
            // }

            if (exprDisplay === '') {
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
            // Always operate the first operation first, do it by extracting the last operator from the expression
            let firstOperator = exprDisplay.trim().split('').slice(-1)[0];
            if (firstOperator === '+') {
                finalOprResult = operate(firstNum, secondNum, addFn);
                // Now, you need to store the result to the firstNum to keep track of the operation result
                firstNum = finalOprResult;
                showResult.textContent = firstNum;
                // Show the expression every after the operator is pressed
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                // You need to make second num no value
                secondNum = '';
            } else if (firstOperator === '-') {
                finalOprResult = operate(firstNum, secondNum, subFn);
                firstNum = finalOprResult;
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                secondNum = '';
            } else if (firstOperator === '^') {
                finalOprResult = operate(firstNum, secondNum, expFn);
                firstNum = finalOprResult;
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                secondNum = '';
            } else if (firstOperator === 'x') {
                finalOprResult = operate(firstNum, secondNum, multiplyFn);
                firstNum = finalOprResult;
                showResult.textContent = firstNum;
                exprDisplay += `${secondNum} ${operator} `;
                showExp.textContent = exprDisplay;
                secondNum = '';
            } else if (firstOperator === '/') {
                finalOprResult = operate(firstNum, secondNum, divideFn);
                firstNum = finalOprResult;
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
    if (firstNum && secondNum) {
        // Always operate the first operation first, do it by extracting the last operator from the expression
        // let firstOperator = exprDisplay.trim().split('').slice(-1)[0];
        if (operator === '+') {
            finalOprResult = operate(firstNum, secondNum, addFn);
            // Now, you need to store the result to the firstNum to keep track of the operation result
            firstNum = finalOprResult;
            showResult.textContent = firstNum;
            // Show the expression every after the operator is pressed
            exprDisplay += `${secondNum} = ${firstNum}`;
            showExp.textContent = exprDisplay;
            // You need to make second num no value
            secondNum = '';
            operator = '';
        } else if (operator === '-') {
            finalOprResult = operate(firstNum, secondNum, subFn);
            firstNum = finalOprResult;
            showResult.textContent = firstNum;
            exprDisplay += `${secondNum} = ${firstNum}`;
            showExp.textContent = exprDisplay;
            secondNum = '';
            operator = '';
        } else if (operator === '^') {
            finalOprResult = operate(firstNum, secondNum, expFn);
            firstNum = finalOprResult;
            showResult.textContent = firstNum;
            exprDisplay += `${secondNum} = ${firstNum}`;
            showExp.textContent = exprDisplay;
            secondNum = '';
            operator = '';
        } else if (operator === 'x') {
            finalOprResult = operate(firstNum, secondNum, multiplyFn);
            firstNum = finalOprResult;
            showResult.textContent = firstNum;
            exprDisplay += `${secondNum} = ${firstNum}`;
            showExp.textContent = exprDisplay;
            secondNum = '';
            operator = '';
        } else if (operator === '/') {
            finalOprResult = operate(firstNum, secondNum, divideFn);
            firstNum = finalOprResult;
            showResult.textContent = firstNum;
            exprDisplay += `${secondNum} = ${firstNum}`;
            showExp.textContent = exprDisplay;
            secondNum = '';
            operator = '';
        }
    }
});

// Square root
keySqrtEl.addEventListener('click', function () {
    if (!firstNum) {
        firstNum += `√ `;
        op2El.forEach((el) => (el.disabled = true));
        finalOprResult = firstNum;
        showResult.textContent = finalOprResult;
    }
    console.log(firstNum);
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
        finalOprResult = changeSignFn(secondNum);
        showResult.textContent = finalOprResult;
        secondNum = finalOprResult;
    } else {
        finalOprResult = changeSignFn(firstNum);
        showResult.textContent = finalOprResult;
        firstNum = finalOprResult;
    }
});

// Get all the number keys and  event listener
const keys = document.querySelectorAll('.key-num');
keys.forEach((numKey) => {
    numKey.addEventListener('click', () => {
        // check if operator is given, if so, set the number to secondNum
        if (operator) {
            secondNum += numKey.value;
            finalOprResult = secondNum;
            showResult.textContent = finalOprResult;
        } else {
            firstNum += numKey.value;
            finalOprResult = firstNum;
            showResult.textContent = finalOprResult;
            // isOverflown(showResult) && (showResult.style.fontSize = '3.5rem');
            console.log(firstNum);
        }
    });
});

// Deleting one digit or erasing a digit
keyDelEl.addEventListener('click', function () {
    finalOprResult = finalOprResult.substring(0, finalOprResult.length - 1);
    // Check which num are you deleting or erasing a digit
    if (secondNum) {
        secondNum = finalOprResult;
        showResult.textContent = secondNum;
    } else {
        firstNum = finalOprResult;
        showResult.textContent = firstNum;
    }
});

// Clear everything
keyClearEl.addEventListener('click', function () {
    firstNum = '';
    operator = '';
    secondNum = '';
    exprDisplay = '';
    finalOprResult = '';
    showResult.textContent = '';
    showExp.textContent = '';
});

/*
const isOverflown = (el) => {
    return el.clientHeight > el.scrollHeight || el.clientWidth > el.scrollWidth;
}; 

const isOverflown = (el) => {
    return el.offsetWidth >= outerTopEl.offsetWidth;
};

*/

// const reduceFontSize = (el) => {
//     let fontSize = el.style.font;
// };

const operate = function (n1, n2, op) {
    let answer = op(+n1, +n2);
    return answer;
};

// Add function
const addFn = function (n1, n2) {
    return n1 + n2;
};

// Subtraction function
const subFn = function (n1, n2) {
    return n1 - n2;
};

// Multiplication function
const multiplyFn = function (n1, n2) {
    return n1 * n2;
};

// Division function
const divideFn = function (n1, n2) {
    return n1 / n2;
};

// Exponential function
const expFn = function (n1, n2) {
    return n1 ** n2;
};

// Square root function
const sqrtFn = function (n1) {
    return Math.sqrt(+n1);
};

const changeSignFn = function (n1) {
    let number = +n1;
    return number * -1;
};

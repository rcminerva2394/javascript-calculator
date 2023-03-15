'use strict';

const displayExpEl = document.querySelector('.display-expression');
const displayResultEl = document.querySelector('.display-result');

class Calculator {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  expression = '';
  result = '';
  constructor() {}

  setOperand(num) {
    // Determine if the number is for first operand or second operand by checking if operator is already present
    if (this.operator) {
      this.secondOperand += num;
      this.result = this.secondOperand;
    } else if (!this.operator) {
      this.firstOperand += num;
      this.result = this.firstOperand;
    }
    // Display the result
    this.showResult();
    console.log(this);
  }

  // GO BACK AND FIX THE SQUARE ROOT FOR OPERATOR CLICK AND EQUALS
  setOperator(op) {
    if (this.operator) {
      if (this.firstOperand && !this.secondOperand) {
        if (this.firstOperand.includes('√')) {
          this.firstOperand = this.operateSquareR(this.firstOperand.slice(1));
          this.result = this.firstOperand;
          this.showResult();
        } else if (!this.firstOperand.includes('√')) {
          // This is incase one wants to change the current operator
          this.expression = ` ${this.expression.trim().slice(0, -1)} ${op}`;
        }
      } else if (this.firstOperand && this.secondOperand) {
        this.expression += ` ${this.secondOperand} ${op}`;
        // Execute the operation
        this.operate();
      }
    } else if (!this.operator) {
      this.expression += ` ${this.firstOperand} ${op}`;
    }

    this.operator = op;
    this.showExpression();

    console.log(this);
  }

  changeSign() {
    if (this.operator) {
      this.secondOperand = +this.secondOperand * -1;
      this.result = this.secondOperand;
    } else if (!this.operator) {
      this.firstOperand = +this.firstOperand * -1;
      this.result = this.firstOperand;
    }
    this.showResult();
  }

  putDecimal() {
    if (this.operator) {
      if (!this.secondOperand.includes('.')) {
        this.secondOperand += '.';
        this.result = this.secondOperand;
        this.showResult();
      }
    } else if (!this.operator) {
      if (!this.firstOperand.includes('.')) {
        this.firstOperand += '.';
        this.result = this.firstOperand;
        this.showResult();
      }
    }
  }

  inputSquareR() {
    if (this.operator) {
      if (!this.secondOperand) {
        this.secondOperand = '√';
        this.result = this.secondOperand;
      }
    } else if (!this.operator) {
      if (!this.firstOperand) {
        this.firstOperand = '√';
        this.result = this.firstOperand;
      }
    }
    this.showResult();
    console.log(this);
  }

  operateSquareR(num) {
    return Math.sqrt(+num);
  }

  operate() {
    let result;
    switch (this.operator) {
      case '+':
        result = +this.firstOperand + +this.secondOperand;
        break;
      case '-':
        result = +this.firstOperand - +this.secondOperand;
        break;
      case 'x':
        result = +this.firstOperand * +this.secondOperand;
        break;
      case '/':
        result = +this.firstOperand / +this.secondOperand;
        break;
      case '^':
        result = (+this.firstOperand) ** +this.secondOperand;
        break;
      default:
        return;
    }

    this.firstOperand = result;
    this.result = result;
    this.showExpression();
    this.secondOperand = '';
    this.operator = '';
    this.showResult();
    console.log(this);
  }

  equals() {
    if (this.operator) {
      if (this.secondOperand.includes('√')) {
        this.secondOperand = this.operateSquareR(this.secondOperand.slice(1));
        this.result = this.secondOperand;
      } else {
        this.expression += ` ${this.secondOperand} =`;
        this.operate();
      }
      console.log(this);
    } else if (!this.operator) {
      if (this.firstOperand.includes('√')) {
        this.firstOperand = this.operateSquareR(this.firstOperand.slice(1));
        this.result = this.firstOperand;
      } else {
        this.expression += ` ${this.secondOperand} =`;
        this.operate();
      }
    }
    console.log(this);
    this.showResult();
  }

  showResult() {
    displayResultEl.textContent = this.result;
  }

  delete() {
    if (this.firstOperand && !this.secondOperand) {
      this.firstOperand = this.firstOperand
        .toString()
        .substring(0, this.firstOperand.length - 1);
      this.result = this.firstOperand;
    } else if (this.secondOperand) {
      this.secondOperand = this.secondOperand
        .toString()
        .substring(0, this.secondOperand.length - 1);
      this.result = this.secondOperand;
    }

    this.showResult();
  }

  clearAll() {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.expression = '';
    this.result = '';
    this.showExpression();
    this.showResult();
    console.log(this);
  }

  showExpression() {
    displayExpEl.textContent = this.expression;
  }
}

const calculator = new Calculator();
console.log(calculator);

/********** EVENT LISTENERS **************/

// Set the operands (nums)
const keyNums = document.querySelectorAll('.key-num');
keyNums.forEach((keyNum) => {
  keyNum.addEventListener('click', () => {
    calculator.setOperand(keyNum.value);
  });
});

// Set the operator
const mainOps = document.querySelectorAll('.op2');
mainOps.forEach((mainOp) => {
  mainOp.addEventListener('click', () => {
    calculator.setOperator(mainOp.value);
  });
});

// Equals
const keyEqual = document.querySelector('.key-equal');
keyEqual.addEventListener('click', () => {
  calculator.equals();
});

// Change sign
const keyChangeSign = document.querySelector('.key-sign');
keyChangeSign.addEventListener('click', () => {
  calculator.changeSign();
});

// Clear all
const keyClearEl = document.querySelector('.key-clear');
keyClearEl.addEventListener('click', () => {
  calculator.clearAll();
});

// Delete a digit
const keyDelEl = document.querySelector('.key-del');
keyDelEl.addEventListener('click', () => {
  calculator.delete();
});

// Decimal
const keyDecEl = document.querySelector('.key-dec');
keyDecEl.addEventListener('click', () => {
  calculator.putDecimal();
});

// Square root operation
const keySqrtEl = document.querySelector('.key-sqrt');
keySqrtEl.addEventListener('click', () => {
  calculator.inputSquareR();
});

/*

let firstNum = '';
let secondNum = '';
let operator = ''; // To keep track of the current operator
let exprDisplay = ''; // To keep track of the entered numbers and operators on display
let oprPattern = /[+-^x/]/g; // to find the first operator from the string

const showExp = document.querySelector('.display-expression');
const showResult = document.querySelector('.display-result');
const displayTopEl = document.querySelector('.display-top');
const keys = document.querySelectorAll('.key-num');
const keyClearEl = document.querySelector('.key-clear');
const keyDelEl = document.querySelector('.key-del');
const keyEqualEl = document.querySelector('.key-equal');
const keySignEl = document.querySelector('.key-sign');
const keyDecEl = document.querySelector('.key-dec');
const keySqrtEl = document.querySelector('.key-sqrt');

const init = () => {
  firstNum = '';
  operator = '';
  secondNum = '';
  exprDisplay = '';
  showResult.textContent = 0;
  showResult.style.fontSize = '6rem';
  showExp.textContent = '';
  keySqrtEl.disabled = false;
  keys.forEach((key) => (key.disabled = false));
};

init();

const addFn = (a, b) => a + b;
const subFn = (a, b) => a - b;
const multiplyFn = (a, b) => a * b;
const divideFn = (a, b) => a / b;
const expFn = (a, b) => a ** b;
const sqrtFn = (a) => Math.sqrt(+a);
const changeSignFn = (a) => +a * -1;
const toggleEnabling = function (els) {
  els.forEach((el) => {
    el.disabled = !el.disabled;
  });
};

const calculate = (operator) => {
  let a = +firstNum;
  let b = +secondNum;

  switch (operator) {
    case '+':
      return addFn(a, b);
    case '-':
      return subFn(a, b);
    case '^':
      return expFn(a, b);
    case 'x':
      return multiplyFn(a, b);
    case '/':
      return divideFn(a, b);
  }
};

// Math Operators that accept two operands (+, - , * , /, ^)
const op2El = document.querySelectorAll('.op2');
op2El.forEach((op2) => {
  op2.addEventListener('click', () => {
    operator = op2.value;
    keySqrtEl.disabled = false; // to allow using square root every after an operator is pressed
    isOverflow();

    // Check if firstNum is given or not
    if (firstNum && !secondNum) {
      showResult.textContent = firstNum;
      // Check if first num has square root symbol
      if (firstNum.toString().includes('√')) {
        let initialSqrtVal = firstNum;
        firstNum = sqrtFn(firstNum.split(' ')[0].slice(1));
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
    }

    if (firstNum && secondNum) {
      // Check if second num has square root
      if (secondNum.toString().includes('√')) {
        let initialSqrtVal = secondNum; // To still show the square root val
        secondNum = sqrtFn(secondNum.slice(1));
        exprDisplay += `${initialSqrtVal} ${operator} `;

        // Now operate the first two operands with the first operator
        let firstOperator = exprDisplay.trim().split(' ').slice(1, 2)[0];
        console.log(firstOperator);
        // Check what operator and the result is kept to first num in order to track the current result of all operations applied
        firstNum = calculate(firstOperator);
        showResult.textContent = firstNum;
        showExp.textContent = exprDisplay;
        secondNum = '';
      } else if (secondNum.includes('√') === false) {
        // Always operate the first operation first, do it by extracting the last operator from the expression
        let firstOperator = exprDisplay.trim().split('').slice(-1)[0];
        if (secondNum === '0') {
          showResult.textContent = 'Oops! No!';
          return;
        }
        firstNum = calculate(firstOperator);
        console.log(firstNum);
        showResult.textContent = firstNum;
        exprDisplay += `${secondNum} ${operator} `;
        showExp.textContent = exprDisplay;
        secondNum = '';
      }
    }
    keys.forEach((key) => (key.disabled = false));
  });
});

// Equals operator
keyEqualEl.addEventListener('click', function () {
  isOverflow();
  if (firstNum && firstNum.toString().includes('√')) {
    firstNum = sqrtFn(firstNum.slice(1));
    showResult.textContent = firstNum;
  }
  if (firstNum && secondNum) {
    if (secondNum.toString().includes('√')) {
      let initialSqrtVal = secondNum;
      secondNum = sqrtFn(secondNum.slice(1));
      firstNum = calculate(operator);
      showResult.textContent = firstNum;
      exprDisplay += `${initialSqrtVal} =`;
      showExp.textContent = exprDisplay;
      secondNum = '';
    } else if (secondNum.toString().includes('√') == false) {
      if (secondNum === '0') {
        showResult.textContent = 'Oops! No!';
        return;
      }
      firstNum = calculate(operator);
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
    secondNum = `√`;
    toggleEnabling(op2El);

    showResult.textContent = secondNum;
  } else {
    firstNum = `√`;
    toggleEnabling(op2El);
    showResult.textContent = firstNum;
  }
  toggleEnabling(op2El);
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

// Get all the numbers
keys.forEach((numKey) => {
  toggleEnabling(op2El);
  numKey.addEventListener('click', () => {
    // check if operator is given, if so, set the number to secondNum
    if (operator) {
      secondNum += numKey.value;
      showResult.textContent = secondNum;
    } else {
      firstNum += numKey.value;
      showResult.textContent = firstNum;
    }
    isOverflow();
  });
  toggleEnabling(op2El);
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
keyClearEl.addEventListener('click', init);

// To check if text overflowing
const isOverflow = () => {
  if (showResult.clientWidth > 270 && showResult <= 280) {
    showResult.style.fontSize = '4rem';
  } else if (showResult.clientWidth > 280) {
    showResult.style.fontSize = '3rem';
  } else if (showResult.textContent.length === 14) {
    showResult.textContent = "Oop! That's the limit";
    toggleEnabling(keys);
  }
};

*/

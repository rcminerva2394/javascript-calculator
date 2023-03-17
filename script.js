'use strict';

const displayExpEl = document.querySelector('.display-expression');
const displayResultEl = document.querySelector('.display-result');

class Calculator {
  constructor() {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.expression = '';
    this.result = ''; // The input number either first op or second op and also the result of operation
  }

  setOperand(num) {
    this.operator ? (this.secondOperand += num) : (this.firstOperand += num);
    this.result = this.operator ? this.secondOperand : this.firstOperand;
    this.showResult();
    console.log(this);
  }

  setOperator(op) {
    if (this.operator) {
      if (this.firstOperand && !this.secondOperand) {
        this.operator = op;
        if (this.firstOperand.toString().includes('√')) {
          this.checkIfSquareR();
        } else if (!this.firstOperand.toString().includes('√')) {
          this.expression += this.expression.endsWith('=')
            ? ` ${this.result} ${op}`
            : ` ${this.expression.trim().slice(0, -1)} ${op}`;
        }
      } else if (this.firstOperand && this.secondOperand) {
        this.expression += ` ${this.secondOperand} ${op}`;
        if (this.secondOperand.toString().includes('√')) {
          this.secondOperand = this.operateSquareR(this.secondOperand.slice(1));
          this.operate();
        } else if (!this.secondOperand.toString().includes('√')) {
          this.operate();
          this.operator = op;
        }
      }
    } else if (!this.operator) {
      this.operator = op;
      this.expression = `${this.firstOperand} ${op}`;
      if (this.firstOperand.toString().includes('√')) {
        this.checkIfSquareR();
      }
    }
    this.showExpression();
  }

  checkIfSquareR() {
    this.result = this.operateSquareR(this.firstOperand.slice(1));
    this.showResult();
    this.firstOperand = this.result;
  }

  changeSign() {
    this.operator ? (this.secondOperand *= -1) : (this.firstOperand *= -1);
    this.result = this.operator ? this.secondOperand : this.firstOperand;
    this.showResult();
  }

  putDecimal() {
    this.operator
      ? !this.secondOperand.includes('.') && (this.secondOperand += '.')
      : !this.firstOperand.includes('.') && (this.firstOperand += '.');
    this.result = this.operator ? this.secondOperand : this.firstOperand;
    this.showResult();
  }

  inputSquareR() {
    this.operator
      ? !this.secondOperand && (this.secondOperand = '√')
      : !this.firstOperand && (this.firstOperand = '√');
    this.result = this.operator ? this.secondOperand : this.firstOperand;
    this.showResult();
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
    this.showResult();
  }

  equals() {
    if (this.operator) {
      if (this.secondOperand.toString().includes('√')) {
        this.expression += ` ${this.secondOperand} =`;
        this.secondOperand = this.operateSquareR(this.secondOperand.slice(1));
      } else {
        this.expression += ` ${this.secondOperand} =`;
      }
      this.operate();
    } else if (!this.operator) {
      if (this.firstOperand.toString().includes('√')) {
        this.checkIfSquareR(this.firstOperand);
      } else {
        this.expression += ` ${this.secondOperand} =`;
        this.operate();
      }
    }
    this.showResult();
  }

  showResult() {
    displayResultEl.textContent = this.result;
  }

  delete() {
    this.operator
      ? ((this.secondOperand = this.secondOperand
          .toString()
          .substring(0, this.secondOperand.length - 1)),
        (this.result = this.secondOperand))
      : ((this.firstOperand = this.firstOperand
          .toString()
          .substring(0, this.firstOperand.length - 1)),
        (this.result = this.firstOperand));
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

// Set the operands (nums)
document.querySelectorAll('.key-num').forEach((keyNum) => {
  keyNum.addEventListener('click', () => {
    calculator.setOperand(keyNum.value);
  });
});

// Set the operator
document.querySelectorAll('.op2').forEach((mainOp) => {
  mainOp.addEventListener('click', () => {
    calculator.setOperator(mainOp.value);
  });
});

// Equals
document.querySelector('.key-equal').addEventListener('click', () => {
  calculator.equals();
});

// Change sign
document.querySelector('.key-sign').addEventListener('click', () => {
  calculator.changeSign();
});

// Clear all
document.querySelector('.key-clear').addEventListener('click', () => {
  calculator.clearAll();
});

// Delete a digit
document.querySelector('.key-del').addEventListener('click', () => {
  calculator.delete();
});

// Decimal
document.querySelector('.key-dec').addEventListener('click', () => {
  calculator.putDecimal();
});

// Square root operation
document.querySelector('.key-sqrt').addEventListener('click', () => {
  calculator.inputSquareR();
});

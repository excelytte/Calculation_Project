class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //show the display on
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }

  //this is to add number to the display while clicking the numbers
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
       this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //for us to select the operations +, - etc.
  chooseOperations(operations) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operations;
    this.previousOperand = this.currentOperand + operations;
    this.currentOperand = "";
  }

  // this will do all calculations
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand); //convert previousOperand back to a number
    const current = parseFloat(this.currentOperand); //convert currentOperand back to a number

    //below will stop the function to stop rinning if there is no number in the currentOperand
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //clear the display whenever u click the AC
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  //to delete the current operand whenever the delete button is clicked
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
}

// collecting elements and assigning to a variable
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//to enable us choose a new operations
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperations(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute(button.innerText);
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

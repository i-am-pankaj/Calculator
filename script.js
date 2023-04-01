class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) 
            return;

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOPeration(operation){
        if(this.currentOperand === '') 
            return;

        if(this.previousOperand !== '')
            this.compute();
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand ='';
    }

    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        
        if(isNaN(prev) || isNaN(curr))
            return;
        
        switch(this.operation){
            case '÷':
                computation = prev/curr;
                break;

            case '+':
                computation = prev+curr;
                break;
                
            case 'x':
                computation = prev*curr;
                break;

            case '-':
                computation = prev-curr;
                break;

            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
        let stringNum = number.toString();
        let integerNum = parseFloat(stringNum.split('.')[0]);
        let decimalNum = stringNum.split('.')[1];
        
        let integerDisplay;

        if(isNaN(integerNum))
            integerDisplay = '';
        else
            integerDisplay = integerNum.toLocaleString('en' , {maximumFractionDigits:0});

        if (decimalNum != null)
            return `${integerDisplay}.${decimalNum}`;
        else
            return integerDisplay;
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if(this.operation != null)
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        else
            this.previousOperandTextElement.innerText = '';
    }

}

let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalsButtons = document.querySelector('[data-equals]');
let deleteButtons = document.querySelector('[data-delete]');
let allClearButtons = document.querySelector('[data-all-clear]');
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOPeration(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButtons.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButtons.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButtons.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})
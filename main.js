// Constructor class for the calculator to store the data 
class Calculator {
    constructor(prevTextElement, currTextElement) {
        // This is a way to set the text elements in the calculator class 
        this.prevTextElement = prevTextElement
        this.currTextElement = currTextElement
        this.clear()

    }

    // These are the methods for the calculator to perform its functions 
    clear() {
        this.prevOperand = ""
        this.currOperand = ""
        this.operator = undefined

    }

    delete() {
        if(this.currOperand != "")
        {
            this.currOperand = ""
        }

    }
    // Method to put number on screen every time a user clicks on a number 
    generateNumber(number) {
        if (number === "." && this.currOperand.includes(".")) return
        // Converting it to a string cause javascript tries to ad them as actual numbers
        if (this.currOperand != undefined) {

            this.currOperand += number.toString();
        }
        else {
            this.currOperand = number

        }
    }

    selectOperator(operator, ops) {
        if (this.currOperand == "") return
        if (this.prevOperand !== "") {
            this.calculate(this.prevOperand)
        }
        var curr = this.currOperand.slice(-1)
        this.prevOperand += this.currOperand
        this.currOperand = ""
        var same = false
        for (var i = 0; i < ops.length; i++) {

            if (curr == ops[i].innerHTML && same == false) {
                same = true
            }

        }
        if (same === false) {
            this.prevOperand += operator.toString()
        }
        else {
            this.currOperand = this.currOperand.slice(0, -1) + operator.toString()
        }



    }

    // Does the calculation and returns a single value
    calculate(number) {
        number = number+this.currOperand
        var value = 0
        for (var i = 0; i < number.length; i++) {
            if (number[i]=== "+") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1) + parseFloat(num2)
                value = value.toPrecision(4)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "*") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1) * parseFloat(num2)
                value = value.toPrecision(4)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "÷") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1)/ parseFloat(num2)
                value = value.toPrecision(4)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "-") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1)-parseFloat(num2)
                value = value.toPrecision(4)
                this.prevOperand = value
                return value
            }

        }
    }
    equal(){
        console.log("equalButtons")
        this.prevOperand += this.currOperand
        var equalvalue = this.prevOperand
        this.clear()
        var tester = this.calculate(equalvalue)
        this.equalDisplay(tester)
        
    }

     split(str, index) {
        const result = [str.slice(0, index), str.slice(index+1)];
      
        return result;
      }
    // Function to update display with the answer 
    display() {
        this.currTextElement.innerHTML = this.currOperand;
        this.prevTextElement.innerHTML = this.prevOperand;
    }

    equalDisplay(val) {
        this.currTextElement.innerHTML = val
        this.prevTextElement.innerHTML = ""
    }

}


// used to select the number buttons from the html document
const numberButtons = document.querySelectorAll('[data-number]');
const operatorbuttons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equals]');
const clearbuttons = document.querySelector('[data-clear]');
const deleteButtons = document.querySelector('[data-delete]');
const prevTextElement = document.querySelector('[data-previousop]');
const currTextElement = document.querySelector('[data-currentop]');

const calc = new Calculator(prevTextElement, currTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.generateNumber(button.innerHTML)
        calc.display()
    })
})

operatorbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calc.selectOperator(button.innerHTML, operatorbuttons)
        calc.display()

    })
})

equalButtons.addEventListener('click', () => {
    calc.equal()
});

clearbuttons.addEventListener('click', () => {
    calc.clear()
    calc.display()
});

deleteButtons.addEventListener('click', () => {
    console.log("reached")
    calc.delete()
    calc.display()
});
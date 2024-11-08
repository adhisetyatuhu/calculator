const displayNode = document.getElementById('display');
const btnNums = document.getElementsByClassName('btn-num');
const btnOperators = document.getElementsByClassName('btn-operator');
let inputStatus = 'i';  // 'i': input process, '=': calculation has been executed

function getValue(node) {
    return node.textContent;
}

function getLastNum() {
    /**
     * get last number from display
     */
    const value = getValue(displayNode);
    let lastNum = value.split('+').pop();
    lastNum = lastNum.split('-').pop();
    lastNum = lastNum.split('x').pop();
    lastNum = lastNum.split('/').pop();

    return lastNum;
}

function validateInput(input) {
    /**  
     * It will check if the input is valid 
     * and will return the valid displayedValue
     */

    const displayedValue = getValue(displayNode);
    
    // if the input is a number then always valid
    if (!isNaN(input)) {
        if (displayedValue === '0' || inputStatus === '=') return input;
        return displayedValue + input;
    } 

    if (input === 'x' || input === '-' || input === '+' || input === '/') {
        const lastInput = displayedValue.slice(-1);
        // if the last input is not a number then not valid and will be replaced
        if (isNaN(lastInput)) {
            return displayedValue.slice(0, -1) + input;  
        } 
    }

    if (input === '.') {
        const lastNum = getLastNum();
        if (inputStatus === '=') return "0."
        if (lastNum.indexOf('.') >= 0) return displayedValue;
    }

    return displayedValue + input;
}

function backspace() {
    let displayValue = getValue(displayNode)
    if (displayValue.length === 1) return '0';

    return displayValue.slice(0,-1);
}

function display() {
    /**
     * To display inputs to screen
     */
    const value = getValue(this);
    const validInput = validateInput(value);

    displayNode.textContent = validInput;
    inputStatus = 'i';
}

function calc() {
    /**
     * To do calculation when '=' is clicked
     */
    let value = getValue(displayNode);
    // if the last char in displayed value is not a number the it will be removed
    const lastChar = value.slice(-1);
    if (isNaN(lastChar)) {
        value = value.slice(0, -1);
    } 
    
    let result = eval(value.replace('x', '*'));
    displayNode.textContent = result;
    inputStatus = '=';
}

/**
 * Add event listener
 */
for (let i=0; i<btnNums.length; i++) {
    btnNums[i].addEventListener('click', display);
}

for (let i=0; i<btnOperators.length; i++) {
    btnOperators[i].addEventListener('click', display);
}

document.getElementById('equal').addEventListener('click', calc);
document.getElementById('ac').addEventListener('click', function() {
    displayNode.textContent = 0;
});
document.getElementById('backspace').addEventListener('click', function() {
    displayNode.textContent = backspace();
})

const displayNode = document.getElementById('display');
const btnNums = document.getElementsByClassName('btn-num');
const btnOperators = document.getElementsByClassName('btn-operator');

function getValue(node) {
    return node.textContent;
}

function validateInput(input) {
    /**
     * It will check if the input is valid 
     * and will return the valid displayedValue
     */

    const displayedValue = getValue(displayNode);
    
    // if the input is a number then always valid
    if (!isNaN(input)) {
        if (displayedValue === '0') return input;
        return displayedValue + input;
    } 

    if (input === 'x' || input === '-' || input === '+' || input === '/') {
        const lastInput = displayedValue.slice(-1);
        // if the last input is not a number then not valid and will be replaced
        if (isNaN(lastInput)) {
            return displayedValue.slice(0, -1) + input;  
        } 
    }

    return displayedValue + input;
}

function display() {
    /**
     * To display inputs to screen
     */
    const value = getValue(this);
    const validInput = validateInput(value);

    displayNode.textContent = validInput;
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
const numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

let finalResult = 0;
let operator = '';
let activeOperator = false;

// Clear the result
$('#ac').click(() => {
    $('.result').text('');
});

// Toggle the sign of the number
$('#sign').click(() => {
    if (firstChar() === '-') {
        const result = $('.result').text();
        const sbstr = result.substring(1, result.length);
        $('.result').text(sbstr);
    } else if (!emptyResult()) {
        prepend('-');
    }
});

// Calculate percentage
$('#percentage').click(() => {
    if (!emptyResult()) {
        const percentage = parseFloat($('.result').text()) / 100;
        $('.result').text(percentage);
    }
});

// Handle operator buttons
$('.operator').click(e => {
    const id = e.target.id;
    if (id === 'equal') {
        calculate();
        $('.result').text(finalResult);
        operator = '';
        activeOperator = false;
    } else {
        operator = id;
        activeOperator = true;
    }
});

// Handle number buttons
$('.number').click(e => {
    const id = e.target.id;
    const num = numbers[id];

    if (activeOperator) {
        finalResult = parseFloat($('.result').text());
        $('.result').text('');
        activeOperator = false;
    }
    if (firstChar() === '0') {
        if (hasChar('.')) {
            append(num);
        }
    } else {
        append(num);
    }
});

// Handle decimal point
$('#point').click(() => {
    if (emptyResult()) {
        append('0.');
    } else if (!hasChar('.')) {
        append('.');
    }
});

// Perform calculations
const calculate = () => {
    const actResult = parseFloat($('.result').text());
    switch (operator) {
        case 'addition':
            finalResult += actResult;
            break;
        case 'subtraction':
            finalResult -= actResult;
            break;
        case 'multiplication':
            finalResult *= actResult;
            break;
        case 'division':
            if (actResult !== 0) {
                finalResult /= actResult;
            } else {
                console.error("Division by zero is not allowed.");
            }
            break;
        default:
            console.error("Invalid operator.");
    }
};

// Check if the result is empty
const emptyResult = () => {
    return $('.result').text() === '';
};

// Check if the result contains a specific character
const hasChar = char => {
    const result = $('.result').text();
    return result.indexOf(char) !== -1;
};

// Get the first character of the result
const firstChar = () => {
    return $('.result').text().charAt(0);
};

// Append text to the result
const append = txt => {
    const result = $('.result').text();
    $('.result').text(result + txt);
};

// Prepend text to the result
const prepend = sign => {
    const result = $('.result').text();
    $('.result').text(sign + result);
};
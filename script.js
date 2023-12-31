document.addEventListener("DOMContentLoaded",()=> {
    const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {

    const element = e.target;

    //elementin bir button olup olmadığını kontrol ediyor
    if(!element.matches('button')) return;

    //girilen element operatorse çalışır
    if(element.classList.contains('operator')) {
     handleOperator(element.value);
     updateDisplay();
      return;
    }
 
    //girilen değer ondalıklıysa çalışır
    if(element.classList.contains('decimal')) {
       inputDecimal(element.value);
       updateDisplay();
        return;  
      }
 
     //silme butonuna tıklayınca burası çalışır 
      if(element.classList.contains('clear')) { 
       clear();
       updateDisplay();
        return; 
      }  

   //girilen değerin sonucunu gösterir
   inputNumber(element.value);
   updateDisplay();
       
});

function inputNumber(num) {
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;

    }else {
        displayValue = displayValue === '0'? num: displayValue + num;
    }

     console.log(displayValue, firstValue, operator, waitingForSecondValue);

}



function inputDecimal() {
    if(!displayValue.includes('.')) {
    displayValue += '.';
    
   } 
}

function clear()  {
    displayValue = '0';
}

function handleOperator(nextOperator) {
    const value= parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }
   

    if (firstValue === null) {
        firstValue = value;
    } else if(operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = '${parsefloat(result.toFixed(7))}'
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator 

    console.log(displayValue, firstValue, operator, waitingForSecondValue);


}   

function calculate(first, second, operator){ 
    if(operator === '+') {
     return first + second;
 } else if (operator === '-') {
     return first - second;
 } else if (operator === '*') {
 return first * second;
 } else if (operator === '/') {
     return first / second;
 }
 return second;
}


})
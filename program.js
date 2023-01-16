const operations = [];
//let orderNumber ="firstNumber";
const decimalsToRound = 6;

let batterylevel = document.getElementById("batterylevel");
const screenoperation = document.getElementById("screenoperation");
const screenhistorial = document.getElementById("screenhistorial");
const buttonNumber = document.querySelectorAll(".button-number");
const buttonNumbercol2 = document.querySelectorAll(".button-numbercol2");
const buttonOperator = document.querySelectorAll(".button-operator");
const buttonequal = document.getElementById("buttonequal");
const buttonchanger = document.querySelectorAll(".button-changer");


class Operation{
    constructor(firstNumber, secondNumber, operator, calculus){
    this.firstNumber=firstNumber;
    this.secondNumber=secondNumber;
    this.operator=operator;
    this.calculus=calculus;
    }
}
operations.push(new Operation("","","",""));


//Functions
actualOperation=()=>{
result = operations.length-1;
return result;
}

actualOperationTxt=()=>{
    result = operations[actualOperation()].firstNumber +""+ operations[actualOperation()].operator+""+ operations[actualOperation()].secondNumber;
    return result;
}

actualOperationNumberToEdit=()=>{
if (operations[actualOperation()].firstNumber===""){
result="firstNumber"
}
result="secondNumber"
return result
}

actualOperationNumberToChange=()=>{
if (operations[actualOperation()].operator===""){
result="firstNumber"
} else {
result="secondNumber"
}
return result
}

operationTxt=(i)=>{
result = operations[i].firstNumber +" "+ operations[i].operator+" "+ operations[i].secondNumber+" = "+operations[i].calculus+" (#"+ (Number([i])+1)+ ")";
return result;
}

historicOperationsTxt=()=>{
const operationsTxt = [];
for(j=operations.length-2;j>=0;j--){
operationsTxt.push(operationTxt(j))
}
result=operationsTxt.join("<br>")
return result
}

operationAtScreen=(i)=>{
result = operations[i].firstNumber +" "+ operations[i].operator+" ["+ operations[i].secondNumber+"]";
return result;
}

calculate=(i)=>{//i is the operation index in operations array
if(operations[i].firstNumber==="" || operations[i].secondNumber==="" || operations[i].operator===""){
} else {

operations[i].firstNumber=formatATypedNumber(operations[i].firstNumber);
operations[i].secondNumber=formatATypedNumber(operations[i].secondNumber);

switch (operations[i].operator){
case "+": operations[i].calculus=roundToDecimals(Number(operations[i].firstNumber)+Number(operations[i].secondNumber), decimalsToRound).toString();
break;
case "-": operations[i].calculus=roundToDecimals(Number(operations[i].firstNumber)-Number(operations[i].secondNumber), decimalsToRound).toString();
break;
case "x": operations[i].calculus=roundToDecimals(Number(operations[i].firstNumber)*Number(operations[i].secondNumber), decimalsToRound).toString();
break;
case "/":
if(operations[i].secondNumber==="0"){
    console.log("Impossible to divide by 0");
    operations[i].operator="/Error";
    operations[i].calculus=operations[i].firstNumber;
} else {    
operations[i].calculus=roundToDecimals(Number(operations[i].firstNumber)/Number(operations[i].secondNumber), decimalsToRound).toString();
}
default: break;
}
}
}

change=(element)=>{
switch (element){
case "AC":
operations.splice(0,operations.length);
operations.push(new Operation("","","",""));
break;
case "+/-":
operations[actualOperation()][actualOperationNumberToChange()]=formatATypedNumber(operations[actualOperation()][actualOperationNumberToChange()]);//firstly format the actual number to change to be able to operate with it
operations[actualOperation()][actualOperationNumberToChange()]=roundToDecimals((-1*Number(operations[actualOperation()][actualOperationNumberToChange()])),decimalsToRound).toString();
//console.table(operations)
break;
case "%":
operations[actualOperation()][actualOperationNumberToChange()]=formatATypedNumber(operations[actualOperation()][actualOperationNumberToChange()]);//firstly format the actual number to change to be able to operate with it
operations[actualOperation()][actualOperationNumberToChange()]=roundToDecimals((Number(operations[actualOperation()][actualOperationNumberToChange()])/100),decimalsToRound).toString();
break;
default: break;
}
}

formatFirstNumber=()=>{
if(operations[actualOperation()].firstNumber===""){
operations[actualOperation()].firstNumber="0";
}
}

showScreenOperation=()=>{
if(operations[actualOperation()].firstNumber==="" && operations[actualOperation()].secondNumber==="" && operations[actualOperation()].operator===""){
screenoperation.innerHTML="";
} else {
screenoperation.innerHTML=operationAtScreen(actualOperation());
}
return
}

showScreenHistorial=()=>{
screenhistorial.innerHTML=historicOperationsTxt();
return
}

showBatteryLevel=()=>{
batterylevel.value=21-operations.length;
return
}

showAll=()=>{
showScreenOperation();
showScreenHistorial();
showBatteryLevel();
return
}

roundToDecimals=(a,b)=>{//a the number to round, b the decimals
ax10ElevadoAb = a * Math.pow(10, b);
return Math.round(ax10ElevadoAb) / Math.pow(10, b)
}

//New Functions
formatATypedNumber =(a)=>{
if (a[0]==="-"){
signPart="-"
}else{
signPart="+"
}


if(a.includes(".")){
partsOfATypedNumber = a.split(".");
integerPart=Math.abs(partsOfATypedNumber[0]).toString();
decimalPart=partsOfATypedNumber[1];
decimalSymbol=".";
} else {
integerPart=Math.abs(a).toString();
decimalPart="";
decimalSymbol="";
}

return signPart + "" + integerPart + "" + decimalSymbol + ""+ decimalPart;
}


//Events
buttonNumber.forEach(item => {
item.addEventListener('click', () => {
if(operations[actualOperation()].operator===""){
orderNumber="firstNumber"
} else {
}

if(item.innerHTML==="." && operations[actualOperation()][orderNumber].includes(".")){
operations[actualOperation()][orderNumber]=operations[actualOperation()][orderNumber];
} else {
operations[actualOperation()][orderNumber]=operations[actualOperation()][orderNumber]+""+item.innerHTML;
}
//console.table(operations);
showAll();
})
})


buttonNumbercol2.forEach(item => {
item.addEventListener('click', () => {//same function as buttonNumber.forEach click
if(operations[actualOperation()].operator===""){
orderNumber="firstNumber"
} else {
orderNumber="secondNumber"
}

if(item.innerHTML==="." && operations[actualOperation()][orderNumber].includes(".")){
operations[actualOperation()][orderNumber]=operations[actualOperation()][orderNumber];
} else {
operations[actualOperation()][orderNumber]=operations[actualOperation()][orderNumber]+""+item.innerHTML;
}
//console.table(operations);
showAll();
})
})

buttonOperator.forEach(item => {
item.addEventListener('click', () => {
formatFirstNumber();
if(operations[actualOperation()].secondNumber===""){

operations[actualOperation()].operator=item.innerHTML;
orderNumber="secondNumber";
} else {

if(operations[actualOperation()].firstNumber==="" || operations[actualOperation()].secondNumber==="" || operations[actualOperation()].operator===""){
} else {
calculate(actualOperation());
operations.push(new Operation(operations[actualOperation()].calculus,"",item.innerHTML,""));
}
}
//console.table(operations);
showAll();
})
})

buttonequal.addEventListener('click', () => {
if(operations[actualOperation()].firstNumber==="" || operations[actualOperation()].secondNumber==="" || operations[actualOperation()].operator===""){
operations[actualOperation()].operator="";
} else {
calculate(actualOperation());
operations.push(new Operation(operations[actualOperation()].calculus,"","",""));
}
//console.table(operations);
showAll();
})


buttonchanger.forEach(item => {
item.addEventListener('click', () => {
change(item.innerHTML);
//console.table(operations);
showAll();
})
})
    

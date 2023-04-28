//Hello world
console.log('Hello World');

//Variables, Constants and Data types
// variables: let and var are the entities that can hold any information for you during the runtime and the values can be re assigned.
// Constants: always will keep the same value until the end of the execuion. / const = can not be change, must be initialized.

//Data types: string ('' or ""), number, boolean (true or false), null (no value), undefined (no exist, can not use the variable)

//---------------------------------------------------------------------------------

//Concatenation and interpolation
//sintax changed: 
var price = 50
var itemName = "Cup"
var messageConcatination = "The price for your" + itemName+" is "+price+" dollars" //concatination
var messageInterpolation =  `The price for your ${itemName} is ${price} dollars.` //Interpolation= tipical for javascript

//---------------------------------------------------------------------------------

//Objects and Arrays
//Objects: is defined by curly braces
var customer = {
    firstName: 'John',
    lastNmae: 'Smith',
    cars: ["Volvo", "Toyota", "Tesla"]
}
//Dot notation
customer.firstName = "Mike"
// bracket notation
customer['lastNmae'] = "Silver"
//console.log(customer['lastNmae'])
//console.log(`${customer.firstName} ${customer.lastNmae}`)

//Arrays: defined by square braces
var car = ["Volvo", "Toyota", "Tesla"]
car[1] = "BMW"
//console.log(car[1])
//console.log(customer.cars[0])

//---------------------------------------------------------------------------------

//Relational and Equality operators
//> = more than
//< = less than
//>= = more than equal
//<= = less than equal

var result = 10 > 5 //return boolean value for result

//Equalit operators
var x = 1
console.log(x == '1') //true / double equal we are comparing the value x with '1', not compare de data type just the value -> loose comparison / one is equal to one
console.log(x === '1')//false / triple equal is strict comparison -> checking the value but also the data type / 1 is not the same than '1'

//---------------------------------------------------------------------------------

//Logical operators
//Logical "AND"
console.log(true && true)//true / all values have to be true for expression to be true
console.log(true && false)//false 
//Logical "OR"
console.log(true || false)//true / any value should be true for the expression to be true
//Logical "NOT", opposite side. Negative expression
console.log(!true)//False
console.log(6 !== 10)//True

//---------------------------------------------------------------------------------

//Conditional statement
//if

//---------------------------------------------------------------------------------

//Loops
//for(statement1; statement2; statement3){} -> for i loop

//print array using for:
//for of loop -> cars = ["Volvo", "Toyota", "Tesla"]    for(let car of cars){}

//ES6 sintax for each loop. Arrays
//cars.forEach ( car => { })

//---------------------------------------------------------------------------------

//Functions
//is created and in order to call this funtion many times

//declarative functions: can be called in the beginning of the file, even if the function declared in the file is at the end. invoked at any moment in time
function hello(){
    //steps
}
//Anoymus function: can not be called in the beginning of the file.
var hellotwo = function(){
    //steps
}
//ES6 function syntax or arrow function: 
var hellotree = () => {
    //steps
}
//functions with arguments
function hi(name){
    //steps
}
//functions with return
function hitwo(name){
    //steps
    return name
}
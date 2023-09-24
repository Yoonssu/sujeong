//var 
var favoriteFood = 'pizza';
console.log(favoriteFood);

var numOfSlices = 8;
console.log(numOfSlices);

//let

let changeMe = true;

changeMe = false;

console.log(changeMe);


//const -> 상수 선언 변수 
//* 변수를 다시 할당해야 하는 경우 const 를 사용하고, 그렇지 않으면 let을 사용.
const entree = 'Enchiladas';

console.log(entree);

entree = 'Tacos';


//Mathematical Assignment Operators
let levelUp = 10;
let powerLevel = 9001;
let multiplyMe = 32;
let quarterMe = 1152;

levelUp += 5;
powerLevel-=100;
multiplyMe*=11;
quarterMe /= 4;


//The Increment and Decrement Operator
let gainedDollar = 3;
let lostDollar = 50;

gainedDollar++;
lostDollar--;


//String Concatenation with Variables
let favoriteAnimal = 'cat';
console.log('My favorite animal:'+favoriteAnimal); //My favorite animal:cat 출력


//String Interpolation
let myName = 'su';
let myCity = 'seoul';

console.log(`My name is ${myName}. My favorite city is ${myCity}` ); //su와 seoul이 삽입되어 출력


//typeof operator
let newVariable = 'Playing around with typeof.';

console.log(typeof newVariable);
newVariable=1;

console.log(typeof newVariable);




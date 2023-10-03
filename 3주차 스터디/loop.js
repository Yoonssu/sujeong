//루프를 사용하지 않을 때 수동으로 작업해야하므로 복잡함

var vacationSpots = ['a','b','c'];

console.log(vacationSpots[0]);
console.log(vacationSpots[1]);
console.log(vacationSpots[2]);



//for 루프
for (let n=5; n<=10; n++){
    console.log(n);
  }



//for 루프 반대로

for (let counter = 3; counter >= 0 ; counter--){
    console.log(counter);
  }



//배열 활용한 루프
const vacationSpots = ['Bali', 'Paris', 'Tulum'];

for(let i = 0; i < vacationSpots.length; i++){
  console.log('I would love to visit' + vacationSpots[i])
}



//중첩 루프
let bobsFollowers = ['a','b','c','d'];
let tinasFollowers = ['a','b','g'];
let mutualFollowers = [];

for(let i=0; i<bobsFollowers.length; i++){
  for(let j=0; j<tinasFollowers.length; j++){
    if(bobsFollowers[i] === tinasFollowers[j]){
      mutualFollowers.push(tinasFollowers[j])
    }
  }
}




//while loop
const cards = ['diamond', 'spade', 'heart', 'club'];

let currentCard;
while(currentCard!= 'spade'){
  currentCard = cards[Math.floor(Math.random() * 4)];
  
  console.log(currentCard);
}



//do ~ while 문

let cupsOfSugarNeeded = 10;
let cupsAdded =0;

do {
  cupsAdded++;
  console.log("설탕 추가");
}while(cupsOfSugarNeeded>cupsAdded);




//break문 

const rapperArray = ["Lil' Kim", "Jay-Z", "Notorious B.I.G.", "Tupac"];

for (let i=0; i<rapperArray.length; i++){
  console.log(rapperArray[i]);
  console.log("And if you don't know, now you know.");
  if(rapperArray[2]){
    console.log('Notorious B.I.G.');
    break;
  }
}


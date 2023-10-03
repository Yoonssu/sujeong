const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
    for(let i = 1; i <= 1000000; i++) {
      if ( (2 + 2) != 4) {
        console.log('Something has gone very wrong :( ');
      }
    }
  };

  const isTwoPlusTwo = checkThatTwoPlusTwoEqualsFourAMillionTimes;
  isTwoPlusTwo();
  console.log(isTwoPlusTwo.name);

//매개변수로의 기능

const addTwo = num => {
    return num + 2;
  }
  
  const checkConsistentOutput = (func, val) => {
   
    let checkA= val+2;
    let checkB= func(val);
  
    if(checkA == checkB){
      console.log(func(val));
    }
    else {
      console.log('inconsistent results')
    }
  }
  
  console.log();

  

//.forEach() 메소드
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

['mango', 'papaya', 'pineapple', 'apple'].forEach()
//(function(element{console.log(`I want to eat a ${element}`)}));
  

//.map() 메소드

const animals1 = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

const secretMessage = animals1.map(animal => animal[0]);

console.log(secretMessage.join(''));

const bigNumbers = [100, 200, 300, 400, 500];

const smallNumbers = bigNumbers.map(num => num/100);

console.log(smallNumbers)


//.filter() 메소드

const randomNumbers = [375, 200, 3.14, 7, 13, 852];

const small_Numbers = randomNumbers.filter(num => {
  return num < 250;
})

const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];
const longFavoriteWords = favoriteWords.filter(word => {
  return word.length > 7;
})


const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];

const foundAnimal = animals.findIndex(animals => {return animals === 'elephant'});

const startsWithS = animals.findIndex(animals => {return animals[0]==='s'});


//.reduce()

const newNumbers = [1, 3, 5, 7];

const newSum = newNumbers.reduce((accumulator, currentValue) => {
  console.log('The value of accumulator: ', accumulator);
  console.log('The value of currentValue: ', currentValue);
  return accumulator + currentValue;
}, 10);

console.log(newSum);


//+
const words = ['unique', 'uncanny', 'pique', 'oxymoron', 'guise'];
//함수 본문에서 배열 의 요소가 문자 보다 적은 경우 .some()반환
console.log(words.some(word => {
  return word.length < 6;
}));

const interestingWords = words.filter((word) => {return word.length > 5});


console.log(interestingWords.every((word) => {return word.length > 5}));




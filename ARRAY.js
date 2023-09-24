//배열 만들기
const hobbies =['a','b','c'];
console.log(hobbies);

//배열 요소 접근
const famousSayings = ['Fortune favors the brave.', 'A joke is a very serious thing.', 'Where there is love there is life.'];
const listItem = famousSayings[0];

console.log(listItem);
console.log(famousSayings[2]);
console.log(famousSayings[3]);


//let , const 포함된 배열
let condiments = ['Ketchup', 'Mustard', 'Soy Sauce', 'Sriracha'];

const utensils = ['Fork', 'Knife', 'Chopsticks', 'Spork'];

condiments[0]='Mayo';
console.log(condiments);

condiments = ['Mayo'];
console.log(condiments);

utensils[3]='Spoon';
console.log(utensils);


//.length 프로퍼티
const objectives = ['Learn a new language', 'Read 52 books', 'Run a marathon'];

console.log(objectives.length);


//.push 메소드 -> 배열 마지막에 삽입
const chores = ['wash dishes', 'do laundry', 'take out trash'];
chores.push('a','b');
console.log(chores);


//.pop 메소드 -> 배열 마지막 요소 삭제
const chores_ = ['wash dishes', 'do laundry', 'take out trash', 'cook dinner', 'mop floor'];
chores_.pop();
console.log(chores_);


//부가적인 메소드
const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

 groceryList.shift();
 console.log( groceryList); //배열 첫 번쨰 요소 삭제 

  groceryList.unshift('popcorn');
  console.log( groceryList); //배열 첫 번째에 popcorn 삽입

console.log(groceryList.slice(1, 4)); //배열 1부터 4-1:3 까지의 요소 출력
  console.log( groceryList); 
 



//배열과 함수
const concept = ['arrays', 'can', 'be', 'mutated'];

function changeArr(arr){
  arr[3] = 'MUTATED';
}

changeArr(concept);
console.log(concept);

const removeElement = newArr => {
  newArr.pop()
}


//중첩 배열
const numberClusters = [[1,2],[3,4],[5,6]];
const target = numberClusters[2][1];

//-> 6 출력 : 첫 번쨰는 배열 번호, 두 번째는 그 배열 안에서의 배열 번호
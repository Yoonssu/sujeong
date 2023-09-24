//함수 선언
function getReminder(){
    console.log('Water the plants.');
  };
  
  greetInSpanish();
  function greetInSpanish(){
    console.log('Buenas tardes.');
  };

  
//함수 호출
function sayThanks(){
    console.log('Thank you for your purchase! We appreciate your business.');
  }
  
  sayThanks();
  sayThanks();
  sayThanks(); //세 번 호출



//매개변수, 인수
function sayThanks(name) {
    console.log('Thank you for your purchase '+ name + '! We appreciate your business.'
  );
  }
  
  sayThanks('Cole');


//기본 매개변수
function makeShoppingList(item1='milk', item2='bread', item3='eggs'){
    console.log(`Remember to buy ${item1}`);
    console.log(`Remember to buy ${item2}`);
    console.log(`Remember to buy ${item3}`);
  }

  
//return
function monitorCount(rows, columns){
    return rows*columns;
  }
  const numOfMonitors = monitorCount(5,4);
  console.log(numOfMonitors);


//Helper Functions
function monitorCount(rows, columns) {
    return rows * columns;
  }
  function costOfMonitors(rows,columns){
    return monitorCount(rows, columns) *200;
  }
  const totalCost = costOfMonitors(5,4);
  console.log(totalCost);


//함수 표현식
const plantNeedsWater = function(day){
    if(day === 'Wednesday'){
      return true;
    }
    else{
      return false;
    }
  };
  
  plantNeedsWater('Tuesday');
  
  console.log(plantNeedsWater('Tuesday'));

  
//화살표기능
const plant_NeedsWater = (day) => {
    if (day === 'Wednesday') {
      return true;
    } else {
      return false;
    }
  };


//간결한 화살표 기능
const plantNeeds_Water = day =>
   day === 'Wednesday' ? true : false;


   
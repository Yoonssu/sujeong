
let fasterShip = {
    'Fuel Type': 'Turbo Fuel',
    color: 'silver'
  };



//객체 접근 

//.점 사용

let spaceship = {
    homePlanet: 'Earth',
    color: 'silver',
    'Fuel Type': 'Turbo Fuel',
    numCrew: 5,
    flightPath: ['Venus', 'Mars', 'Saturn']
  };

  let crewCount = spaceship.numCrew;
  let planetArray = spaceship.flightPath;



//[] 사용해서 객체 접근 
let space_ship = {
    'Fuel Type' : 'Turbo Fuel',
    'Active Mission' : true,
    homePlanet : 'Earth', 
    numCrew: 5
   };
  let propName =  'Active Mission';

  let isActive = space_ship['Active Mission'];
  console.log(isActive);


//프로퍼티 할당
let spaceship_ = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth',
    color: 'silver',
    'Secret Mission' : 'Discover life outside of Earth.'
  };
  spaceship_.color = 'glorious gold';
  
  spaceship_.numEngines = 9;
  
  delete spaceship_['Secret Mission'];




//메소드
  let retreatMessage = 'We no longer wish to conquer your planet. It is full of dogs, which we do not care for.';
  let alienShip = {
    retreat() {
      console.log(retreatMessage)
    },
    takeOff() {
      console.log('Spim... Borp... Glix... Blastoff!')
    }
  };
  
  alienShip.retreat();
  
  alienShip.takeOff();



//중첩 배열

let spaceship1 = {
    passengers: [{name: 'Space Dog'}], 
    telescope: {
      yearBuilt: 2018,
      model: "91031-XLT",
      focalLength: 2032 
    },
    crew: {
      captain: { 
        name: 'Sandra', 
        degree: 'Computer Engineering', 
        encourageTeam() { console.log('We got this!') },
       'favorite foods': ['cookies', 'cakes', 'candy', 'spinach'] }
    },
    engine: {
      model: "Nimbus2000"
    },
    nanoelectronics: {
      computer: {
        terabytes: 100,
        monitors: "HD"
      },
      'back-up': {
        battery: "Lithium",
        terabytes: 50
      }
    }
  }; 
  
  let capFave = spaceship1.crew.captain['favorite foods'][0];
  
  let firstPassenger = spaceship1.passengers[0];



//중첩된 객체

let spaceship2 = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth'
  };
  
  let greenEnergy = obj => {
    obj['Fuel Type'] = 'avocado oil';
  }
  
  let remotelyDisable = obj => {
    obj.disabled = true;
  }
  
  greenEnergy(spaceship2);
  
  remotelyDisable(spaceship2);
  
  console.log(spaceship2)


//loop +객체

let spaceship3 = {
    crew: {
    captain: { 
        name: 'Lily', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'Dan', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'Clementine', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'Shauna', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 

for (let crewMember in spaceship3.crew) {
  console.log(`${crewMember}: ${spaceship3.crew[crewMember].name}`)
};

for (let crewMember in spaceship3.crew) {
  console.log(`${spaceship3.crew[crewMember].name}: ${spaceship3.crew[crewMember].degree}`)
};





//블록 , 범위
const city = 'New York City';

const logCitySkyline= () =>{
  let skyscraper = 'Empire State Building';
  return 'The stars over the ' + skyscraper + ' in ' + city;
}
console.log(logCitySkyline()) ;

//전역
const satellite ='The Moon';
const galaxy = 'The Milky Way';
const stars = 'North Star';

function callMyNightSky(){
  return 'Night Sky: ' + satellite + ', ' + stars + ', and ' + galaxy;
}

console.log(callMyNightSky());



//지역
const logVisibleLightWaves=()=>{
    const lightWaves = 'Moonlight';
    console.log(lightWaves);
  };
  logVisibleLightWaves();
  //console.log(lightWaves);


//범위 오류
const satellite_ = 'The Moon';
const galaxy_ = 'The Milky Way';
let stars_ = 'North Star';

const callMyNightSky = () => {
  stars_ = 'Sirius';
	return 'Night Sky: ' + satellite_ + ', ' + stars_ + ', ' + galaxy_;
};

console.log(callMyNightSky());
console.log(stars_);  // 어느 변수인지 확실하지 않음


//범위 지정 확실하게

const logVisible_LightWaves = () => {
    let lightWaves = 'Moonlight';
      let region = 'The Arctic';
    // Add if statement here:
     if (region === 'The Arctic'){
      let lightWaves = 'Northern Lights';
      console.log(lightWaves);
    }
    
    console.log(lightWaves);
    console.log(lightWaves);
  };
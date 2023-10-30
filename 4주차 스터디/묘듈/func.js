const {odd,even} = require('./var'); //불러올 모듈의 경로를 적음 odd 와 even 이라는 변수를 불러옴

function check(num){
    if(num%2){
        return odd;
    }
    return even;
}

module.exports =check; 

// ES2015 모듈 도입 후 

import {odd,even} from './var'; //불러올 모듈의 경로를 적음 odd 와 even 이라는 변수를 불러옴

function check(num){
    if(num%2){
        return odd;
    }
    return even;
}

export default check;



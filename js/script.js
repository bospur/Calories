let result = document.querySelector('.counter__result');

let obj = {};

// Выберем пол и добавим в обьект с данными

let male = document.querySelector('#gender-male');
let female = document.querySelector('#gender-female');



male.addEventListener('change', function(evt){
    obj.gender = evt.target.value;
});

female.addEventListener('change', function(evt){
    obj.gender = evt.target.value;
});

// Возраст Рост Вес

let age = document.querySelector('#age');
let height = document.querySelector('#height');
let weight = document.querySelector('#weight');

let parametres = [age, height, weight]

for(let param of parametres){

    param.addEventListener('input', function(evt){

        console.log(evt.target.value)
    })
}

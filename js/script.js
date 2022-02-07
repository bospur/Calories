//TODO начал заниматься кнопкой отчистки параметров
// нужно разобраться как установить значение радиокнопок по дефолту

let result = document.querySelector('.counter__result');

let parameterStorage = {
    gender: 'male',
    activ: 1.2,
};

// Выберем пол, рост, вес и возраст и добавим в обьект с данными

let male = document.querySelector('#gender-male');
let female = document.querySelector('#gender-female');
let age = document.querySelector('#age');
let height = document.querySelector('#height');
let weight = document.querySelector('#weight');
let submitButton = document.querySelector('.form__submit-button')
let resetButton = document.querySelector('.form__reset-button')
let parametres = [age, height, weight, female, male]

let activites = document.querySelectorAll('.radio')

for(let active of activites){
   let changer = active.querySelector('input');
   changer.addEventListener('change', function(evt){
    parameterStorage.activ = evt.target.dataset.kef;
    checkFilling(parameterStorage);
   })
}

for(let param of parametres){
    addInputParamHandler(param)
}

function addInputParamHandler(param) {
    param.addEventListener('change', function(evt){
        parameterStorage[evt.target.name]= evt.target.value;
        checkFilling(parameterStorage)
    });
}

// формула расчета нормы
function calcCaloriesNorm({gender, age, height, weight}){    
    if(gender === 'male'){
        return (10 * weight) + (6,25 * height) - (5 * age) + 5;
    }
    return (10 * weight) + (6,25 * height) - (5 * age) - 161;
}

//Проверяем заполнены ли все поля
function checkFilling(obj){
    if(obj.gender && obj.activ && obj.height > 0 && obj.weight > 0 && obj.age > 0){
        submitButton.disabled = false;
        resetButton.disabled = false;
    } else {
        submitButton.disabled = true;
        resetButton.disabled = true;
    }
}

function resetAll(parameterStorage, parametres, activites){
    return function(){
        for(let param of parametres){
            if(param == male || param == female){
                param.cheсked = true;
                continue;
            }
            param.value = 0;
            parameterStorage[param.name] = param.value;        
        }

        parameterStorage.activ = 1.2;
        parameterStorage.gender = 'male';
        checkFilling(parameterStorage);
        console.log(parameterStorage);
        
    }
}
resetButton.addEventListener('click',  resetAll(parameterStorage, parametres, activites))
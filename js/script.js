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
let parametres = [age, height, weight, male, female]

let activites = document.querySelectorAll('.radio')

for(let active of activites){
   let changer = active.querySelector('input');
   changer.addEventListener('change', function(evt){
    parameterStorage.activ = +(evt.target.dataset.kef);
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
        return (10 * +weight) + (6,25 * +height) - (5 * +age) + 5;
    }
    return (10 * +weight) + (6,25 * +height) - (5 * +age) - 161;
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

// очищаем поля и  обнуляем данные в обьекте
function resetAll(parameterStorage, parametres, activites){
    return function(){
        console.log(parameterStorage)
        for(let param of parametres){
            parameterStorage[param.name] = '';        
        }
        parameterStorage.activ = 1.2;
        parameterStorage.gender = 'male';
        console.log(parameterStorage);
        result.classList.add('counter__result--hidden')
        checkFilling(parameterStorage);
        
    }
}

resetButton.addEventListener('click',  resetAll(parameterStorage, parametres, activites));
submitButton.addEventListener('click', function(evt){
    evt.preventDefault();

    let resulto = Math.round(calcCaloriesNorm(parameterStorage) * parameterStorage.activ);
    
    let normCalories = document.querySelector('#calories-norm');
    normCalories.textContent = `${resulto}`;

    let minimalCalories = document.querySelector('#calories-minimal');
    minimalCalories.textContent = `${Math.round(resulto - (resulto * 0.15))}`;

    let maximumCalories = document.querySelector('#calories-maximal')
    maximumCalories.textContent = `${Math.round(resulto + (resulto * 0.15))}`;

    result.classList.remove('counter__result--hidden');
    console.log(parameterStorage)
})
import about from './hedgehog.html'
import './css/hedgehog.css'
import './css/hedgehog-header.css'
import './css/hedgehog-banner.css'
import './css/hedgehog-footer.css'
import './css/hedgehog-about.css'
import './css/hedgehog-features.css'
import './css/hedgehog-enemies.css'
import './css/hedgehog-life.css'
import './css/hedgehog-chat.css'
import './css/hedgehog-register.css'
import '@fortawesome/fontawesome-free/js/all'
import './images/hedgehog-2.jpg'
import './images/hedgehog.jpg'

import _ from "loadsh";
import {phrase, helloWorld as hw} from './scripts/helloworld'
/* const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

numbers.forEach((item, index) => {
    console.log(`${item} - ${index}`);
}); */


var a = 10;
console.log(a)
var b, c, d; // undefined

a = 'Andrew'
console.log(a)
a = 'Andrew "Teacher" Lobov';
console.log(a)

var isTeacher = false;
var b = 100.5;

var result = (1 + 1 - 4) * 2 / (5 % 2)

var result = result > 5 
    ? 10 
    : result;

const gravity = 9.8;

//gravity = 0;
var a = 17;
console.log(a)
let hello = 'World';

helloWorld('');

function helloWorld(name= 'Mother fucker') {
    console.log(typeof name);
    if (typeof name !== 'string') {
        throw 'The name must be a string'
    }
    var name = name 
        ? name
        : 'world'
    console.log('Hello ' + name + '!');
}

function add(valueA, valueB) {
    let a = 'WTF!!!'
    return valueA + valueB;
}

var result = add(10, 20);
console.log(a);
console.log(result);

function numbersAction(valueA, valueB, callback = add) {
    return callback(valueA, valueB);
}

var result = numbersAction(1, 2, function(a, b) { 
    return a * b;
 });

var result = numbersAction(1, 2);

 console.log(result);

//sayHello();
var sayHello =  ()=> {
    console.log('Hello');
}

sayHello();


var r = numbersAction(1, 2, (a, b)=>{
    a+=1;
    return a * b
});
console.log(r);



function closureDemo() {
    console.log(this);
    function closureDemoFirst() {
        console.log('first')
        var first = 'first'
        console.log(this);

        function closureSecond() {
            console.log('second')
            var second = 'second'
            console.log(this)
        }
        closureSecond();
    }

    closureDemoFirst();
}

console.log(this);
closureDemo();


let numbers = [1,2, 3, 5, 6, 7, 8];
/* numbers[1]= 10;
numbers[2]= 'Andrew';

numbers.push(false);
delete numbers[1]; */
//numbers.splice(2, 1);
console.log(numbers);

numbers.sort((a, b)=> b- a);
console.log(numbers);

let names = ['Andrew','Vika', 'Anna', 'Vlad', 'Georgy', 'Roman', 'Dmity'];

names.sort((a, b)=> { return a.match(b)} );

console.log(names);


names.forEach((item, index)=> {
    console.log(index+1 + ' ' + item);
})

/* var numbersNtrans =  numbers.map((item, index)=> {
    return index * Math.pow(item, 2);
}) */

var numbersNtrans =  numbers.filter(function(item, index){

    return item > 3;
})

console.log(numbersNtrans);

var student = {
    firstName: 'John',
    secondName: 'Doe',
    hobbies: ['sport', 'dancing'],
    sayHello: function(phrase) {
        console.log(phrase);
    },
    marks: {
        math: 4,
        phisycs: 5,
        objectProgramming: 3.5
    },
    'Languages': ['ru', 'en'], 

};

student.sayHello('WTF!');
console.log(student.marks.math);
console.log(student['Languages']);

student.gender = 'men';

console.log(student.gender);
console.log(student);
var anotherStudent = student;

for (var key in student) {
    const element = student[key];
    console.log(element);
}

function Student() {
    this.firstName = null;
    this.secondName = null;

    function sayGoodBye ()  {
        console.log('constant', constant);
        console.log('good bye logic');
    }
    var constant = 10;

    this.sayHello = function() {
        console.log(this)
        sayGoodBye()
        console.log(`Hello, i am ${this.firstName} ${this.secondName}`);
    }
}

var s = new Student();
var s2 = new Student();
console.log(s);
s.firstName = "Andrew";
s.secondName = 'Lobov';





var date = new Date(2020, 4, 11);

var myBirtDay = new Date(1989, 10, 6);
var result = date - myBirtDay;
console.log(new Date(result));

//console.log(new Date(Date.now()));


if(true) {
    console.log('true branch')
} else if('' || 0 || undefined ) {

} else  {

} 

/* операторы сравнения  */
false, '', 0
var biggerThan = 1 > 0; // true
var biggerOrEqualThan = 1 >= 0; // true
var lessThan = 1 < 0; // false
var lessOrEqualThan = 1 <= 0;  // false;

var isEqual = 1 == 1; // true
var isRealyEqual = 1 == "1"; // true ага, вот так вот == это слабое стравнение
var isRealyEqualStrong = 1 === "1"; // false типы однако, больше равенства богу, равентсва

var isNotEqual = 1 != 1; // false
var isNotEqualStrong = 1 !== 1; // false да-да, строгое равенство и неравенство

var complexConditionAnd = (1===1) && ('Andrew' === 'Lobov'); // false
var complexConditionOr = (1===1) || ('Andrew' === 'Lobov'); // true


function counter(initValue)  {
    var current = initValue || 0;
    return function() {
        current+=1;
        return current;
    }
} 


/* 
var counter1 = counter(10);

var counter2 = counter();

console.log(counter1());

console.log(counter1());
console.log(counter2());
console.log(counter2());
console.log(counter2()); */

/* var studentString = JSON.stringify(student);
console.log(studentString);
var studentClone = JSON.parse(studentString);
console.log(studentClone); */

/* console.log('start long action')
setTimeout((a, b)=> {
    console.log(b);
    console.log('Long ti,e action')
}, 1000 * 5, 10, 'Do work');

console.log('wait long action') */

function longTimeTask(valueA, valueB) {
    return new Promise((resolve, reject)=>{
        console.log('Long time action start');
        setTimeout((a, b)=> {
            
            var result = a + b;
            resolve(result);

            reject(new Error('O-ups)'));
        }, 1000 * 5, valueA, valueB);
        
    })
}

console.log('start long action')

longTimeTask(10, 20).then(result=>{
    console.log(`Long time action complete with result ${result}`);
    
}).catch(error=> {
    console.log(error)
})

console.log('wait long action')


console.log(document.getElementById('header'));

var menuIntems = document.getElementsByClassName('menu-item');

console.log(menuIntems);
console.log(document.forms)

var chat = document.querySelector('.hedgehog-chat');
console.log(chat);
var messages = chat.querySelectorAll(
    '.hedgehog-chat .chat-area .messages-list .message');

console.log(messages);

messages.forEach(m=> {
    console.log(m.children);
})

//feature
var featuresBlock = document.querySelector('.hedgehog-features')
var features = featuresBlock.querySelectorAll('.feature');

features.forEach(feature=> {
    feature.classList.toggle('top');
});

//featuresBlock.remove();

window.addEventListener('scroll', function(e) {
    console.log(e);
    console.log(window.pageYOffset);
})


window.addEventListener('resize', function(e) {
    console.log(e);
    console.log(`${window.innerWidth}X${window.innerHeight}`);
})

document.querySelectorAll('.enemy').forEach(enemy=> {
    enemy.addEventListener('click', e=> {
        enemy.remove();
    })
})


document.forms.register.addEventListener('submit', e=> {
    e.preventDefault();
    console.log('preventDefault');

    location = 'https://docs.microsoft.com'
    
});

//console.log(helloModule); 


/* helloModule.phrase = 'Bye'
helloModule.hw({ name: 'Andrew', phrase: 'Ok' }); */

console.log(phrase);
hw();
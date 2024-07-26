// Asynchronus js
// aisa koi vi code jispe time lagta hai vo most of the case async code maan kar side stack me daal dia jata hai.

// setTimeout
console.log("1");
console.log("2");
setTimeout(()=>{
    console.log("3");
}, 4500)
console.log("4");   // for stopping use, clearTimeout();

// setInterval
let count = 0;
const setinvt = setInterval(()=>{
    count++;
    console.log(count + " => use setInterval");
    if(count === 4){
        clearInterval(setinvt);
    }
}, 800)

// Fetch API
fetch(`https://randomuser.me/api/`)
.then(raw => raw.json())
.then(readable => console.log(readable.results[0].email))

// callbacks
// que : user se data maango, aur jab data aa jye tab us data ke name, gender aur email ko print karo
function user_data(url, callback){
    fetch(url)
    .then(raw =>raw.json())
    .then(readable =>{
        callback(readable)
    })
}
user_data("https://randomuser.me/api/", function(readable){
    console.log(readable.results[0].email);
    console.log(readable.results[0].name.first, " is ", readable.results[0].gender);
})

// axios -> same as fetch but result already convert to readable type, and we need to add a cdn of axios on top of the js file in HTML
axios.get(`https://randomuser.me/api/`)
.then(result => {
    console.log(result.data.results[0].location.city);
});

// promise
const abcd = new Promise((resolve, reject)=>{
    // any async. code
    fetch(`https://randomuser.me/api/`)
    .then(raw => raw.json())
    .then(result =>{
        if(result.results[0].gender === "male"){
            resolve();   // then() wala part
        }
        else{
            reject();   // catch wala part
        }
    })
});

abcd
.then(function(){                                 //  *** func_name ke baad .then() and .catch() asehi lagana hai, abcd.then() or catch() nehi ***
    console.warn("bhai ye male hai");
})
.catch(function(){
    console.error("ladki ha bhai");
})

// Callbacks vs promises vs Async/Await
// que: ek url se data lekar aao aur use console par show karo
function abcde(url, callback){
    fetch(url)
    .then(raw => raw.json())            //  (i) callback
    .then(read => callback(read))
}
abcde(`https://randomuser.me/api/`, (data)=>{
    console.log(data.results[0]);
});

// const abcd = new Promise() --> promises pattern
const parchi = new Promise((resolve, reject)=>{
    fetch(`https://randomuser.me/api`)
    .then(raw =>raw.json())
    .then(read =>{                             //  (ii) promises
        resolve(read)
        reject()
    })
})
parchi
.then((read)=>{
    console.log(read.results[0].location.country);
})
.catch(()=>{
    console.error("sorry bro");
})

// or

function abcde(url){
    const abcd2 = new Promise(function(resolve, reject){
        fetch(url)                                            //  (ii) promises
        .then(raw => raw.json())
        .then(read => resolve(read))
    })
    return abcd2
}
abcde(`https://randomuser.me/api`)
.then((read)=>{
    console.log(read.results[0].email)
})


async function abcd0(url){
    let a = await fetch(url)
    let read = await a.json()               //  (iii) async/await
    return read
}
async function ff(){
    let b = await abcd0(`https://randomuser.me/api`);
    console.log(b.results[0]);
}
ff();


// Generators
// generators execution ko beech me pause kar sakta hai, aur then next() lagane ke baad baki execution proceed karta hai
// que: print 1 to 10 with first 1-3 then 4-8 and then 9-10
function* fff(){
    for(let i = 1; i <= 3; i++){
        console.log(i);
    }
    yield 1;
    for(let i = 4; i <= 8; i++){                 // generators
        console.log(i);
    }
    yield 2;
    for(let i = 8; i <= 10; i++){
        console.log(i);
    }
    yield 3;
}
const ans = fff()
ans.next();   // 1 to 3
ans.next();   // 4 to 8
ans.next();   // 8 to 10


// web-workers
// que: sum of num 1 to 1000
var num = Array.from({length : 1000}, (a, b)=>b+1);
const worker = new Worker("worker.js"); 
worker.postMessage(num);

worker.onmessage = function(data){
    console.log(data);
}

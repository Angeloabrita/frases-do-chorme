

//**get only random prop from frases if erro in get data from API*/
var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

//** get data form API else get data from data.json local */
async function load() {

  let shitAgain = []
  //get json data API from allugofrases.herokuapp.com
  await fetch('https://allugofrases.herokuapp.com/frases/random')
    .then((res) => res.json())
    .then((resJson) => {

      //**push the notification */  
      
      chrome.notifications.create('test', {
        type: 'basic',
        iconUrl: 'icon128.png',
        title: resJson['autor'],
        message: resJson['frase'] + " - " + resJson['livro'],
        priority: 1
      })

      
    }).catch(() => {
      //**if API donw use the local json frases */
      fetch('./data.json')
        .then((res) => res.json())
        .then((resJson) => {

          //**randomize the local frases */
          shitAgain.push(randomProperty(resJson));

          //**push the notification */  
          chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: 'icon128.png',
            title: shitAgain[0]['autor'],
            message: shitAgain[0]['frase'] + " - " + shitAgain[0]['livro'],
            priority: 1
          })
        })
    });
}


//action on start
chrome.runtime.onStartup.addListener(function () {
  console.log('open');
});


//**create the alarm func */
function alarme(name, time) {
  chrome.alarms.get(name, a => {
    if (!a) chrome.alarms.create(name, {
      when: Date.now(),
      periodInMinutes:time,
    
    });
  });
}


function getStorage (key) {
  return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (value)=>{
          if(chrome.runtime.lastError){
              return reject(chrome.runtime.lastError);
          }
          console.log("do get")
          return  resolve(value);
      })
  });
}

function setStorage (item) {
  return new Promise((resolve, reject) => {
      chrome.storage.sync.set(item, ()=>{
          if(chrome.runtime.lastError){
              return reject(chrome.runtime.lastError);
          }
          console.log("do set")
          return  resolve();
      })
  });
}




//**create the alert to set notification */
chrome.runtime.onInstalled.addListener(() => {

 
  getStorage('time')
  .then(value => {
    console.log(value['time']);
    /**if time value is undefined set the defaut value to 2 min */
    if(typeof value['time'] == 'undefined'){
      console.log('set defaut')

      setStorage({"time":2}).then(()=>{
        alarme('ALARMI', 2); 
      
      });

      getStorage('time').then(value =>{
        alarme('ALARMI', value['time']);
        console.log(value['time']);
      })

  }
 
    
  })
  //...
  .catch(err => {
     //handle err
     console.log(err); 
  });

  
 

  
});



chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'ALARMI') {
    load();
  }
});




  //'https://allugofrases.herokuapp.com/frases/random'


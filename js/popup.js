
(async () => {
  const response = await fetch('https://www.pensador.com/frases_inteligentes/');
  const text = await response.text();
  console.log(text.match(/(?<=\<h1>).*(?=\<\/h1>)/));
})()


chrome.storage.sync.get('time', (time)=>{

  document.getElementById('replyTime').innerHTML =  time['time'] + " (min)";
})



//** Event for btn save time in storage */
document.getElementById('btnSalveTime')
.addEventListener('click', ()=> {
 let time = document.getElementById('timeIn').value;

  chrome.storage.sync.set({"time": time}, () => {
         
    alert('Alarme alterado para ' + time + " minutos");
});

});


//**push value to label */






  //"https://allugofrases.herokuapp.com/frases/random"
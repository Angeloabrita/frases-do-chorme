
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


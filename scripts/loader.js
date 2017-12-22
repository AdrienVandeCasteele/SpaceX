const load = document.querySelector('.load'),
      logoStart = document.querySelector('.logoStart'),
      progressBar = document.querySelector('.progressBar')
window.onload = function(){
  load.style.zIndex = "1";  
  load.style.opacity="0";
  window.setTimeout(()=>{
    load.style.display="none"
  }, 1500)
};

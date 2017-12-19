const $main = document.querySelector("main"),
      $home = $main.querySelector("section.home"),
      $transports = $main.querySelector("section.transports"),
      $bfr = $main.querySelector("section.bfr"),
      $stats = $main.querySelector("section.stats"),
      $sections = [$home, $transports, $bfr, $stats],
      $navBar = document.querySelector('nav.navBar'),
      $navParts = Array.from($navBar.querySelectorAll('li'))

let currentSection = 0,
    canScroll = false,
    freeScroll = false,
    scrolled = false,
    currentScroll = 0

const goToSection = (section)=>{
  currentSection = section
  console.log(section)
  $main.style.transform=`translateY(${-section*25}%)`
}

for(let i=0; i<$navParts.length; i++){
  $navParts[i].addEventListener('click', ()=>{goToSection(i)})
}

window.addEventListener('scroll', (e)=>{
  e.preventDefault()
  const offset = window.pageYOffset
  let toTop = 0
  if(offset>=currentScroll && currentSection<4){
    toTop = 1
  } else if(currentSection>0){
    toTop = -1
  }
  if(!scrolled){
    scrolled = true
    console.log('ça scroll')
    goToSection(currentSection+toTop)
    window.setTimeout(()=>{
      scrolled = false
    }, 2000)
  }
  currentScroll = offset
})



// CANVAS

//background
const map = $home.querySelector("canvas.map"),
      mapBackground = $home.querySelector("img.map"),
      context = map.getContext("2d")

let canvasCoords = map.getBoundingClientRect()


window.addEventListener("resize", ()=>{
  canvasCoords = map.getBoundingClientRect()
})

//destinations
const newYork = {
  x: 170,
  y: 225,
  r: 4,
  text: "NEW YORK",
  textX: 190,
  textY: 210,
  textW: 0,
  textH: 30,
  hover: false,
  selected: false
},
      paris = {
        x: 383,
        y: 192,
        r: 4,
        text: "PARIS",
        textX: 403,
        textY: 177,
        textW: 0,
        textH: 30,
        hover: false,
        selected: false
      },
      shanghai = {
        x: 665,
        y: 245,
        r: 4,
        text: "SHANGHAI",
        textX: 515,
        textY: 230,
        textW: 0,
        textH: 30,
        hover: false,
        selected: false
      },
      moscou = {
        x: 470,
        y: 160,
        r: 4,
        text: "MOSCOU",
        textX: 490,
        textY: 145,
        textW: 0,
        textH: 30,
        hover: false,
        selected: false
      },
      dakar = {
        x: 350,
        y: 275,
        r: 4,
        text: "DAKAR",
        textX: 370,
        textY: 260,
        textW: 0,
        textH: 30,
        hover: false,
        selected: false
      }

const destinations= [newYork, paris, shanghai, moscou, dakar]
let activeDestinations = []

const changeSize = (destination)=>{
  if(destination.hover){
    destination.r += 0.2*(10-destination.r)
  } else if(!destination.selected){
    destination.r += 0.2*(4-destination.r)
  }
}

const displayTitle = (destination)=>{
  if(destination.hover || destination.selected){
    destination.textW += 0.2*(130-destination.textW)
  } else{
    destination.textW += 0.2*(0-destination.textW)
  }
}

const updateMouse = (e)=>{
  for(destination of destinations){
    if((e.clientX-canvasCoords.left>=destination.x-10 && e.clientX-canvasCoords.left<=destination.x+10) &&
       (e.clientY-canvasCoords.top>=destination.y-10 && e.clientY-canvasCoords.top<=destination.y+10)){
      destination.hover = true
    } else{
      destination.hover = false
    }
  }
}

const activateDestination = (e)=>{
  for(destination of destinations){
    if((e.clientX-canvasCoords.left>=destination.x-10 && e.clientX-canvasCoords.left<=destination.x+10) &&
       (e.clientY-canvasCoords.top>=destination.y-10 && e.clientY-canvasCoords.top<=destination.y+10)){

      destination.selected = !destination.selected

      if(destination.selected){
        if(activeDestinations.length>=2){
          activeDestinations[1].selected = false
          activeDestinations.pop()
        }
        activeDestinations.push(destination)
        console.log(activeDestinations)
      } else{
        console.log("noui")
        for(let i=0; i<activeDestinations.length; i++){
          console.log("coucou")
          if(!activeDestinations[i].selected){
            activeDestinations.splice(i, 1)
            console.log(activeDestinations)
          }
        }
      }
      status = activeDestinations.length
      updateText()
    }
  }
}

const drawDot = (destination)=>{
  context.beginPath()
  context.arc(destination.x, destination.y, destination.r, 0, Math.PI*2)
  context.fillStyle="none"
  context.fillStyle = "#ffffff"
  context.fill()
}

const drawText = (destination)=>{
  context.beginPath()
  context.rect(destination.textX, destination.textY, destination.textW, destination.textH)
  context.fillStyle="#f11b93"
  context.fill()
  context.font = "22px Lato"
  context.fillStyle = "#ffffff"
  context.textAlign = "center"
  context.fillText(destination.text, destination.textX+0.5*destination.textW, destination.textY+23)
  context.clearRect(destination.textX-170+destination.textW, destination.textY, 170-destination.textW, destination.textH)
  context.clearRect(destination.textX+destination.textW, destination.textY, 170-destination.textW, destination.textH)
}

const tick = ()=>{
  window.requestAnimationFrame(tick)
  context.clearRect(0, 0, canvasCoords.width, canvasCoords.height)
  for(destination of destinations){
    displayTitle(destination)
    drawText(destination)
    changeSize(destination)
    drawDot(destination)
  }
}

map.addEventListener('mousemove', updateMouse)
map.addEventListener('click', activateDestination)
tick()

// DOM

const $textBox = $home.querySelector('div.mainText'),
      $instructions = $textBox.querySelector('p.instructions'),
      $instructionsButton = $textBox.querySelector('.gradientButton'),
      InstructionLink = $textBox.querySelector('.buttonLink'),
      $newTextBox = $home.querySelector('.newText'),
      $newTextTitle = $newTextBox.querySelector('p.instructions'),
      $newTextButton = $newTextBox.querySelector('.gradientButton'),
      $newTextLink = $newTextBox.querySelector('.buttonLink')

$newTextBox.classList.remove("active")
$home.appendChild($newTextBox)

const textValues = {
  unselected: "Choose the place of <span class='pinkText'>Departure</span>",
  oneSelected: "Choose the place of <span class='pinkText'>Arrival</span>",
  bothSelected: 'Done!'
}

let status = 0

const updateText = ()=>{
  if(status == 0){
    $instructions.innerHTML=textValues.unselected
    updateButton($instructionsButton, false)
  } else if(status == 1){
    $instructions.innerHTML=textValues.oneSelected
    updateButton($instructionsButton, false)
  } else{
    $instructions.innerHTML=`Travel from <span class="pinkText">${activeDestinations[0].text}</span> to <span class="pinkText">${activeDestinations[1].text}</span>`
    updateButton($instructionsButton)
  }
}

const updateButton = (button)=>{
  if(status == 2){
    button.classList.add("active")
  } else{
    button.classList.remove("active")
  }
}

// BUTTON HANDLER

InstructionLink.addEventListener('click', (e)=>{
  if(status==2){
    e.preventDefault()
    displayEarth()
    startCanvas()
    updateNewText()
    changeMainText()
  }
})

const earth = $home.querySelector("div.mapContainer"),
      cloneCanvas = map.cloneNode(true),
      cloneBackground = mapBackground.cloneNode(true),
      newContext = cloneCanvas.getContext('2d')

const startCanvas = ()=>{
  cloneBackground.style.left="200%"
  earth.appendChild(cloneBackground)
  cloneBackground.classList.add("moving")
  mapBackground.classList.add('moving')
  map.classList.add("moving")
  cloneCanvas.style.left="200%"
  earth.appendChild(cloneCanvas)
  newContext.drawImage(map, 0, 0, cloneCanvas.offsetWidth, cloneCanvas.offsetHeight)
  cloneCanvas.classList.add("moving")
}

const displayEarth = ()=>{
  earth.classList.add("active")
}

const updateNewText = ()=>{
  $newTextTitle.innerHTML=`De ${activeDestinations[0].text} à ${activeDestinations[1].text} en <span class="pinkText">30min!</span>`
}

const changeMainText = ()=>{
  $textBox.classList.remove('active')
  $newTextBox.classList.add('active')
}

$newTextLink.addEventListener('click', (e)=>{
  e.preventDefault()
  goToSection(1)
})




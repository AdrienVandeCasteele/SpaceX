//DATA 
const dataTransport = {
  horse: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim", "horse are nice friends", "horse can die"],
  },
  boat: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim"]
  },
  train: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim"]
  },
  car: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim"]
  },
  plane: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim"]
  },
  bfr: {
    speed : 100,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["horse can't swim"]
  }
}

const dataTravel = {
  paris:{
    newYork: 5790.41,
    shanghai: 9265.51,
    dakar: 4208.83,
    moscou: 2764.3,
  },
  newYork:{
    paris: 5790.41,
    shanghai: 11586.20,
    dakar: 6319.95,
    moscou: 7372.99,
  },
  shanghai:{
    paris: 9265.51,
    newYork: 11586.20,
    dakar: 13288.00,
    moscou: 6819.27,
  },
  dakar:{
    paris: 4208.83,
    shanghai: 13288.00,
    newYork: 6319.95,
    moscou: 6514.83,
  },
  moscou:{
    paris: 2764.3,
    shanghai: 6819.27,
    dakar: 6514.83,
    newYork: 7372.99,
  },
}

// Math functions

const getTiming = (transport, travel)=> {

}

const getDistance = (departure, destination)=>{
  if(destination == paris){
    return departure.distance.paris
  } else if(destination == newYork){
    return departure.distance.newYork
  } else if(destination == shanghai){
    return departure.distance.paris
  } else if(destination == dakar){
    return departure.distance.dakar
  } else if(destination == moscou){
    return departure.distance.moscou
  }
}

const parseTime = (time)=>{
  time = Math.floor(time*60)
  let minutes = time%24
  let hours = Math.floor(time/60)%24
  let days = Math.floor(time/60/24)
  return [Math.floor(days/10), days%10, Math.floor(hours/10), hours%10, Math.floor(minutes/10), minutes%10]
}

//NAV

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
  updateActiveSection(section)
}

const updateActiveSection = (section)=>{
  for(let i=0; i<$sections.length; i++){ $navParts[i].querySelector('.activeSection').classList.remove('active')
                                       }
  $navParts[section].querySelector('.activeSection').classList.add('active')
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
  selected: false,
  distance: dataTravel.newYork,
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
        selected: false,
        distance: dataTravel.paris,
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
        selected: false,
        distance: dataTravel.shanghai,
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
        selected: false,
        distance: dataTravel.moscou,
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
        selected: false,
        distance: dataTravel.dakar,
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
    updateTransportText()
    updateTransportTiming(transportsParts[0])
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
  $newTextTitle.innerHTML=`From ${activeDestinations[0].text} to ${activeDestinations[1].text} in about <span class="pinkText">30min!</span>`
}

const changeMainText = ()=>{
  $textBox.classList.remove('active')
  $newTextBox.classList.add('active')
}

$newTextLink.addEventListener('click', (e)=>{
  e.preventDefault()
  goToSection(1)
})


// TRANSPORT SECTION

//transport nav

const $transportNav = $transports.querySelector('nav'),
      $transportNavParts = Array.from($transportNav.querySelectorAll('li')),
      transportsParts = [dataTransport.horse, dataTransport.boat, dataTransport.train, dataTransport.car, dataTransport.plane, dataTransport.bfr],
      $sliding = $transports.querySelector('.sliding')

// init Transport functions

const updateTransportDot = (transport)=>{
  const $infoDots = transport.DOM.querySelectorAll('.infoDot')
  for(let i=0; i<$infoDots.length; i++){
    $infoDots[i].querySelector('p').textContent=transport.facts[i]
    const coords = $infoDots[i].dataset.coords.split(" ")
   console.log(coords) 
   $infoDots[i].style.transform=`translate(${coords[0]*transport.DOM.offsetWidth}px, ${coords[1]*transport.DOM.offsetWidth}px)`
  }
}

for(let i=0; i<transportsParts.length; i++){
  transportsParts[i].DOM=$transports.querySelectorAll(".transportPic")[i]
  updateTransportDot(transportsParts[i])
}

let currentTransport = 0

for(let i=0; i<$transportNavParts.length; i++){
  console.log('for')
  if(i==0){
    $transportNavParts[i].addEventListener('click', ()=>{
      if(currentTransport>1){
        goToTransport(currentTransport-1)
      } else{
        goToTransport(5)
      }
    })
  } else if(i==7){
    $transportNavParts[i].addEventListener('click', ()=>{
      if(currentTransport<5){
        goToTransport(currentTransport+1)
      } else{
        goToSection(2)
      }
    })

  }else{
    console.log(i)
    $transportNavParts[i].addEventListener('click', ()=>{
      goToTransport(i-1)
    })
  }
}

const goToTransport = (index)=>{
  currentTransport=index
  $sliding.style.transform=`translateX(${-index*100/6}%)`
  updateActiveTransport(index+1)
  updateTransportTiming(transportsParts[index])
}

const updateActiveTransport = (index)=>{
  for(let i=0; i<$transportNavParts.length; i++){
    $transportNavParts[i].classList.remove("active")
  }
  $transportNavParts[index].classList.add("active")
}

//update transport Infos

const $mainInfos = $transports.querySelector('div.mainInfos'),
      $places = $mainInfos.querySelector('p'),
      $timing = $mainInfos.querySelector('div.timing'),
      $screens = Array.from($timing.querySelectorAll('div.screen'))


const updateTransportTiming = (transport)=>{
  const distance = getDistance(activeDestinations[0], activeDestinations[1])
  const time = parseTime(distance/transport.speed)
  for(let i=0; i<$screens.length; i++){
    const $newText= document.createElement('span'),
          $oldText= $screens[i].querySelector('span')
    $newText.innerHTML=time[i]
    $newText.classList.add("hidden")
    $screens[i].appendChild($newText)
    window.setTimeout(()=>{
      $oldText.classList.add("removed")
      $newText.classList.remove("hidden")
      window.setTimeout(()=>{
        $oldText.remove()
      },
                        400)
    },
                      i*100)
  }
}

const updateTransportText = ()=>{
  $places.textContent=`From ${activeDestinations[0].text} to ${activeDestinations[1].text}`
}












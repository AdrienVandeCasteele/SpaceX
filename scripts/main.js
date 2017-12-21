//DATA 
const dataTransport = {
  horse: {
    speed : 15,
    co2: 0,
    cost: 1000,
    facts: ["horse can't swim", "horse are nice friends", "horse can die"],
  },
  boat: {
    speed : 80,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["the boat is the only way (off plane) to reach 2 places separated by the sea", "high price and the long duration of the trip",  "The boat is not accessible to all. Indeed, it is necessary to be close to the sea to be able to consider using it."],
  },
  train: {
    speed : 575,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["the train allows a quick move across a country or continent", "we are limited to traveling on the same country or the same continent", "the train is quite accessible and offers the possibility to move quickly without going in the air"],
  },
  car: {
    speed : 100,
    co2: 115.07,
    risk: 10,
    cost: 1000,
    facts: ["The car offers great accessibility. As a result, it can be used all the time and in all circumstances", " Limited on accessible geographic area ; risk of sleep while driving and very polluting", " the car seems to be pretty accessible to everyone. Today, it is the most used means of transport in the world"],
  },
  plane: {
    speed : 980,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["The car offers great accessibility. As a result, it can be used all the time and in all circumstances", "The plane is a means of transport more and more used in the world.", "It is undoubtedly the most secure and controlled means of transport."]
  },
  bfr: {
    speed : 16000,
    co2: 0,
    risk: 10,
    cost: 1000,
    facts: ["The BFR is 25 times faster than the plane ! ", "The BFR tickets will cost more or less the price of a plane ticket", "The Big Fucking Rocket is only accessible in the Biggest City, like New-York, Dubai, London or Shanghai."]
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

const getDistance = (departure, destination)=>{
  if(destination == paris){
    return departure.distance.paris
  } else if(destination == newYork){
    return departure.distance.newYork
  } else if(destination == shanghai){
    return departure.distance.shanghai
  } else if(destination == dakar){
    return departure.distance.dakar
  } else if(destination == moscou){
    return departure.distance.moscou
  }
}

const getTime = (transport)=>{
  const distance = getDistance(activeDestinations[0], activeDestinations[1])
  return distance/transport.speed
}

const parseTime = (time)=>{
  time = Math.floor(time*60)
  let minutes = time%60
  let hours = Math.floor(time/60)%24
  let days = Math.floor(time/60/24)
  return [Math.floor(days/10), days%10, Math.floor(hours/10), hours%10, Math.floor(minutes/10), minutes%10]
}

//Stats function

const getSpeedStats = (transport)=>{
  let max = transport
  for(let i=0; i<transportsParts.length; i++){
    if(transportsParts[i].speed>max.speed){
      max = transportsParts[i]
    }
  }
  return transport.speed/max.speed*100
}

const getPriceStats = (transport)=>{
  let max = transport
  for(let i=0; i<transportsParts.length; i++){
    if(transportsParts[i].cost>max.cost){
      max = transportsParts[i]
    }
  }
  return transport.cost/max.cost*100
}

const getTimeStats = (transport)=>{
  let max = transport
  for(let i=0; i<transportsParts.length; i++){
    if(getTime(transportsParts[i])>getTime(max)){
      max = transportsParts[i]
    }
  }
  return getTime(transport)/getTime(max)*100
}

//NAV

const $main = document.querySelector("main"),
      $home = $main.querySelector("section.home"),
      $transports = $main.querySelector("section.transports"),
      $bfr = $main.querySelector("section.bfrPage"),
      $stats = $main.querySelector("section.stats"),
      $sections = [$home, $transports, $bfr, $stats],
      $navBar = document.querySelector('nav.navBar'),
      $navParts = Array.from($navBar.querySelectorAll('li')),
      $spaceLogo = $navBar.querySelector('img.logo')

const goToSection = (section)=>{
  if(activeDestinations.length<2){
    activeDestinations = [newYork, shanghai]
    displayEarth()
    startCanvas()
    updateNewText()
    changeMainText()
    updateTransportText()
    updateTransportTiming(transportsParts[0])
    updateTransportSpeed(transportsParts[0])
  }
  currentSection = section
  console.log(section)
  $main.style.transform=`translateY(${-section*25}%)`
  updateActiveSection(section)
  if(currentSection==3){
    updateStats()
  }
}

const updateActiveSection = (section)=>{
  for(let i=0; i<$sections.length; i++){ $navParts[i].querySelector('.activeSection').classList.remove('active')
                                       }
  $navParts[section].querySelector('.activeSection').classList.add('active')
}

for(let i=0; i<$navParts.length; i++){
  $navParts[i].addEventListener('click', ()=>{
    if(i<4){
      goToSection(i)
    } else if(i<8){
      goToSection(i-4)
      menu.classList.toggle('active')
    }
  })
}

let currentSection = 0,
    scrolled = false,
    canScroll = false,
    resetingScroll = false,
    currentScroll = 500

const resetScroll= ()=>{
  resetingScroll = true
  window.scrollTo(0, 500)
  setTimeout(()=>{resetingScroll = false}, 10)
}


window.addEventListener('scroll', (e)=>{
  e.preventDefault()
  if(canScroll){
    const offset = window.pageYOffset
    let toTop = 0
    if(offset>=currentScroll && currentSection<3){
      toTop = 1
    } else if(offset<=currentScroll && currentSection>0){
      toTop = -1
    }
    if(!scrolled){
      scrolled = true
      console.log('ça scroll')
      goToSection(currentSection+toTop)
      window.setTimeout(()=>{
        scrolled = false
      }, 1500)
    }
    resetScroll()
  }
})

// MENU RESPONSIVE
const menu = document.querySelector('#menuResponsive'),
      menuHamburger = document.querySelector('.menu-hamburger'),
      menuToggle = document.querySelector('.menu-toggle')

menuToggle.addEventListener('click', ()=>
                            {                            
  menu.classList.toggle('active')
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
        text: "MOSCOW",
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
      canScroll = true
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
      $newTextButton = $newTextBox.querySelector('.gradientButton'),
      $newTextLink = $newTextBox.querySelector('.buttonLink'),
      $titleBox = $home.querySelector('div.titleBox'),
      $titleTrip = $titleBox.querySelector('p.trip'),
      $titleDistance = $titleBox.querySelector('p.distance'),
      $reset = $home.querySelector('div.reset')

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
    updateTransportSpeed(transportsParts[0])
  }
})


$reset.addEventListener('click', ()=>{
  displayEarth()
  stopCanvas()
  changeMainText()
})


const earth = $home.querySelector("div.mapContainer"),
      cloneCanvas = map.cloneNode(true),
      cloneBackground = mapBackground.cloneNode(true),
      newContext = cloneCanvas.getContext('2d')

const startCanvas = ()=>{
  cloneBackground.style.left="202%"
  earth.appendChild(cloneBackground)
  cloneBackground.classList.add("moving")
  mapBackground.classList.add('moving')
  map.classList.add("moving")
  cloneCanvas.style.left="202%"
  earth.appendChild(cloneCanvas)
  newContext.drawImage(map, 0, 0, cloneCanvas.offsetWidth, cloneCanvas.offsetHeight)
  cloneCanvas.classList.add("moving")
}

const stopCanvas = ()=>{
  cloneBackground.remove()
  cloneCanvas.remove()
  mapBackground.classList.remove('moving')
  map.classList.remove('moving')
}

const displayEarth = ()=>{
  earth.classList.toggle("active")
}

const updateNewText = ()=>{
  $titleTrip.textContent=`${activeDestinations[0].text} - ${activeDestinations[1].text}`
  $titleDistance.textContent=`${getDistance(activeDestinations[0], activeDestinations[1])}km`
}

const changeMainText = ()=>{
  $textBox.classList.toggle('active')
  $newTextBox.classList.toggle('active')
  $titleBox.classList.toggle('active')
}

$newTextLink.addEventListener('click', (e)=>{
  e.preventDefault()
  goToSection(1)
  goToTransport(0)
})


// TRANSPORT SECTION

//transport nav

const $transportNav = $transports.querySelector('nav'),
      $transportNavParts = Array.from($transportNav.querySelectorAll('li')),
      transportsParts = [dataTransport.horse, dataTransport.boat, dataTransport.car, dataTransport.train, dataTransport.plane, dataTransport.bfr],
      $sliding = $transports.querySelector('.sliding')

// init Transport functions

const updateTransportDot = (transport)=>{
  const $infoDots = transport.DOM.querySelectorAll('.infoDot')
  for(let i=0; i<$infoDots.length; i++){
    $infoDots[i].querySelector('p').textContent=transport.facts[i]
    const coords = $infoDots[i].dataset.coords.split(" ")
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
      if(currentTransport>0){
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
  updateTransportSpeed(transportsParts[index])
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
      $screens = Array.from($timing.querySelectorAll('div.screen')),
      $speedJauge = $transports.querySelector('div.fillJauge')

let updatingTime = false

const updateTransportTiming = (transport)=>{
  console.log(updatingTime)
  if(!updatingTime){
    updatingTime=true
    const time = parseTime(getTime(transport))
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
          if(i==$screens.length-1){
            updatingTime=false
          }
        },400)
      },i*100)
    }
  } else{
    window.setTimeout(()=>{updateTransportTiming(transport)}, 400)
  }
}

const updateTransportText = ()=>{
  $places.textContent=`From ${activeDestinations[0].text} to ${activeDestinations[1].text}`
}

// transport speed

const updateTransportSpeed = (transport)=>{
  const ratio = getSpeedStats(transport)
  $speedJauge.style.transform= `translateY(${-ratio}%)`
}

// transport background

const $backgroundCanvas = $transports.querySelector('canvas.background'),
      backgroundContext = $backgroundCanvas.getContext('2d')

let particles = []

const purpleToBlue = backgroundContext.createLinearGradient(0,0,$backgroundCanvas.offsetWidth,0);
purpleToBlue.addColorStop(0,"rgba(58, 0, 99, 0.2)");
purpleToBlue.addColorStop(1,"rgba(27, 20, 100, 0.2)");

$backgroundCanvas.setAttribute("width", $transports.offsetWidth)
$backgroundCanvas.setAttribute("height", $transports.offsetHeight)

const drawParticle = (particle)=>{
  backgroundContext.beginPath()
  backgroundContext.arc(particle.x, particle.y, 2, 0, 2*Math.PI)
  backgroundContext.fillStyle="white"
  backgroundContext.fill()
}

const moveParticle = ()=>{
  backgroundContext.beginPath()

  window.requestAnimationFrame(moveParticle)

  backgroundContext.fillStyle= purpleToBlue
  backgroundContext.rect(0, 0, $backgroundCanvas.offsetWidth, $backgroundCanvas.offsetHeight)
  backgroundContext.fill()
  for(let i=0; i<particles.length; i++){
    drawParticle(particles[i])
    particles[i].x -= transportsParts[currentTransport].speed/20
    if(particles[i].x<-3){
      particles.splice(i, 1)
    }
  }
}

const createParticle = ()=>{
  const particle = {
    x: $backgroundCanvas.offsetWidth,
    y: Math.random()*$backgroundCanvas.offsetHeight
  }
  particles.push(particle)

  window.setTimeout(createParticle, 200)
}

createParticle()

moveParticle()

//BFR SECTION

const $bfrButton = $bfr.querySelector('.gradientButton')

$bfrButton.addEventListener('click', ()=>{goToSection(3)})

// UPDATE STATS

const $priceStatsJauges = Array.from($stats.querySelectorAll('.price .fillJauge')),
      $priceStatsValues = Array.from($stats.querySelectorAll('.price .value')),
      $speedStatsJauges = Array.from($stats.querySelectorAll('.speed .fillJauge')),
      $speedStatsValues = Array.from($stats.querySelectorAll('.speed .value')),
      $timeStatsJauges = Array.from($stats.querySelectorAll('.time .fillJauge')),
      $timeStatsValues = Array.from($stats.querySelectorAll('.time .value'))

const updateStats = ()=>{
  for(let i=0; i<transportsParts.length; i++){
    window.setTimeout(()=>{updatePriceStats(i)}, i*100)
    window.setTimeout(()=>{updateSpeedStats(i)}, i*100 + 300)
    window.setTimeout(()=>{updateTimeStats(i)}, i*100 + 600)
  }
}

const updatePriceStats = (index)=>{
  $priceStatsValues[index].textContent= transportsParts[index].cost
  let ratio = getPriceStats(transportsParts[index])
  $priceStatsJauges[index].style.transform= `translateY(${-ratio}%)`
}

const updateSpeedStats = (index)=>{
  $speedStatsValues[index].textContent= transportsParts[index].speed
  let ratio = getSpeedStats(transportsParts[index])
  $speedStatsJauges[index].style.transform= `translateY(${-ratio}%)`
}

const updateTimeStats = (index)=>{
  const time = parseTime(getTime(transportsParts[index]))

  const parsedTime = `${time[0]}${time[1]}d ${time[2]}${time[3]}h ${time[4]}${time[5]}min`

  $timeStatsValues[index].textContent= parsedTime
  let ratio = getTimeStats(transportsParts[index])
  $timeStatsJauges[index].style.transform= `translateX(${ratio}%)`
}

// RESIZE

window.addEventListener('resize', ()=>{
  $backgroundCanvas.setAttribute("width", $transports.offsetWidth)
  $backgroundCanvas.setAttribute("height", $transports.offsetHeight)
  for(transport of transportsParts){
    updateTransportDot(transport)
  }
})










const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
let time = 0
const board = document.querySelector('#board')
let score = 0
let missclicks = 0
let intervalId = 0
const newGameBtn = document.querySelector('#new-game')
const colors = ['#f7e649ff', '#f70000ff', '#f601f7ff', '#f2782eff', '#702acbff']

startBtn.addEventListener('click', (event) => {
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }

})


function startGame() {
    timeElement.parentNode.classList.remove('hide')
    newGameBtn.classList.remove('visible')

    screens[1].classList.add('up')
    setTime(time)
    intervalId = setInterval(decreaseTime, 1000)
    createRandomCircle()
}


 function decreaseTime() {
    if(time === 0){
        finishGame()
    }else {
        let current = --time

        if(current < 10) timeElement.innerHTML = `00:0${current}`
        else setTime(current)
    }
}

function setTime(timeValue) {
    if(timeValue < 10) timeElement.innerHTML = `00:0${timeValue}`
    else timeElement.innerHTML = `00:${timeValue}`
}

function finishGame() {
    clearInterval(intervalId)

    timeElement.parentNode.classList.add('hide')
    newGameBtn.classList.add('visible')

    board.innerHTML= `<h1>Score: <span class="primary">${score}</span>
    Missclicks: <span class="primary">${missclicks}</span></h1>`

    
    newGameBtn.addEventListener('click', (event) => {
        event.preventDefault()
        screens[1].classList.remove('up')
        board.innerHTML = `<div></div>`
        score = 0
        missclicks = 0
    })
}


function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,25)
    const {width, height} = board.getBoundingClientRect()
    const y = getRandomNumber(0, height - size)
    const x = getRandomNumber(0, width - size)
    const circleColorId = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = colors[circleColorId]

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }else {
        missclicks++
    }    
})

function getRandomColor() {
    const colorId = Math.floor((colors.length - 1) * Math.random())
    return colorId
}

import { setMode } from "./storageWorker.js";

let firstButton = document.getElementById('firstModeButton')
let secondButton = document.getElementById('secondModeButton')
let thirdButton = document.getElementById('thirdModeButton')

firstButton.addEventListener('click', async () => {
    await setMode(1)
    console.log('Выбран первый режим')
})
secondButton.addEventListener('click', async () => {
    await setMode(2)
    console.log('Выбран второй режим')
})
thirdButton.addEventListener('click', async () => {
    await setMode(3)
    console.log('Выбран третий режим')
})
let listDraws = []
let limitNumber = 100
let secretNumber = generateSecretNumber()
let attempts = 1


function textOnScreen(tag, text) {
    let field = document.querySelector(tag)

    field.innerHTML = text
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2})
}

function initialMessage() {
    textOnScreen('h1', 'Jogo do número secreto')
    textOnScreen('p', 'Escolha um número entre 1 e 100')
}

initialMessage()


function generateSecretNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1)
    let quantityElements = listDraws.length

    if (quantityElements == limitNumber) {
        listDraws = []
    }

    if (listDraws.includes(chosenNumber)) {
        return generateSecretNumber()
    } else {
        listDraws.push(chosenNumber)
        return chosenNumber
    }
}

function checkKick() {
    let kick = document.querySelector('input').value
    
    if (kick == secretNumber) {
        textOnScreen('h1', 'Acertou!')

        let wordAttempt = attempts > 1 ? 'tentativas' : 'tentativa'
        let messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordAttempt}!`

        textOnScreen('p', messageAttempts)
        document.getElementById('restart').removeAttribute('disabled')
    } else {
        if (kick > secretNumber) {
            textOnScreen('p', 'O número secreto é menor')
        } else {
            textOnScreen('p', 'O número secreto é maior')
        }

        attempts++
        clearField()
    }
}

function clearField() {
    kick = document.querySelector('input')
    kick.value = ""
}

function restartGame() {
    secretNumber = generateSecretNumber()

    clearField()

    attempts = 1

    initialMessage()
    document.getElementById('restart').setAttribute('disabled', true)
}
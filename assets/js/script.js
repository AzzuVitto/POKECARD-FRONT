const dresseurContainer = document.querySelector('#dresseurContainer')
const formContainer = document.querySelector('#formContainer')
const pokeContainer = document.querySelector('#pokeContainer')
const newDresseurContainer = document.querySelector('#newDresseurContainer')

async function postNewDresseur() {
    const name = document.querySelector('#dresseurName').value
    const age = document.querySelector('#dresseurAge').value
    let response = await fetch("http://localhost:3002/dresseurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            age: age,

        })
    })
    const data = await response.json()
   
    return data

}

async function getDresseurs() {
    const response = await fetch("http://localhost:3002/dresseurs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

async function updateDresseur(dresseur) {
    const name = document.querySelector("#name").value
    const age = document.querySelector("#age").value

    let res = await fetch("http://127.0.0.1:3002/dresseurs/" + dresseur, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            age: age
        })

    })
}

async function deleteDresseur(dresseur) {
    let res = await fetch("http://127.0.0.1:3002/dresseurs/" + dresseur, {
        method: "DELETE"
    })
    window.location.href = "index.html"
}

async function displayDresseur() {
    const dresseurs = await getDresseurs()
    dresseurs.forEach(dresseur => {
        const card = document.createElement('article')
        card.classList.add('dresseurs')

        const title = document.createElement('h3')
        title.textContent = dresseur.name
        card.appendChild(title)
        dresseurContainer.appendChild(card)

        let info = document.createElement('p')
        card.appendChild(info)
        info.textContent = ("AGE: " + dresseur.age)

        let para = document.createElement('div');
        para.classList.add('buttons');
        card.appendChild(para);

        const bOne = document.createElement('button')
        bOne.id = "modif"
        para.appendChild(bOne)

        const bTwo = document.createElement('button')
        bTwo.id = "suppr"
        para.appendChild(bTwo)

        const bThree = document.createElement('button')
        bThree.id = "plus"
        para.appendChild(bThree)

        bOne.innerHTML = "Modifier"
        bOne.addEventListener("click", () => {
            dresseurContainer.style.display = "none"
            displayUpdate(dresseur)
        })
        bTwo.innerHTML = "Supprimer"
        bTwo.addEventListener("click", () => {
            deleteDresseur(dresseur._id)
        })
        bThree.innerHTML = "Détails"
        bThree.addEventListener("click", () => {
            dresseurContainer.style.display = "none"
            add.style.display = "none"
            displayPoke(dresseur)

        });
    })
}
displayDresseur()

function displayUpdate(dresseur) {
    add.style.display = "none"
    const form = document.createElement('form')
    form.classList.add('form')
    formContainer.appendChild(form)

    const inputName = document.createElement('input')
    inputName.type = "text"
    inputName.id = "name"
    inputName.placeholder = dresseur.name
    inputName.classList.add('name')
    form.appendChild(inputName)

    const inputAge = document.createElement('input')
    inputAge.type = "number"
    inputAge.id = "age"
    inputAge.placeholder = dresseur.age
    inputAge.classList.add('age')
    form.appendChild(inputAge)

    const submitButton = document.createElement('button');
    form.appendChild(submitButton);
    submitButton.innerHTML = "Valider";
    submitButton.addEventListener("click", () => {
        updateDresseur(dresseur._id)
    })
}

async function displayPoke(dresseur) {
    const pokemons = await getDresseurs()
    dresseur.pokemons.forEach(pokemon => {
        const card = document.createElement('article')
        card.classList.add('pokemons')

        const poke = document.createElement('h3')
        poke.textContent = pokemon.name
        card.appendChild(poke)
        pokeContainer.appendChild(card)

        const pokeType = document.createElement('div')
        pokeType.textContent = ("TYPE: " + pokemon.type)
        card.appendChild(pokeType)

        const pokeLevel = document.createElement('div')
        pokeLevel.textContent = ("LEVEL: " + pokemon.level)
        card.appendChild(pokeLevel)

        const pokeAttack = document.createElement('div')
        pokeAttack.textContent = ("ATTACK: " + pokemon.attack)
        card.appendChild(pokeAttack)
    })
}
function displayPost() {

    dresseurContainer.style.display = "none"
    add.style.display = "none"

    const addForm = document.createElement('form')
    addForm.classList.add('addForm')
    newDresseurContainer.appendChild(addForm)

    const inputName = document.createElement('input')
    inputName.type = "text"
    inputName.id = "dresseurName"
    inputName.placeholder = "Nom"
    inputName.classList.add('name')
    addForm.appendChild(inputName)

    const inputAge = document.createElement('input')
    inputAge.type = "number"
    inputAge.id = "dresseurAge"
    inputAge.placeholder = "Age"
    inputAge.classList.add('age')
    addForm.appendChild(inputAge)

    const confirmButton = document.createElement('button');
    addForm.appendChild(confirmButton);
    confirmButton.innerHTML = "Valider";
    confirmButton.addEventListener("click", () => {
        postNewDresseur()
    })
}



















const searchByDeparture = document.getElementById('searchByDeparture')
const searchByArrival = document.getElementById('searchByArrival')
const searchByDate = document.getElementById('searchByDate')
const btnSearch = document.getElementById('btnSearch')

const containerFound = document.getElementById('containerFound')
const imgTrajetFound = document.getElementById('imgTrajetFound')
const txtFound = document.getElementById('txtFound')
const url = "http://localhost:3000"

let toBook;

let trajetList = []


// fonctions basics
const formatText = (txt) => {
   return txt[0].toUpperCase() + txt.slice(1).toLowerCase()
}

const getFullHours = (date) => {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

const noTripFound = () => {
        imgTrajetFound.src = '../images/notfound.png'
        txtFound.textContent = 'No trip found.'
}


// fonctions complexes
const makeTravelList = (list) => {
    if (list.length > 0) {
    trajetList = list
    list.map(trajet => trajet.date = new Date(trajet.date))
    console.log(list)
    containerFound.innerHTML = ''
    
    containerFound.innerHTML = list.map(trajet => `<div class="travelList">
            <span>${trajet.departure} > ${trajet.arrival}</span>
            <span>${getFullHours(trajet.date)}</span>
            <span>${trajet.price}€</span>
            <span class="book">Book</span>
        </div>`
    ).join('')
    toBook = document.querySelectorAll('.travelList')
    toBook.forEach(( div, i) => div.addEventListener('click' , () => addToCard(list[i]._id) ) )
    } else {
        noTripFound()
    }
}

// fonctions routes

const searchTrips = async() => {
    try {
    const resp = await fetch(`${url}/trips/find`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure : formatText(searchByDeparture.value) , arrival : formatText(searchByArrival.value), date : new Date(searchByDate.value).setHours(0) }),
        }
    )
    const data = await resp.json()
    if (data.result){
    makeTravelList(data.alltrips)
    } else {
        noTripFound()
    }} catch(err) {
        console.log(err)
        noTripFound()
    }
}


const addToCard = async(index) => {
    try {
        const resp = await fetch(`${url}/trips/tocart`,  {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ tripID : index }),
        })
        const data = await resp.json()
        console.log(data)
        if (data.result) {
        window.location.href = ('../cart/cart.html')
        } else {
            alert(data.error)
        }


    } catch(err) {
        console.log(err)
    }
}




document.getElementById('searchByDate').valueAsDate = new Date()


btnSearch.addEventListener('click', searchTrips)
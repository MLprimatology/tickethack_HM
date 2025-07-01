const searchByDeparture = document.getElementById('searchByDeparture')
const searchByArrival = document.getElementById('searchByArrival')
const searchByDate = document.getElementById('searchByDate')
const btnSearch = document.getElementById('btnSearch')

const containerFound = document.getElementById('containerFound')
const imgTrajetFound = document.getElementById('imgTrajetFound')
const txtFound = document.getElementById('txtFound')


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

const makeTravelList = (list) => {
    if (list.length > 0) {
    list.map(trajet => trajet.date = new Date(trajet.date))
    containerFound.innerHTML = ''
    
    containerFound.innerHTML = list.map(trajet => `<div class="travelList">
            <span>${trajet.departure} > ${trajet.arrival}</span>
            <span>${getFullHours(trajet.date)}</span>
            <span>${trajet.price}€</span>
            <span class="book">Book</span>
        </div>`
    ).join('')
    } else {
        noTripFound()
    }
}

const searchTrips = async() => {
    try {
    const resp = await fetch('http://localhost:3000/trips/find', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure : formatText(searchByDeparture.value) , arrival : formatText(searchByArrival.value), date : new Date(searchByDate.value).setHours(0) }),
        }
    )
    const data = await resp.json()
    if (data.result){
    console.log(data.alltrips)
    makeTravelList(data.alltrips)
    } else {
        noTripFound()
    }} catch(err) {
        console.log(err)
        noTripFound()
    }
}


const date = new Date('02-07-2025')
console.log(date)



btnSearch.addEventListener('click', searchTrips)
const searchByDeparture = document.getElementById('searchByDeparture')
const searchByArrival = document.getElementById('searchByArrival')
const searchByDate = document.getElementById('searchByDate')
const btnSearch = document.getElementById('btnSearch')

const containerFound = document.getElementById('containerFound')

const formatText = (txt) => {
   return txt[0].toUpperCase() + txt.slice(1).toLowerCase()
}

const getFullHours = (date) => {
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

const makeTravelList = (list) => {
    list.map(trajet => trajet.date = new Date(trajet.date))
    containerFound.innerHTML = ''
    
    containerFound.innerHTML = list.map(trajet => `<div class="travelList">
            <span>${trajet.arrival} > ${trajet.departure}</span>
            <span>${getFullHours(trajet.date)}</span>
            <span>${trajet.price}€</span>
            <span class="book">Book</span>
        </div>`
    ).join('')
}

const searchTrips = async() => {
    const resp = await fetch('http://localhost:3000/trips/find', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure : formatText(searchByDeparture.value) , arrival : formatText(searchByArrival.value), date : new Date(searchByDate.value) }),
        }
    )
    const data = await resp.json()
    console.log(data.alltrips)
    makeTravelList(data.alltrips)
    
}


const date = new Date('02-07-2025')
console.log(date)



btnSearch.addEventListener('click', searchTrips)
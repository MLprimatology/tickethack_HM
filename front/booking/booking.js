const centralContainer = document.getElementById('centralContainer')


const getFullHours = (date) => {
    const newDate = new Date(date)
    return newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes())
}

const timeBerfor = (date) => {
    const newDate = new Date(date)
    
}

const getBooks = async () => {
    try {
    const resp = await fetch('http://localhost:3000/trips/book')
    const data = await resp.json()
    console.log(data.trip)
    let trips = data.trip.map(trip => trip = trip.trip)
    if (trips.length > 0)   {
    centralContainer.innerHTML = 'My Bookings'
    centralContainer.innerHTML += trips.map(trajet => `
                <div class="travels">
                <span>${trajet.departure} > ${trajet.arrival}</span>
                <span>${getFullHours(trajet.date)}</span>
                <span>${trajet.price}€</span>
                <span>departure in :</span>
            </div>
                `).join('')

        }
    } catch(err) {
        console.log(err)
    }
}

getBooks()
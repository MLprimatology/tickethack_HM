const centralContainer = document.getElementById('centralContainer')
const url = "http://localhost:3000"

const getFullHours = (date) => {
    const newDate = new Date(date)
    return newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes())
}

const convertisseur = (difference) => {
    let diff = difference

    let month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
    diff -= (month * (1000 * 60 * 60 * 24 * 30))
    let day = Math.floor(diff / (1000 * 60 * 60 * 24))
    diff -= (day * (1000 * 60 * 60 * 24))
    let hours = Math.floor(diff / (1000 * 60 * 60))
    diff -= (hours * (1000 * 60 * 60))
    let minutes = Math.floor(diff / (1000 * 60))
    diff -= (minutes * (1000 * 60))
     
    let string = `${month === 0 ? '' : (month) + ' month,'} ${day === 0 ? '' : day + ' days'} ${hours === 0 ? '' : (hours) + ' hours'} ${minutes + ' minutes'}`

    return string
} 

const timeBerfor = (date) => {
    const today = new Date()
    const newDate = new Date(date)
    let diff = newDate - today
    const delay = convertisseur(diff)

    
    console.log(delay)

   

    
}

const getBooks = async () => {
    try {
    const resp = await fetch(`${url}/trips/book`)
    const data = await resp.json()
    console.log(data.trip)
    let trips = data.trip.map(trip => trip = trip.trip)
    if (trips.length > 0)   {
    centralContainer.innerHTML = `<p id="mybookings">My bookings</p>`
    centralContainer.innerHTML += trips.map(trajet => `
                <div class="travels">
                <span>${trajet.departure} > ${trajet.arrival}</span>
                <span>${getFullHours(trajet.date)}</span>
                <span>${trajet.price}€</span>
                <span>departure in : ${timeBerfor(trajet.date)}</span>
            </div>
                `).join('')
    centralContainer.innerHTML += `
            <div id="trait"> </div>
            <p id="enjoy">Enjoy your travel with tickets hacks</p>
            `
        }
    } catch(err) {
        console.log(err)
    }
}

getBooks()
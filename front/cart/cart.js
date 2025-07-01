const centralContainer = document.getElementById('centralContainer')

const getFullHours = (date) => {
    const newDate = new Date(date)
    return newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes())
}

const creatList = (list) => {
    const trip = list.map(item => {return item.trip})
    console.log(list)
    centralContainer.innerHTML = `<p>My cart</p>`
    centralContainer.innerHTML += trip.map(trajet => `
                <div class="travelTopaid">
                <span>${trajet.departure} > ${trajet.arrival}</span>
                <span>${getFullHours(trajet.date)}</span>
                <span>${trajet.price}€</span>
                <span class="supprimer">X</span>
            </div>
                `).join('')
        centralContainer.innerHTML += `
            <div id="totalBuy">
                <div id="total">103</div>
                <div id="purchase">purchase</div>
            </div>
        `
}

const getCartList = async() => {
    try{
    const resp = await fetch('http://localhost:3000/trips/cart', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
        }
     )
    const data = await resp.json()
     console.log(data)
     creatList(data.trip)



} catch(err) {
    console.log(err)
}
}

getCartList()
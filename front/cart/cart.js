const centralContainer = document.getElementById('centralContainer')
let total;
let purchase;
let list

// fonction basiques
const getFullHours = (date) => {
    const newDate = new Date(date)
    return newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes())
}




// fonctions complexes

const creatList = () => {
    const trip = list.map(item => {return item.trip})
    let totalAmount = trip.reduce((acc, b) =>  acc + b.price, 0)
    console.log(list)
    if (list.length > 0) {
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
                <div id="total">Total : ${totalAmount}€</div>
                <div id="purchase">Purchase</div>
            </div>
        `
    let btnSurppimer = document.querySelectorAll('.supprimer')
    btnSurppimer.forEach((btn, i )=> btn.addEventListener('click', () => supressToCard(list[i]._id)))
    total = document.getElementById('total')
    purchase = document.getElementById('purchase')
    purchase.addEventListener('click', buy)
} else {
    centralContainer.innerHTML = `
            <p>No tickets in your cart.</p>
            <p>Why not plan a trip?</p>
    `
}

}


// fonctions fetch

// recuperer la liste des trajet en attente de paiement
const getCartList = async(id) => {
    try{
    const resp = await fetch('http://localhost:3000/trips/cart', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
        }
     )
    const data = await resp.json()
     console.log(data)
     list = data.trip
     if (data.result)   {
        
     creatList()
        } else {
        centralContainer.innerHTML = `
            <p>No tickets in your cart.</p>
            <p>Why not plan a trip?</p>
         `
     }
} catch(err) {
    console.log(err)
}
}

// supprimer un trajet en attente de paiement
const supressToCard = async(id) => {
    try {
    const resp = await fetch('http://localhost:3000/trips/deletecart', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({tripID : id})
    })
    const data = resp.json()
    console.log(data)
    getCartList()
    } catch(err) {
        console.log(err)
    }
}


// payer
const buy = async() => {
    try {
        const resp = await fetch('http://localhost:3000/trips/tobook', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await resp.json()
        console.log(data)



    } catch(err) {
        console.log(err)
    }

}



getCartList()
const getCartList = async() => {
    try{
    const resp = await fetch('http://localhost:3000/trips/cart', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
        }
     )
    const data = await resp.json()
    console.log(data)
} catch(err) {
    console.log(err)
}
}

getCartList()
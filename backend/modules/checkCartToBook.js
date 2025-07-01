function checkCartToBook(cartTip,BookedTrip){
        let result = true;
        let error = '';
        console.log(cartTip)
        if (cartTip.length ===0){
            result = false;
            error = 'No trip in the cart'
        }
        else{
            for (let trip of cartTip){
                if (BookedTrip.some(e => e.trip.equals(trip.trip) )){
                    result = false;
                    error = 'One fo the trips is already booked'
                }
            }
        }

        return [result,error]

}

module.exports = {checkCartToBook}
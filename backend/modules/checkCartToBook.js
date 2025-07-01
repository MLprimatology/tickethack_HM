function checkCartToBook(cartTip,BookedTrip){
        let result = true;
        let error = '';
        console.log(BookedTrip)
        if (cartTip == []){
            result = false;
            error = 'No trip in the cart'
        }
        else{
            for (let trip of cartTip){
                if (BookedTrip.some(e => e.trip == trip.trip)){
                    result = false;
                    error = 'One fo the trips is already booked'
                }
            }
        }

        return [result,error]

}

module.exports = {checkCartToBook}
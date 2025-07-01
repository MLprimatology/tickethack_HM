var express = require('express');
var router = express.Router();

const Trip = require('../models/trips')
const Cart = require('../models/carts')
const Booked = require('../models/bookeds')

const {checkCartToBook} = require('../modules/checkCartToBook')





router.get('/find',(req,res)=>{
    const departure = req.body.departure;
    const arrival = req.body.arrival;

    // const date = req.body.date;
    const date = new Date('2025-07-01').toISOString()
    const endate = new Date('2025-07-02').toISOString()
    console.log(date)
    Trip.find({departure : departure, arrival:arrival, date:{$gte:date, $lte:endate}}).then(
        data => {res.json({result:true, alltrips :data})})


})


router.post('/tocart', (req,res)=>{

    const id = req.body.tripID;

    Cart.find().then(tripcart=>{
        if (!tripcart.some(e=> e.trip===id)){
            const newCart = new Cart({
                trip : id,
            })
            newCart.save().then(res.json({result: true, trip:'Trip added to cart'}))
        }
        
        else{
            res.json({ result: false, error: "Trip already in your cart" })
        }
    })


})



router.post('/tobook', async (req,res)=>{

    const cartTip = await Cart.find();
    const BookedTrip = await Booked.find()


    const [result,error] = checkCartToBook(cartTip,BookedTrip)
    console.log(result)
    if (result){
        for (let trip of cartTip){
                const newBooked = new Booked({
                trip : trip.trip,
            })

            await newBooked.save()

    }

    Cart.deleteMany({}).then(()=>{
        res.json({result:true, trips : 'Trips transfer from cart to booked'})
    })

    }
    else{
        res.json({result : false, error: error})
    }

    })


    



module.exports = router;

var express = require('express');
var router = express.Router();

const Trip = require('../models/trips')
const Cart = require('../models/carts')
const Booked = require('../models/bookeds')

const {checkCartToBook} = require('../modules/checkCartToBook')





router.post('/find',async (req,res)=>{
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const available = [];
    const date = new Date(req.body.date);
    const enddate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const BookedTrip = await Booked.find();
    const CartTrip = await Cart.find();

    Trip.find({departure : departure, arrival:arrival, date:{$gte:date, $lte:enddate}}).then(
        data =>{
            for (let tripTobook of data){

                if (BookedTrip.some(e=> e.trip.equals(tripTobook.id))){
                    available.push('book')
                }
                else if(CartTrip.some(e=> e.trip.equals(tripTobook.id))){
                    available.push('cart')

                }
                else(
                    available.push('available')
                )
            }
            


            
            res.json({result:true, alltrips :data,available:available })})


})

router.get('/cart',(req,res)=>{
    Cart.find().populate('trip').then(data=>{
        if(data.length ===0){
            res.json({result:false,trip:'No trip in the cart'})
        }else{
                if (data.length>1){
            data.sort((a, b) => new Date(a.trip.date) - new Date(b.trip.date))
            res.json({result:true,trip:data})}
            else{
                res.json({result:true,trip:data})
            }
        }
    })
})




router.delete('/deletecart',(req,res)=>{

    const id = req.body.tripID;
    Cart.deleteOne({_id:id}).then(res.json({result:true,trip:'trip deleted'}))

    
})





router.post('/tocart', async (req,res)=>{

    const id = req.body.tripID;
    
    const BookedTrip = await Booked.find();

    if (BookedTrip.some(e=> e.trip.equals(id))){
        res.json({ result: false, error: "Trip already Booked" })
    }
    else{

    

    Cart.find().populate('trip').then(tripcart=>{
        if (!tripcart.some(e=> e.trip.equals(id))){
            const newCart = new Cart({
                trip : id,
            })
            newCart.save().then(res.json({result: true, trip:'Trip added to cart'}))
        }
        
        else{
            res.json({ result: false, error: "Trip already in your cart" })
        }
    })}


})



router.get('/book',(req,res)=>{
    Booked.find().populate('trip').then(data=>{
        if(data.length ===0){
            res.json({result:false,trip:'No trip booked'})
        }else{
            if (data.length>1){
            data.sort((a, b) => new Date(a.trip.date) - new Date(b.trip.date))
            res.json({result:true,trip:data})}
            else{
                res.json({result:true,trip:data})
            }
            
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

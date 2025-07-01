var express = require('express');
var router = express.Router();

const Trip = require('../models/trips')
const Cart = require('../models/carts')
const Booked = require('../models/booked')








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
            newCart.save().then(()=> Cart.find().populate('trip')).then(data=>console.log(data)).then(res.json({result: true, trip:'Trip added to cart'}))
        }
        else{
            res.json({ result: false, error: "Trip already in your cart" })
        }
    })












})



router.post('/tobook', (req,res)=>{

    Cart.find().then(cartTip =>{
        for (let trip of cartTip){
            console.log(trip)
            console.log('coucou')
        }
    
    }).then(res.json({result:true}))


    


})






module.exports = router;

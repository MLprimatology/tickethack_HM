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
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const price = req.body.price;
    Cart.find().then(tripcart=>{
        if (!tripcart.some(e=> e.departure.toLowerCase()===departure.toLowerCase() || e.arrival.toLowerCase()===arrival.toLowerCase() || e.date === new Date(date) )){
            const newCart = new Cart({
                departure : departure,
                arrival : arrival,
                date : date,
                price :price,
            })
            newCart.save().then(res.json({result: true, trip:newCart}))
        }
        else{
            res.json({ result: false, error: "Trip already in your cart" })
        }
    })


})



router.post('/tobook', (req,res)=>{

    Cart.find().lean().then(data=>{
        if(data != []){
            const cleanedDocs = data.map(({ _id, ...data }) => data)
            console.log(cleanedDocs)
            Booked.insertMany(cleanedDocs).then(
            res.json({ result: true, trip: "Empty Cart"}))
        }

        else{
            res.json({ result: false, error: "No trips in your cart"})
    }


        })
    


})






module.exports = router;

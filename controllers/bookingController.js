const stripe = require('../config/stripeConfig');
const Room = require('../models/Room');
const User = require('../models/User'); 


exports.handleBookingSubmission = async (req, res) => {
    const {roomId, userId} = req.body;

    
    
    try {
        // Handling booking logic similar as before
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);
        
        if (!user.hasBooked) {
            if (!room.isAvailable){
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: `Room booking for ${room.roomNumber}`,
                                },
                                unit_amount: room.price * 100, // Stripe expects amount in cents
                            },
                            quantity: 1,
                        }
                    ],
                    mode: 'payment',
                    success_url: 'http://localhost:3000/booking/success?session_id={CHECKOUT_SESSION_ID}',
                    cancel_url: 'http://localhost:3000/booking/cancel',
                });
    
                res.redirect(303, session.url); // Redirect to Stripe's hosted checkout page
                // Mark the room as booked and assign it to the user
                room.isAvailable = false;
                room.bookedBy = userId;
                await room.save();
    
                // Mark the user as having booked a room
                user.hasBooked = true;
                await user.save();
            } else {
                req.flash('error_msg', 'No rooms available matching the criteria.');
                res.redirect('/book-room');
            }
            

        } else {
            req.flash('error_msg', 'You are limited to 1 room!');
            res.redirect('/book-room');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error while processing booking.");
    }
};
exports.paymentSuccess = (req, res) => {
    // Stripe session ID should be verified here for production!
    res.render('success');
};

exports.paymentCancel = (req, res) => {
    res.render('cancel');
};
const { Booking, Campsite } = require('../../db/models');
const { asyncHandler} = require('./utils');
const express = require('express');
const { requireAuth } = require('../../utils/auth');

const bookingsRouter = express.Router();

bookingsRouter.use(requireAuth)

bookingsRouter.get(
  "/",
  asyncHandler(async(req,res) => {
    res.redirect("/")
  })
)
bookingsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const userBookings = await Booking.findAll({
      where: { userId: userId },
      include: { model: Campsite }
    });

    res.json(userBookings)
  })
)
bookingsRouter.delete(
  "/delete/:id",
  asyncHandler(async (req,res ) => {
    const { bookingId } = req.body.params;
    let booking = await Booking.findByPk(bookingId);
    await booking.destroy()
  })
)
bookingsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, dateStart, dateEnd, campsiteId } = req.body;
    let userBookings = await Booking.create({
      userId,
      dateStart,
      dateEnd,
      campsiteId
    });
    userBookings = await Booking.findAll({
      where: { userId: userId },
      include: { model: Campsite }
    });
    res.json(userBookings);
  })
)


module.exports = bookingsRouter;

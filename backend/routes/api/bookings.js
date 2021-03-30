const { Booking } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const bookingsRouter = express.Router();

// bookingsRouter.use(requireAuth)

bookingsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = findCurrentUser(req.session);
    const userBookings = await Booking.findAll({
      where: { userId: userId }
    });

    res.render("booking", {
      title: "Bookings",
      userBookings
    })
  })
)
bookingsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, dateStart, dateEnd, campsiteId } = req.body;
    const userBookings = await Booking.create({
      userId,
      dateStart,
      dateEnd,
      campsiteId
    });
    res.json(userBookings);
  })
)


module.exports = bookingsRouter;

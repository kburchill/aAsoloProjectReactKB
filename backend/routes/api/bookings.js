const { Booking } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const bookingsRouter = express.Router();

bookingsRouter.use(requireAuth)

bookingsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const userBookings = await Booking.findAll({
      where: { userId: userId }
    });

    res.json(userBookings)
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

const express = require("express");
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");
const { Campsite, Booking } = require("../../db/models")
const { asyncHandler } = require("./utils");
const searchRouter = express.Router();

searchRouter.get(
  '/:park',
  asyncHandler(async (req, res, next) => {
    const park = req.body.park; //id using params
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const campsites = await Campsite.findAll({
      where:
        { parkId: park }, //changed for future
      include: { model: Booking, where: {
        dateStart: { [Op.notBetween]: [dateStart, dateEnd] },
        dateEnd: { [Op.notBetween]: [dateStart, dateEnd] }
      }}
    })

    // const bookings = await Booking.findAll({
    //   where: {
    //     dateStart: { [Op.Between]: [dateStart, dateEnd] },
    //     dateEnd: { [Op.Between]: [dateStart, dateEnd] }
    //   }
    // })

    // Barts TOT:
    // const availableCampsites = campsites.filter(campsite => campsite.dateStart >= dateStart || campsite.dateEnd <= dateEnd)
    // select * from bookings where startDate >= 'somedate' AND endDate <= 'anotherdate'

    res.json({ campsites, bookings })

  })
)
module.exports = searchRouter;

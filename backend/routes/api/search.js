const express = require("express");
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");
const { Campsite, Booking } = require("../../db/models")
const { asyncHandler } = require("./utils");
const searchRouter = express.Router();

searchRouter.get(
  '/:park',
  asyncHandler(async (req, res, next) => {
    const park = req.params.park; //id using params
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


    res.json({ campsites, bookings })

  })
)
module.exports = searchRouter;

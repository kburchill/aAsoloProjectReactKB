const { Campsite, Park, Booking, Imgurl } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
const { Op } = require("sequelize");
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const campsitesRouter = require('./campsites')

const parksRouter = express.Router();

parksRouter.use('/:parkId/campsites/', campsitesRouter)


//api/parks

parksRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const parks = await Park.findAll({ include: Campsite });
    res.json({ parks });
  })
)

parksRouter.post(
  "/:parkId",
  asyncHandler(async (req, res) => {
    const parkId = req.params.parkId;
    const { dateStart, dateEnd } = req.body;
    const campsites = await Campsite.findAll({
      where:
        { parkId: parkId },
      include: {
        model: Booking, where: {
          dateStart: { [Op.notBetween]: [dateStart, dateEnd] },
          dateEnd: { [Op.notBetween]: [dateStart, dateEnd] }
        }
      }
    })

    return res.json({ campsites });
  })
)

module.exports = parksRouter;

const { Campsite, Park, Booking, Imgurl } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
const { Op } = require("sequelize");
const express = require('express');
var toDate = require('date-fns/toDate')
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

    const dateStartArray = dateStart.split('-')
    const dateEndArray = dateEnd.split('-')
    const newStart = Date([Number(dateStartArray[0]),(Number(dateStartArray[1]) - 1),Number(dateStartArray[2])])
    const newEnd = Date([Number(dateEndArray[0]),(Number(dateEndArray[1]) - 1),Number(dateEndArray[2])])
    // const newStart = toDate(dateStart)
    // const newEnd = toDate(dateEnd)

    console.log(newStart, "here is the start date--------");
    console.log(newEnd, "here is the end date--------test");
    const campsites = await Campsite.findAll({
      where:
        { parkId: parkId },
      include: {
        model: Booking, where: {
          dateStart: { [Op.notBetween]: [newStart, newEnd] },
          dateEnd: { [Op.notBetween]: [newStart, newEnd] }
        }
      }
    })

    return res.json({ campsites });
  })
)

module.exports = parksRouter;

const { Campsite, Park, Booking, Imgurl } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
const { Op } = require("sequelize");
const express = require('express');
var toDate = require('date-fns/toDate')
const { requireAuth } = require('../../utils/auth');
const campsitesRouter = require('./campsites');
const bookingsRouter = require('./bookings');

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
    const { jsonDateStart, jsonDateEnd } = req.body;

    // const dateStartArray = dateStart.split('-')
    // const dateEndArray = dateEnd.split('-')
    // const newStart = Date([Number(dateStartArray[0]),(Number(dateStartArray[1]) - 1),Number(dateStartArray[2])])
    // const newEnd = Date([Number(dateEndArray[0]),(Number(dateEndArray[1]) - 1),Number(dateEndArray[2])])
    const newStart = new Date(Date.parse(jsonDateStart))
    const newEnd = new Date(Date.parse(jsonDateEnd))


    console.log(newStart, "here is the start date--------");
    console.log(newEnd, "here is the end date--------test");
    const printBookings = await Booking.findAll();
    console.log(printBookings);
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
    const bookedCampsites = await Campsite.findAll({
      where:
        { parkId: parkId },
      include: {
        model: Booking, where: {
          dateStart: { [Op.Between]: [newStart, newEnd] },
          dateEnd: { [Op.Between]: [newStart, newEnd] }
        }
      }
    })
    let availCampsites = [];

    for (campsite of campsites) {
      console.log(campsite, "here==================")

      if (!bookedCampsites.includes(campsite.id)){
        availCampsites.push(campsite);
      }
    }
    console.log(availCampsites, "===============================");
    // console.log(availCampsites, "campsites=============================");
    // console.log(campsites[0].Bookings, "Bookings=============================");
    return res.json( {availCampsites} );
  })
)

module.exports = parksRouter;

const { Campsite, Park, Booking, sequelize } = require('../../db/models');
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
    console.log("This happened:")
    const parks = await Park.findAll({ include: Campsite });
    console.log("========This happened next")
    res.json({ parks });
  })
)

parksRouter.post(
  "/:parkId",
  asyncHandler(async (req, res) => {
    const parkId = req.params.parkId;
    const { jsonDateStart, jsonDateEnd } = req.body;
    console.log(jsonDateEnd, "Jsondateend here =======================")
    const startSeconds = Date.parse(jsonDateStart) || Date.parse("2021-07-16")
    const endSeconds = Date.parse(jsonDateEnd) || Date.parse("2021-07-16")
    if (isNaN(startSeconds) || isNaN(endSeconds)) {
      throw "Passed invalid dates"
    }
    const newStart = new Date(startSeconds)
    const newEnd = new Date(endSeconds)

    const campsites = await Campsite.findAll({
      where:
      {
        parkId: parkId,
        id:
        {
          [Op.notIn]: sequelize.literal(`
          (SELECT "Campsites"."id" FROM "Campsites"
          JOIN "Bookings" ON "Campsites"."id" = "Bookings"."campsiteId"
          WHERE "Bookings"."dateStart" <= '${newEnd.toISOString()}'
          AND "Bookings"."dateEnd" >= '${newStart.toISOString()}'
          AND "Campsites"."parkId" = '${parkId}')
          `)
        }
      },

    })
    return res.json(campsites);
  })
)

module.exports = parksRouter;

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
    const parks = await Park.findAll({ include: Campsite });
    res.json({ parks });
  })
)

parksRouter.post(
  "/:parkId",
  asyncHandler(async (req, res) => {
    const parkId = req.params.parkId;
    const { jsonDateStart, jsonDateEnd } = req.body;

    const startSeconds = Date.parse(jsonDateStart)
    const endSeconds = Date.parse(jsonDateEnd)
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
    console.log(campsites, "campsites in router===============")
    return res.json(campsites);
  })
)

module.exports = parksRouter;

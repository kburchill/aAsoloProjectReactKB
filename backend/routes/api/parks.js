const { Campsite, Park } = require('../../db/models');
const { asyncHandler, findCurrentUser } = require('./utils');
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

parksRouter.get(
  "/:parkId",
  asyncHandler(async (req, res) => {
    const parkId = req.params.parkId;
    const campsites = await Campsite.findAll({
      where:
        { parkId: parkId }
    })
    res.json({ campsites });
  })
)

module.exports = parksRouter;

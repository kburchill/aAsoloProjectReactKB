const { Campsite } = require('../../db/models');
const {asyncHandler, findCurrentUser } = require('./utils');
const express = require('express');
const { requireAuth } = require('../../utils/auth');

const campsitesRouter = express.Router();
campsitesRouter.use(requireAuth)

//GET /api/parks/:id/campsites
campsitesRouter.get(
  "/",
  asyncHandler( async (req, res) => {
    const campsites = await Campsite.findAll();
    res.json(campsites)
  })
)
//GET /api/parks/:id/campsites/:id
campsitesRouter.get(
  "/:campsiteId(\\d+)",
  asyncHandler( async (req, res) => {
    const campsiteId = req.params.campsiteId;
    const parkId = req.params.parkId; //available because park router
    //
    const campsite = await Campsite.findAll({
      where: { campsiteId: campsiteId}
    });

    res.json(campsite)
  })
)

campsitesRouter.post(
  "/:id(\\d+)",
  asyncHandler( async (req, res) => {
    const campsiteId = req.params;
    const { dateStart, dateEnd } = req.body;
    const userId = findCurrentUser(req.session);
    await Booking.create({userId, dateStart, dateEnd, campsiteId})
    res.redirect(`/bookings`)
  })
)

module.exports = campsitesRouter;

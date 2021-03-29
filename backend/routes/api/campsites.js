const { Campsite } = require('../../db/models');
const {asyncHandler, findCurrentUser } = require('./utils');
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const campsitesRouter = express.Router();

campsitesRouter.use(requireAuth)


campsitesRouter.get(
  "/",
  asyncHandler( async (req, res) => {
    const campsites = await Campsite.findAll();

    res.render("campsites", {
      title: "Campsites",
      campsites
    })
  })
)

campsitesRouter.get(
  "/:id(\\d+)",
  asyncHandler( async (req, res) => {
    const campsiteId = req.params;
    const campsite = await Campsite.findAll({
      where: { campsiteId: campsiteId}
    });

    res.render("campsite", {
      title: "Campsite",
      campsite
    })
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

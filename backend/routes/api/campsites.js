const { Campsite, Review } = require('../../db/models');
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
      where: { id: campsiteId},
      include: { model: Review }
    });
    res.json(campsite)
  })
)

campsitesRouter.post(
  "/:id(\\d+)",
  asyncHandler( async (req, res) => {
    console.log(content, "This happened======1========")
    const campsiteId = req.params;
    const { dateStart, dateEnd } = req.body;
    const userId = findCurrentUser(req.session);
    await Booking.create({userId, dateStart, dateEnd, campsiteId})
    res.redirect(`/bookings`)
  })
)
campsitesRouter.post(
  "/:id(\\d+)/review",
  asyncHandler( async (req, res) => {
    const campsiteId = req.params.id;
    const { content, userId } = req.body;
    console.log(content, userId, campsiteId, "This happened======2========")
    await Review.create({userId, content, campsiteId})
    res.redirect(`/bookings`)
  })
)



module.exports = campsitesRouter;

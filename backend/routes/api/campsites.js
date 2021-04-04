const { Campsite, Review, Booking } = require('../../db/models');
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
    await Review.create({userId, content, campsiteId})
    res.redirect(`/bookings`)
  })
)

campsitesRouter.delete(
  "/:id(\\d+)/reviews/delete",
  asyncHandler(async (req,res ) => {
    const reviewId = req.body.reviewId;
    console.log(reviewId, "========================");
    let review = await Review.findByPk(reviewId.id);
    await review.destroy()
  })
  )

campsitesRouter.get(
  "/:id/reserve",
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
    return res.json(campsites);
  })
)

module.exports = campsitesRouter;

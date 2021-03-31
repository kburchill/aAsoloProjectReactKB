const { Campsite, Booking } = require('../../db/models');
const { asyncHandler} = require('./utils');
const express = require('express');
const { requireAuth } = require('../../utils/auth');

const campRouter = express.Router();

campRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const campsiteId = Number(req.params.id);
    const campsite = await Campsite.findOne({
      where: {campsiteId: campsiteId}
    })

    res.json(campsite);
  })
)

module.exports = campRouter;

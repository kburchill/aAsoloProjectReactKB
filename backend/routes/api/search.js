const express = require("express");
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");
const { Campsite } = require("../../db/models")
const { asyncHandler } = require("./utils");
const searchRouter = express.Router();

searchRouter.get(
  '/:park',
  requireAuth,
  asyncHandler( async (req, res, next) => {
    const park = req.params.park;
    const campsites = await Campsite.findAll({
        where: { park: park}
    })
    res.json(campsites)

    // if (searchText.length >= 1) {
    //   const searchResults = await Campsite.findAll({
    //     where: {
    //       [Op.or]: { //maybe need to check later
    //         location: { [Op.iLike]: `%${searchText}%` },
    //         park: { [Op.iLike]: `%${searchText}%` },
    //         name: { [Op.iLike]: `%${searchText}%` }
    //       }
    //     }
    //   });
    //   allSearchResults = searchResults.map(campsite => campsite.name);
    // }

  })
)
module.exports = searchRouter;

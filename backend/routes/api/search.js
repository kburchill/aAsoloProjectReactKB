const express = require("express");
const { requireAuth } = require("./utils/auth");
const { Op } = require("sequelize");
const { Campsite } = require("../../db/models")
const { asyncHandler } = require("./utils");
const searchRouter = express.Router();

searchRouter.post(
  '/',
  requireAuth,
  asyncHandler( async (req, res, next) => {
    let { searchText } = req.body;

    let allSearchResults = [];

    if (searchText.length >= 1) {
      const searchResults = await Campsite.findAll({
        where: {
          [Op.or]: { //maybe need to check later
            location: { [Op.iLike]: `%${searchText}%` },
            park: { [Op.iLike]: `%${searchText}%` },
            name: { [Op.iLike]: `%${searchText}%` }
          }
        }
      });
      allSearchResults = searchResults.map(campsite => campsite.name);
    }
    res.render("search", {
      title: "Search Results",
      allSearchResults
    })
  })
)

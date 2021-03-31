const { Campsite, Park } = require('../../db/models');
const {asyncHandler, findCurrentUser } = require('./utils');
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const campsiteRouter = require('./campsites')

const parksRouter = express.Router();

parksRouter.use('/:parkId/campsites/', campsitesRouter) 


//api/parks


module.exports = parksRouter;

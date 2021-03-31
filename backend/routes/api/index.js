
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const bookingsRouter = require('./bookings')
const campsitesRouter = require('./campsites')
const searchRouter = require('./search')
const campRouter = require('./selectedCampsite')
const parksRouter = require('./parks')

router.use('/session', sessionRouter);

router.use("/users", usersRouter);
router.use("/parks", parksRouter)
router.use("/bookings", bookingsRouter);
router.use("/campsites", campsitesRouter);
router.use("/search", searchRouter);
router.use("/campsite", campRouter);
//api/parks/:id/campsites/search post route with dates

module.exports = router;

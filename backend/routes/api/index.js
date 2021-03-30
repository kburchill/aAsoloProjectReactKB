
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const bookingsRouter = require('./bookings')
const campsitesRouter = require('./campsites')
const searchRouter = require('./search')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use("/bookings", bookingsRouter);
router.use("/campsites", campsitesRouter);
router.use("/search", searchRouter);

module.exports = router;

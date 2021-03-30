const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


const findCurrentUser = (session) => {
	const {
		userAuth: { userId },
	} = session;

	return userId;
};



module.exports = {
  asyncHandler,
  findCurrentUser
};

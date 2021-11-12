module.exports = {
	PORT: (process.env.PORT || 80),
  SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: (process.env.JWT_EXPIRATION || 86400),
  SALT_ROUNDS : 10
};
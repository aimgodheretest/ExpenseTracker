const premiumAuthentication = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (!req.user.isPremium) {
    return res.status(403).json({
      message: "Premium membership required",
    });
  }

  next();
};

module.exports = premiumAuthentication;

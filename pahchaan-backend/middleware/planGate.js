// Restrict routes based on user plan
const planGate = (...allowedPlans) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!allowedPlans.includes(req.user.plan)) {
      return res.status(403).json({
        success: false,
        message: `This feature requires one of these plans: ${allowedPlans.join(', ')}`,
      });
    }

    next();
  };
};

module.exports = planGate;
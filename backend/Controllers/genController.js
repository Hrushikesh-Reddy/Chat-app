const home = (req, res) => {
  res.send(req.user);
};

module.exports = { home };

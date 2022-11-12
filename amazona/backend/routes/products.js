var router = require("express").Router();
var data = require("../data/data");

router.get("/", function (req, res) {
  res.json(data.products);
});

router.get("/slug/:slug", function (req, res) {
  const slug = req.params.slug;
  const product = data.products.find((product) => product.slug === slug);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

module.exports = router;

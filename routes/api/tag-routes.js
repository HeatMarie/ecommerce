const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagData = await Tag.findAll({
      // include its associated Product data
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      // include its associated Product data
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }]
    });
    if(!tagData) {
      res.status(404).json({ message: 'This Tag was not found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

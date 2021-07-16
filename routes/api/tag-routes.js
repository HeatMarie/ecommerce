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
    const tagData = await Tag.findByPk(req.params.id, {
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
  try {
    const tagData = await Tag.create({
      tagName: req.body.tagName,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    let tagProducts = await ProductTag.findAll({ where: {tag_id: req.params.id } });
    if (req.body.productIds) {
      const tagProductIds = tagProducts.map(({ product_id }) => product_id);
      const newTagProducts = req.body.productIds.filter((product_id) => !tagProductIds.includes(product_id)).map((product_id) => {
        return{
          tag_id: req.params.id,
          product_id,
        }
      });
      const tagProductsToRemove = tagProducts.filter(({ product_id }) => !req.body.productIds.includes(product_id)).map(({ id }) => id);

      const updatedTagProducts = await Promise.all([ ProductTag.destroy({ where: {id: tagProductsToRemove} }),
      ProductTag.bulkCreate(newTagProducts),
    ])
    res.status(200).json(updatedTagProducts)
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag was found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.response(500).json(err);
  }
});

module.exports = router;

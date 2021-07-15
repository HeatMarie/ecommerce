const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products   
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      // be sure to include its associated Products
      inclue: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'That category was not found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  } 
});

router.post('/', async(req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(
    {
      name: req.body.name,
    },
    {
      where: {
        category_id: req.params.category_id
      }
    }  
  );

  res.json(updateCategory);
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with that id!`});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.response(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(400).json({ message: `No category found with id ${categoryId}` });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = await Category.destroy({
      where: { id: categoryId },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category with id ${categoryId}` });
    }

    res.status(200).json(categoryData);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

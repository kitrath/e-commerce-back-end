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
      return res.status(400).json({ message: `No category found with id ${categoryId}` });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(500).json({
        message: 'Unable to create category',
        data: req.body
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.update(req.body, {
      where: {
        id: categoryId
      },
    });

    if (!category[0]) {
      return res.status(404).json({ message: `No category with id ${categoryId}` });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = await Category.destroy({
      where: { id: categoryId },
    });

    if (!categoryData) {
      return res.status(404).json({ message: `No category with id ${categoryId}` });
    }

    res.status(200).json(categoryData);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

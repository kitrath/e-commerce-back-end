const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, through: ProductTag, as: 'products'},
      ],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tagData = await Tag.findByPk(tagId, {
      include: [
        { model: Product, through: ProductTag, as: 'products' },
      ],
    });

    if (!tagData) {
      res.status(400).json({ message: `No tag found with id ${tagId}` });
    }
    
    res.status(200).json(tagDat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

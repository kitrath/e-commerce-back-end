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
    
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    const hasProductIds = Object.prototype.hasOwnProperty.call(req.body, 'productIds');
    
    if (hasProductIds && req.body.productIds.length) {
      const productTagArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: newTag.id,
        };
      });

      const productTags = await ProductTag.bulkCreate(productTagArr);

      res.status(200).json({ tag: newTag, product_tags: productTags })
    } else {
      // No productIds, just return new tag
      res.status(200).json(newTag);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tagData = await Tag.update(res.body);

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id ${tagId}` });
    }

    res.status(200).json(tagData);

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tagData = await Tag.destroy({
      where: { id: tagId },
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag with id ${tagId}` });
    }
    
    res.status(200).json(tagData);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

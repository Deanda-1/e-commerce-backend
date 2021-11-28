const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // attributes: ['id', 'category_name'], 
    include: [  // joins the product table
      {
        model: Product,
        // attributes: ['id', 'product_name','price','stock','category_id']
      }
    ]
  }).then(
    data => res.json(data)
  ).catch(err => {
    //console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findAll({
    where: {id: req.params.id},
    include:[{ model: Product}]

  }).then(data => {
    if (!res.json(data)){
      res.status('404').json({message: '404 Category Not Found'}); 
      return;
    }
    res.json(data);
  }).catch(
    err => res.status(400).json(err)
  )
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then( data => res.json(data))
  .catch( err=> res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then( data => res.json(data))
  .catch( err=> res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
  .then( data => res.json(data))
  .catch( err=> res.status(400).json(err))
});

module.exports = router;

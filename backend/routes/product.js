const ensureAuthenticated = require('../middleware/auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        message: "Welcome to the Products API",
        products: [
            { id: 1, name: "Product 1", price: 100 },
            { id: 2, name: "Product 2", price: 200 },
            { id: 3, name: "Product 3", price: 300 }
        ]
    });
});


module.exports = router;

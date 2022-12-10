const db = require('../database/models')

module.exports = {
    product: async function(req, res) {
        let product = await db.Product.findByPk(req.params.id);
        return res.json(product)
    }
}
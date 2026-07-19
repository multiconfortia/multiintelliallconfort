const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    res.render('pages/publicaciones', {
        title: 'Publicaciones | MULTICONFORT'
    });

});


module.exports = router;
const express=require('express')
const {authMiddleware,authorize} = require('../middlewares/Authenticate')

const router = express.Router();

router.get('/public', (req, res) => {
    res.json({ message: 'This page is accessible to everyone' });
});


router.get('/userPage', authMiddleware, (req, res) => {
    res.json({ message: 'This page is accessible to authenticated users' });
});


router.get('/adminPage', authMiddleware, authorize(['admin']), (req, res) => {
    res.json({ message: 'This page is accessible to admin users only' });
});

module.exports = router;
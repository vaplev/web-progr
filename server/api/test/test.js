const express = require('express');
const router = express.Router();
let users = require('../../data/users')
router.get('/test', (req, res, next)=> {
    res.status(200).send({message: 'hello!'});
});


router.get('/users', (req, res, next)=> {
    res.status(200).send(users);
});

router.post('/users', (req, res)=> {
    const data = req.body
    console.log(data)
    users.push(data)
    res.status(200).send(users)
})
module.exports = router;
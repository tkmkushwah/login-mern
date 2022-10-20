const express = require('express');
const homeSchema = require('../models/HomeSchema')
const router = express.Router()
router.get('/', (err, res) => {

    //  res.send(' shi chl rha h');
    res.render('register', { title: 'CreativeTKM', password: '', email: '' });

})
router.post('/register', async (req, res) => {
    try {
        // const name=req.body.name;
        // const email=req.body.email;
        const {
            name,
            number,
            email,
            password,
            cpassword
        } = req.body;
        // console.log(name,number,email,password,cpassword)
        if (password === cpassword) {
            const userData = new homeSchema({
                name,
                number,
                email,
                password
            })
            userData.save(err => {
                if (err) {
                    console.log('err');
                }
                else {
                    res.render('register', { title: 'done', password: '', email: ' ' });
                }
            })
            const userEmail = await homeSchema.findOne({ email: email });

            if (email === userEmail.email) {
                res.render('register', { title: '', email: 'email already exist', password: '' })
            } else {
                console.log('err')
            }

        } else {
            res.render('register', { title: 'error', password: 'password not matched', email: 'already exist' });
        }
    } catch (error) {
        res.render | ('register', { title: 'error in code', password: "", email: '' })
    }
})
//sign In
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    homeSchema.findOne({ email: email }, (err, result) => {
        if (email === result.email && password === result.password) {
            res.render('dashboard', { title: 'login success full', name: result.name })
        }
        else {
            console.log('login failed password or email not matching')
        }
    })
})

module.exports = router;


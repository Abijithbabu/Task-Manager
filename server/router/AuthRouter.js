const { login, Register } = require('../controllers/AuthController')

const router = require('express').Router()

router.post("/login", login)
router.post("/register", Register)

module.exports = router;
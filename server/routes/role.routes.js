const express = require('express');
const { validateToken, authorizeRole } = require('../middlewares/auth.middleware');
const { getAdminContent, getUserContent, getModeratorContent } = require('../controllers/role.controller');

const router = express.Router();

router.get('/admin', validateToken, authorizeRole(['Admin']), getAdminContent);
router.get('/user', validateToken, authorizeRole(['User']), getUserContent);
router.get('/moderator', validateToken, authorizeRole(['Moderator']), getModeratorContent);

module.exports = router;
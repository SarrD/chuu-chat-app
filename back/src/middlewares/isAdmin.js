var express = require('express');


exports.isAdmin = (req, res, next) => {

    if (parseInt(req.user.id_role) === 2) {
    	return next();
	}else {
		return res.status(401).json({ message: "You are not an administrator" });
	}
}

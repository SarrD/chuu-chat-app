const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const { refreshToken } = require("../controllers/usersController");

const app = express();


exports.signIn = (req, res, next) => {

	//récupération des deux tokens envoyés dans le header de la request
	const tokenToUse = req.headers.token1;
	const tokenRefresh = req.headers.refreshtoken;
	const mySecret = "mysecret";
	try {
		const decoded1 = jwt.verify(tokenToUse, mySecret);
		req.user = decoded1;
		try {
			const decoded2 = jwt.verify(tokenRefresh, mySecret)
			var now = new Date().getTime() / 1000;
			if (now > decoded2.exp) {
				/* expired */
				return refreshToken(decoded1.id, token => {
					res.status(417).send(token)
				});
			}
			next();
		} catch (err) {
			return refreshToken(decoded1.id, token => {
				res.status(417).send(token)
			})
		}

	} catch (err) {
		return res.status(401).send(err);
	}
};





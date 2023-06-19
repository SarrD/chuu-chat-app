const jwt = require("jsonwebtoken");
const db = require('../../database');
const bcrypt = require('bcrypt');
var express = require('express');
const { refreshToken } = require("../controllers/usersController");

const app = express();


exports.signIn = (req, res, next) => {

	//récupération des deux tokens envoyés dans le header de la requete
	const tokenToUse = req.headers.token1;
	const tokenRefresh = req.headers.refreshtoken;
	try {

		const mySecret = "mysecret";
		const decoded1 = jwt.verify(tokenToUse, mySecret);
		req.user = decoded1;
		const decoded2 = jwt.decode(tokenRefresh)
		try {
			//verification avec la date actuelle, si l'expiration 
			const decoded2 = jwt.verify(tokenRefresh, mySecret)
			var now = new Date().getTime() / 1000;
			//mettrev decoded2.iat et pas .exp
			if (now > decoded2.exp) {
				/* expired */
				//le token est disponible ds le scope grace au callback ds refreshToken du usersController 
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
		// console.log('auth.js : ', err);
		return res.status(401).send(err);
	}
};





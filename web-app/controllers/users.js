const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db/user");
const { emailValidation, nameValidation, missingFieldValidation } = require("../utils/validation");
const Fitness = require("../db/fitness");
const { Op } = require("sequelize");

exports.addUser = async (req, res) => {
    try {
        const requestBodySet = new Set(Object.keys(req.body));
        const validFields = ["name", "email", "password", "gender", "age"];
        
        for (let field of validFields) {
            if (!requestBodySet.has(field)) {
                return res.status(400).json({ message: "Invalid set of fields" });
            }
            requestBodySet.delete(field);
        }

        if (requestBodySet.size > 0) {
            return res.status(400).json({ message: "Invalid set of fields" });
        }

        const userCount = await User.count({
            where: { email: req.body.email }
        });

        if (userCount > 0) {
            return res.status(400).send({ "message": "User already exists" });
        }

        for (let key of Object.keys(req.body)) {
            value = req.body[key];
            if (!missingFieldValidation(value)) {
                return res.status(400).send();
            }
            if (key === "name") {
                if (!nameValidation(value)) {
                    return res.status(400).json({ "message": "Field validation failed" });
                }
            }
            else if (key === "email") {
                if (!emailValidation(value)) {
                    return res.status(400).json({ "message": "Field validation failed" });
                }
            }
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        const user = await User.create(req.body);

        user.password = undefined;

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

exports.updateUser = async (req, res) => {
    try {
        const requestBodySet = new Set(Object.keys(req.body));
        const validFields = ["name", "age", "gender", "password"];
        
        for (let field of validFields) {
            if (!requestBodySet.has(field)) {
                return res.status(400).json({ "message": "Invalid set of fields" });
            }
            requestBodySet.delete(field);
        }

        if (requestBodySet.size > 0) {
            return res.status(400).json({ "message": "Invalid set of fields" });
        }

        for (let key of Object.keys(req.body)) {
            value = req.body[key];
            if (!missingFieldValidation(value)) {
                return res.status(400).send();
            }
            if (key === "name") {
                if (!nameValidation(value)) {
                    return res.status(400).send();
                }
            }
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.update(req.body, {
            where: { email: req.userData.email }
        });

        res.status(204).json({ "message": "User updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                "message": "Missing body params"
            });
        }
        const user = await User.findOne({ where: { email: req.body.email } });
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
                expiresIn: "24h"
            })
            user.password = undefined;
            return res.status(200).json({ user, token });
        }
        res.status(403).json({ "message": "Incorrect credentials" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}


exports.getUserSelf = async (req, res) => {
    try {
        const user = await User.findOne({
            include: {
                model: Fitness
            },
            where: { id: req.userData.id }
        });
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            include: {
                model: Fitness
            },
            where: { email: req.body.email }
        });
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.searchTop5Users = async (req, res) => {
    try {
        const topFiveRows = await Fitness.findAll({
            order: [['points', 'DESC']],
            limit: 5
        });
        return topFiveRows;
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.searchUsers = async (req, res) => {
    try {
        const searchQuery = req.params.query;
        const users = await User.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.not]: {
                            id: req.userData.id
                        }
                    },
                    {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like]: `%${searchQuery}%`
                                }
                            },
                            {
                                email: {
                                    [Op.like]: `%${searchQuery}%`
                                }
                            }
                        ]
                    }
                ]
            },
            limit: 10
        });
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

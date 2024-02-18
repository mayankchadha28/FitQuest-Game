const Fitness = require("../db/fitness");
// const User = require("../db/user");

exports.addFitnessDetails = async (req, res) => {
    try {
        const fitnessDetailsCount = await Fitness.count({
            where: { userId: req.userData.id }
        });
        if (fitnessDetailsCount > 0) {
            return res.status(400).json({
                message: "Fitness data already exists"
            });
        }
        const fitnessDetails = await Fitness.create({
            ...req.body,
            userId: req.userData.id
        });
        res.status(200).json(fitnessDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.getFitnessDetails = async (req, res) => {
    try {
        const fitnessDetails = await Fitness.findOne({ where: { userId: req.userData.id } });
        if (!fitnessDetails) {
            return res.status(404).json({ message: "Fitness Details not found" });    
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Something went wrong" });
    }
}

exports.getStepsVia

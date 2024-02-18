const Follow = require("../db/follow")

exports.followUser = async (req, res) => {
    try {
        if (req.body.userToBeFollowed) {
            return res.status(400).json({
                message: "Missing parameters in request body"
            })
        }
        const alreadyFollows = await Follow.count({
            where: {
                follower: req.userData.id,
                userBeingFollowed: req.body.userToBeFollowed
            }
        });

        if (alreadyFollows > 0) {
            return res.status(400).json({
                message: "You already follow this user"
            });
        }

        await Follow.create({
            follower: req.userData.id,
            userBeingFollowed: req.body.userToBeFollowed
        });

        res.status(200).json({
            message: "You have started following this user"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.getFollowCount = async (req, res) => {
    try {
        const followerCount = await Follow.count({
            where: { userBeingFollowed: req.userData.id }
        });

        const followingCount = await Follow.count({
            where: { follower: req.userData.id }
        });

        return res.status(200).json({
            followerCount,
            followingCount
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
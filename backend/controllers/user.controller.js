import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        const filterUsers = await User.find({_id: {$ne: loggedInUserID}}).select('-password');

        return res.json(filterUsers);
    } catch(error) {
        console.error(`Internal Server Error at getUsersForSideBar: ${error.message}`);

        return res.status(500).json({error: "internal server error"});
    }
}
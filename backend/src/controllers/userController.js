import { User } from "../models/user/user.model.js";

export const getProfileOfUser= async( req, res)=>
{
    try{
        const user = req.user;
        const userId= user.id;
        const dbuser = await User.findById(userId);
        // console.log("printing the user", user);
        return res.status(200).json({
            message: "User Profile",
            data:dbuser
        })

        // const queryParams = req.query;

        // console.log("printing user profile controller");

        // return res.status(200).json({
        //     status: "success", message: "success",
        //     data:{
        //         params: queryParams,
        //     }
        // });

        // const userId= req.params.userId;
        // data :()
    }
    catch(error)
    {
        console.error("error", error.message);
        return res.status(500).json({status: "internal server error", message:"error in getting profile", error: error.message});
    }
}

export const getMyUrls = async (req,res) =>
{
    try{
        const user= req.user;
        const userId= user.Id;
        const allurls= await User.find({userId});
        return req.status(200).json({
            data : allurls
        })
    }
    catch(error)
    {
        res.status(500).send({message:"Server error"});
    }
}


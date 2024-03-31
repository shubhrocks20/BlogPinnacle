import { Like } from "../../models/index.js";

const likesController = {
    async getAllPostLikedByUser(req, res, next){
        const {userId} = req.params;

        try{
            const document = await Like.find({user_id: userId}).select('-__v -createdAt -user_id -_id');
            res.json(document)
        } catch(err){
            return next(err);
        }
    }

};

export default likesController;
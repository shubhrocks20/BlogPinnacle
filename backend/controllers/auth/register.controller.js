import { Record } from "../../models";

const registerController = {
    async register(req, res, next){
        const {username, email, password} = req.body;

        const newUser = new Record({
            username, email, password
        })

        try{
            const savedUser = await newUser.save()
            if(!savedUser){
                res.status(400).json({error: 'Error Registering User'});
            }
            res.status(200).json({msg: 'User Registered Successfully!', savedUser});
        }
        catch(error){
            res.status(500).json({error: 'Internal Server Error!'});
        }

    }

    
} 
export default registerController;
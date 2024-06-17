import User from "../model/userModel.js";

export const create = async(req, res)=>{
    try{

        const userData = new User(req.body);

        if(!userData){
            res.status(400).json({
                message: "Invalid user data"
            }
        )
    }

            const saveData = await userData.save();
            res.status(201).json(
                saveData
            )  

    } catch(error){
        res.status(500).json({error: error
        });
    }
}

export const getAll = async (req, res) => {
    try{

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }

        res.status(200).json(userData);
    } catch(error){
        res.status(500).json({error: error
        });

    }
}


export const getOne = async (req, res) => {
    try{

        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json(userData);

    } catch(error){
        res.status(500).json({error: error
        });
    }
}

export const update = async (req, res) => {
    try{

        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }

        const updateData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updateData);

    } catch(error){
        res.status(500).json({error: error
        });
    }
}

export const deleteOne = async (req, res) => {
    try{

        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg:"User deleted successfully"});

    } catch(error){
        res.status(500).json({error: error
        });
    }
}

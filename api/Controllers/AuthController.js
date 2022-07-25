import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//Registering a new user

export const registerUser = async(req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass;

    const newUser = new UserModel(req.body)

    const {username} = req.body;

    try {

        const oldUser = await UserModel.findOne({username})
        if(oldUser) {
            return res.status(400).json({message: "username is already exists!"})
        }

        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_SECRET_KEY, {expiresIn: '2h'})

        res.status(200).json({user, token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Login User

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({username})

        if(user) {
            const validity = await bcrypt.compare(password, user.password)

            if(!validity){
                res.status(400).json("Invalid Password")
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_SECRET_KEY, {expiresIn: '2h'})

                res.status(200).json({user, token})
            }

        }
         else {
             res.status(400).json("User doesn't exit")
         }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
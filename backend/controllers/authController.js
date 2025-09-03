import validator from "validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req,res)=>{
    try {
        const {name, email, userName, password} = req.body;
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exists"})
        }
        if(!validator){
            return res.status(400).json({message:"Enter Valid email"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        let hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            userName,
            password:hashPassword
        })
        let token = await (genToken(user._id))
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:'Strict',
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message:`Signup controller ${error}`})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Login error ${error}` });
    }
};

export const logOut = async(req,res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message:`LogOut error ${error}`})
    }
}
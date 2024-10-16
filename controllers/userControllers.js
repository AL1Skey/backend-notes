import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helper/bcrypt.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
class UserController{
    static async createUser(req, res){
        try {
            const { name, email, password } = req.body;
            console.log({name, email, password})
            const find = await User.findByObj({ email });
            console.log(find)
            if (find.length > 0) {
                return res.status(409).json({ error: "User already exists" });
            }
            const user = await User.create({ nama:name, email, password: hashPassword(password) });
            res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllUsers(req, res){
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res){
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUserById(req, res){
        try {
            const { nama, email, role } = req.body;
            const user = await User.updateOne({ _id: req.params.id }, { $set: { nama, email, role } });
            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserById(req, res){
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res){
        try {
            console.log(process.env.JWT_SECRET);
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }
            console.log(user)
            const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

}

export default UserController;
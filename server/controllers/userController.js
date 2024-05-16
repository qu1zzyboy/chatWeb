import User from "../models/useModel.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const checkUser = await User.findOne({ username });
        if (checkUser) {
            return res.json({ msg: "username already existed", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "email already existed", status: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });

        const userObject = newUser.toObject();
        delete userObject.password;

        return res.json({
            status: true,
            msg: "Successfully registered",
            user: userObject
        });
    } catch (err) {
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Request Body:', req.body);
        const checkUser = await User.findOne({ username });

        if (!checkUser) return res.json({ status: false, msg: "We can not find this username" })
        const isPasswordValid = await bcrypt.compare(password, checkUser.password)
        if (!isPasswordValid) {
            return res.json({ msg: "Password is not correct", status: false })
        }
        const loginUser = checkUser.toObject()
        delete loginUser.password
        return res.json({ msg: "Login successfully", status: true, user: loginUser })
    } catch (err) {
        next(err)
    }


}
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
        ])
        res.json({ status: true, users })
    } catch (err) {
        next(err)
    }
}
export { register, login }


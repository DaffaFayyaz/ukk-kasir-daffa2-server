import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from "../../utils/constant.js";
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async(req, res) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        res.json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}


export const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
        const users = await prisma.users.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        res.json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        await prisma.users.delete({
            where: {
                id: id
            }
        });
        res.json({
            status: 'success',
            message: 'Data berhasil terhapus'
        });
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, confPassword, role } = req.body;

        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password and Confirm Password do not match" });
        }

        let dataToUpdate = {
            name: name,
            email: email,
            role: role
        };

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            dataToUpdate.password = hashPassword;
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: id
            },
            data: dataToUpdate,
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        res.json({
            status: 'success',
            data: updatedUser,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred while updating user", error: error.message });
    }
};

export const Register = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    } else if (!name) {
        return res.status(400).json({ msg: "Name must be filled" });
    } else if (!email) {
        return res.status(400).json({ msg: "Email must be filled" });
    } else if (!password) {
        return res.status(400).json({ msg: "Password must be filled" });
    } else if (!confPassword) {
        return res.status(400).json({ msg: "Confirmation Password must be filled" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();

    try {
        await prisma.users.create({
            data: {
                id,
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }
        });
        res.json({
            msg: "Successfully Registered",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};

export const Login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({msg: "Email not found"});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({msg: "Wrong Password"});
        }
        const accessToken = jwt.sign({
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: refreshToken
            }
        });
        console.log("Refresh token updated in the database:", refreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        });
        console.log("Refresh token updated in cookies:", refreshToken);
        res.json({accessToken});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"An error occurred while logging in"});
    }
};

export const Logout = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }
        // Find user by refresh token
        const user = await prisma.users.findFirst({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user) {
            return res.sendStatus(204);
        }
        const userId = user.id;
        // Clear refresh token in the database
        await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                refresh_token: null
            }
        });
        // Clear refresh token in the cookie
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

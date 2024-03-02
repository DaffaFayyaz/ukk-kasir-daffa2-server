import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../../utils/constant.js';

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await prisma.users.findMany({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user || user.length === 0) return res.sendStatus(403);
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const { id, name, email, role } = user[0];
            const accessToken = jwt.sign({ userId: id, name, email, role }, ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

 import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
       const token = cookies['jwt'];
         if (!token) {
            return res.ststus(403).json({
                message:"Token is Invalid",
            });
         }
         try {
            const decode =await jwt.decode(token);
            req.user = decode;
            console.log("Printing the value of decode--> ",decode);
            
         } catch (error) {
            console.error("Invalid token", error.message);
            return res.ststus(403).json({
                message:"Token is Invalid",
            });
            next();
            
         }

    } catch (error) {
        return res.status(500).send(error.message);

    }
}

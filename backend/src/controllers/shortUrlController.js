import { ShortURL } from '../models/shorturl.model.js';
import {nanoid } from 'nanoid';



export  const  createShortUrl = async (req , res) => {
    try {
             let {originalUrl, title, expiresAt, customUrl} = req.body;
              const userId = req.user._id;
             let newNanoId = nanoid(7);

             while(true){
                const existing = await ShortUrl.findOne({shortCode: newNanoId});
                if(!existing) break;
                newNanoId = nanoid(7);
             }

             if(customUrl)
                {
                    const existing = await ShortUrl.findOne({shortCode: customUrl});
                    if(!existing){
                        newNanoId = customUrl;
                    }
                }

                const newShortCode = await ShortUrl.create({
                    originalUrl,
                    title,
                    shortCode: newNanoId,
                    expiresAt: new Date(expiresAt),
                    userId,
                });

                res.status(200).json({
                    message: 'short url created successfully',
                    data : newShortCode
                });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
             message: 'error in cheating short url'
            });
    }
};

export default createShortUrl;
 

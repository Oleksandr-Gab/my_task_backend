import {
    processFolderIcon,
    processGenerateResponsiveUrls,
} from '../services/cloudinary.service.js';

const folderName = 'backgrounds';

export const getBackgroundIcon = async (req, res, next) => {
    try {
        const iconsData = await processFolderIcon(folderName);
        res.json(iconsData);
    } catch (error) {
        console.log(error);
    }
};

export const getBackgroundsResponse = async (req, res, next) => {
    const bakcgroundId = req.params.backgroundsId;
    console.log(bakcgroundId);

    try {
        const imageData = await processGenerateResponsiveUrls(bakcgroundId);
        res.json(imageData);
    } catch (error) {
        console.log(error);
    }
};

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const genereteIconBackgroundUrl = publicId => {
    return {
        icon: cloudinary.url(publicId, {
            quality: 'auto:best',
            fetch_format: 'png',
            width: 32,
            height: 32,
            crop: 'thumb',
            effect: 'art:zorro',
        }),
    };
};

const generateResponsiveUrls = publicId => {
    const baseParams = {
        crop: 'lfill',
        quality: 'auto:best',
        fetch_format: 'auto', // Автоматичний вибір формату (WebP, AVIF)
    };

    return {
        // ТЕЛЕФОН
        mobile: cloudinary.url(publicId, {
            ...baseParams,
            width: 375,
            height: 812,
        }),

        // ПЛАНШЕТ
        tablet: cloudinary.url(publicId, {
            ...baseParams,
            width: 768,
            height: 956,
        }),

        // ДЕСКТОП
        desktop: cloudinary.url(publicId, {
            ...baseParams,
            width: 'auto',
        }),
    };
};

export const processFolderIcon = async folderName => {
    try {
        const result = await cloudinary.api.resources_by_asset_folder(
            folderName,
            {
                // context: true,
                max_results: 50,
            }
        );

        const processedIcon = result.resources.map(resource => {
            const publicId = resource.public_id;
            const urls = genereteIconBackgroundUrl(publicId);

            return {
                id: resource.asset_id,
                publicId: publicId,
                title: publicId.split('/').pop(),
                urls: urls.icon,
            };
        });

        return processedIcon;
    } catch (error) {
        console.error('Cloudinary Service Error:', error);
        throw new Error('Failed to load images from Cloudinary.');
    }
};

export const processGenerateResponsiveUrls = async publicId => {
    if (!publicId) {
        throw new Error('Public ID не може бути порожнім.');
    }
    try {
        const result = await cloudinary.api.resource(publicId);
        const urls = generateResponsiveUrls(result.public_id);

        return urls;
    } catch (error) {
        console.error('Cloudinary Service Error:', error);
        throw new Error('Failed to load images from Cloudinary.');
    }
};

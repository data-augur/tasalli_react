import UploadPicturesApp from './UploadPictureApp';

export const UploadPicturesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/uploadPictures',
            component: UploadPicturesApp
        }
    ]
};

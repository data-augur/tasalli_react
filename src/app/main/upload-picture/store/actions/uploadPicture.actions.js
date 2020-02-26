import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
export const ADD_UPLOADPICTURE = '[UPLOADPICTURES APP] ADD UPLOADPICTURE';

export const SET_PROCESS = '[UPLOADPICTURES APP] SET PROCESS';
export const OPEN_NEW_UPLOADPICTURE_DIALOG = '[UPLOADPICTURES APP] OPEN NEW UPLOADPICTURE DIALOG';
export const CLOSE_NEW_UPLOADPICTURE_DIALOG =
    '[UPLOADPICTURES APP] CLOSE NEW UPLOADPICTURE DIALOG';

export const addUploadPicture = newUploadPicture => dispatch => {
    let file= newUploadPicture.images;
    let formdata= new FormData();
    formdata.append('image', file);
    dispatch(showMessage({message: 'Please wait for response! ', variant: "info"}));
    dispatch({
        type: SET_PROCESS,
        isProcess: true
    });
    dispatch({
        type: ADD_UPLOADPICTURE,
        payload: '',
    });
    axios({
        url: Base_URL+'upload-picture-desktop',
        method: "POST",
        data: formdata
    })
        .then(res => {
            dispatch({
                type: SET_PROCESS,
                isProcess: false
            });
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Response: '+res.data.msg, variant: "success"}));
            }
            dispatch({
                type: ADD_UPLOADPICTURE,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
        });

};

export function openNewUploadPictureDialog() {
    return {
        type: OPEN_NEW_UPLOADPICTURE_DIALOG
    };
}

export function closeNewUploadPictureDialog() {
    return {
        type: CLOSE_NEW_UPLOADPICTURE_DIALOG
    };
}
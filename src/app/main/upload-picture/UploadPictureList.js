import React, {Component} from 'react';
import {
    Typography
} from '@material-ui/core';
import { FuseUtils} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

class UploadPicturesList extends Component {
    state = {
        selectedUploadPicturesMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };


    render() {
        const {
            uploadPictures,
        } = this.props;
        const data = uploadPictures;
        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        Processing!
                    </Typography>
                </div>
            );
        }


        return (

            <div className="flex flex-1  p-8 sm:p-24">
                <div className="flex flex-1 pr-8 sm:w-224">

                    <div>

                        <h3>
                            {data.msg} {data.tag ? ' and image cypheme code : '+data.tag : ''}
                        </h3>

                        <br />

                        <div>
                            {data.productExists==='productExists' ? '' : ''}
                            {data.productExists==='productDoesNotExists' ? 'The product does not exsists.' : ''}
                        </div>

                        <br />



                        <div>
                            {data.productExists==='productExists' ? (

                                <div>
                                    <h2>
                                        {data.productInfo ? 'Product Details:- ' : ''}
                                    </h2>

                                    <div className="flex flex-1 p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Product Name
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.name}
                                            </b>
                                        </div>
                                    </div>

                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Manufacture Date
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.manufactureDate}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Expiry Date
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.expireDate}
                                            </b>
                                        </div>
                                    </div>


                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Batch Number
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.batchNumber}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Serial Number
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.serialNumber}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Product Warranty
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.product_has_warranty}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Brand Name
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.brandName}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="flex flex-1  p-8 sm:p-10">
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            Company Name
                                        </div>
                                        <div className="flex flex-1 pr-8 sm:px-12">
                                            <b>
                                                {data.productInfo.companyName}
                                            </b>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <div> </div>
                            )}



                        </div>

                    </div>

                </div>
                <div className="flex flex-2 pr-8 sm:px-12">
                    {data.productExists==='productExists' ? (
                        <img
                            height="300" width="300"
                            src={data.productInfo.image_url}
                            alt="logo"
                        />
                    ) : (
                    <div> </div>
                    )}
                </div>
            </div>



        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
        },
        dispatch
    );
}

function mapStateToProps({uploadPicturesApp}) {

    return {
        uploadPictures: uploadPicturesApp.uploadPictures.entities,
        user: uploadPicturesApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UploadPicturesList)
);

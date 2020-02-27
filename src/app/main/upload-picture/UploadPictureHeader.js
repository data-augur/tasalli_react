import React, {Component} from 'react';
import {Button, Icon, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from "../upload-picture/store/actions";

class UploadPicturesHeader extends Component {
    state = {
        images: ''
    };
    handleFile(e){
        let file=e.target.files[0];
        this.setState({images: file})
    }
    render() {
        const { addUploadPicture, isProcess, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Cypheme Code
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <MuiThemeProvider theme={mainTheme} >
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4 text-black"
                                        // elevation={0}
                                        variant="outlined"
                                    >
                                        <input title="Image" type="file" name="images" onChange={(e)=>this.handleFile(e)}
                                        />
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop:5}}
                            variant="contained"
                            color="secondary"
                            disabled={
                                this.state.images==='' || isProcess
                            }
                            onClick={() => {
                                addUploadPicture(this.state);
                            }}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addUploadPicture: Actions.addUploadPicture
        },
        dispatch
    );
}

function mapStateToProps({uploadPicturesApp, fuse}) {
    return {
        mainTheme: fuse.settings.mainTheme,
        isProcess: uploadPicturesApp.uploadPictures.isProcess,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPicturesHeader);

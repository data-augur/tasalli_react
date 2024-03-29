import React, {Component} from 'react';
// import {withStyles} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import LogsList from './LogsList';
import LogsHeader from './LogsHeader';
// import LogDialog from './BrandsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';

// const styles = theme => ({
//     addButton: {
//         position: 'fixed',
//         right: 12,
//         bottom: 12,
//         zIndex: 99
//     }
// });

class LogsApp extends Component {
    componentDidMount() {
        this.props.getLogs(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getLogs(this.props.match.params);
        }
    }

    render() {
        if (!localStorage.getItem('jwtToken')) {
            window.location = '/login';
        }
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: 'p-16 sm:p-24 pb-80',
                        leftSidebar: 'w-256 border-0',
                        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                    }}
                    header={<LogsHeader pageLayout={() => this.pageLayout}/>}
                    content={<LogsList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />

            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getLogs: Actions.getLogs,
            openNewLogDialog: Actions.openNewLogDialog
        },
        dispatch
    );
}

function mapStateToProps({logsApp}) {
    return {
        selectedLogIds: logsApp.logs.selectedLogIds,
        searchText: logsApp.logs.searchText,
        user: logsApp.user
    };
}

export default withReducer('logsApp', reducer)(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(LogsApp)
    )
);

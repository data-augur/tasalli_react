import * as Actions from "../actions";
import _ from "@lodash";
import * as authActions from "../../../../auth/store/actions";

const initialState = {
    entities: [],
    searchText: "",
    selectedNotificationIds: [],
    routeParams: {},
    notificationDialog: {
        type: "new",
        props: {
            open: false
        },
        data: null
    }
};

const notificationsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                searchText: "",
                selectedNotificationIds: [],
                routeParams: {},
                notificationDialog: {
                    type: "new",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_NOTIFICATIONS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, "id")
            };
        }
        case Actions.ADD_NOTIFICATION: {
            return {
                ...state,
                entities: _.keyBy(action.payload, "id")
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_NOTIFICATIONS: {
            const notificationId = action.notificationId;

            let selectedNotificationIds = [...state.selectedNotificationIds];

            if (
                selectedNotificationIds.find(id => id === notificationId) !== undefined
            ) {
                selectedNotificationIds = selectedNotificationIds.filter(
                    id => id !== notificationId
                );
            } else {
                selectedNotificationIds = [...selectedNotificationIds, notificationId];
            }

            return {
                ...state,
                selectedNotificationIds: selectedNotificationIds
            };
        }
        case Actions.SELECT_ALL_NOTIFICATIONS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedNotificationIds = arr.map(notification => notification.id);

            return {
                ...state,
                selectedNotificationIds: selectedNotificationIds
            };
        }
        case Actions.DESELECT_ALL_NOTIFICATIONS: {
            return {
                ...state,
                selectedNotificationIds: []
            };
        }
        case Actions.OPEN_NEW_NOTIFICATION_DIALOG: {
            return {
                ...state,
                notificationDialog: {
                    type: "new",
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_NOTIFICATION_DIALOG: {
            return {
                ...state,
                notificationDialog: {
                    type: "new",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_NOTIFICATION_DIALOG: {
            return {
                ...state,
                notificationDialog: {
                    type: "edit",
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_NOTIFICATION_DIALOG: {
            return {
                ...state,
                notificationDialog: {
                    type: "edit",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default notificationsReducer;

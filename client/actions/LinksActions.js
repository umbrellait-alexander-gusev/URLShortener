import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const LinkActions = {
    loadLinks() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_LINKS_REQUEST
        });

        api.listLinks()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_LINKS_SUCCESS,
                links: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_LINKS_FAIL,
                error: err
            })
        );
    },

    createLink(link) {
        api.createLink(link)
        .then(() =>
            this.loadLinks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteLink(linkId) {
        api.deleteLink(linkId)
        .then(() =>
            this.loadLinks()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default LinkActions;

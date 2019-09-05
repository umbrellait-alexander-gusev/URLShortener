import React from 'react';

import LinksStore from '../stores/LinksStore';
import LinksActions from '../actions/LinksActions';

import PageLinks from './PageLinks.jsx';

function getStateFromFlux() {
    return {
        isLoading: LinksStore.isLoading(),
        links: LinksStore.getLinks()
    };
}

const OtherLinks = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        LinksActions.loadLinks();
    },

    componentDidMount() {
        LinksStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        LinksStore.removeChangeListener(this._onChange);
    },

    render() {
        return (
            <PageLinks  links={this.state.links}/>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default OtherLinks;

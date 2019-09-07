import React from "react";

let hostName = document.domain + ':8080';
// const hostName = 'http://localhost:3001';

let linkCodeNow = document.URL;
linkCodeNow = linkCodeNow.replace('http://' + hostName + '/', '');

const OtherLinks = React.createClass({
    locationRun (url) {
        window.location.assign(url);
    },

    render() {
        this.props.links.map(link => {
                let linkCode = link.URLShort;
                linkCode = linkCode.replace(hostName + '/', '');

                if (linkCode === linkCodeNow) {
                    this.locationRun(link.URLOrigin);
                }
            }
        );
    }
});

export default OtherLinks;

import React from "react";

// const hostName = document.domain;
const hostName = 'http://localhost:3001';

let linkCodeNow = document.URL;
linkCodeNow = linkCodeNow.replace(hostName + '/', '');

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

        return (
            <div>
                <p>hostName : {hostName}</p>
                <p>linkCodeNow : {linkCodeNow}</p>
            </div>
        );
    }
});

export default OtherLinks;

import React from "react";

const hostName = document.domain;

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
            <stub/>
        );
    }
});

export default OtherLinks;

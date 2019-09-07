import React from "react";

let hostName = document.domain + ':8080';
// const hostName = 'http://localhost:3001';

let linkCodeNow = document.URL;
// linkCodeNow = linkCodeNow.replace(hostName + '/', '');

const OtherLinks = React.createClass({
    locationRun (url) {
        window.location.assign(url);
    },

    render() {
        this.props.links.map(link => {
                let linkCode = link.URLShort;
                linkCode = linkCode.replace(hostName + '/', '');

                console.log(linkCode);
                console.log(linkCodeNow);
                console.log(linkCode === linkCodeNow);
                console.log('---------');

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

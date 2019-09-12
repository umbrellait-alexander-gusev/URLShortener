import React from "react";
import CreateReactClass from 'create-react-class';

const hostName = process.env.REACT_APP_CLIENT_API_PREFIX;

let linkCodeNow = document.URL;
linkCodeNow = linkCodeNow.replace('http://' + hostName + '/', '');

const OtherLinks = CreateReactClass({
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
                <p>linkCodeNow : {linkCodeNow}</p>
            </div>
        );
    }
});

export default OtherLinks;

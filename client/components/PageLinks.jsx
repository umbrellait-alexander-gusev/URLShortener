import React from "react";
import CreateReactClass from 'create-react-class';
import env from '../config/config'

const hostName = env.client_api_prefix;

let linkCodeNow = document.URL;
let RelinkCodeNow = linkCodeNow.replace(hostName + '/', '');

const OtherLinks = CreateReactClass({
    locationRun (url) {
        window.location.assign(url);
    },

    render() {
        this.props.links.map(link => {
                let linkCode = link.URLShort;
                let RelinkCode = linkCode.replace(hostName + '/', '');

                if (RelinkCode === RelinkCodeNow) {
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

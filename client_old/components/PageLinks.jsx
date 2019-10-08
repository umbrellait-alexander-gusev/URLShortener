import React from "react";
import CreateReactClass from 'create-react-class';
import env from '../config/config'

const apiPrefix = env.api_prefix;

let linkCodeNow = location.host + location.pathname;
let RelinkCodeNow = linkCodeNow.replace(apiPrefix + '/', '');

const OtherLinks = CreateReactClass({
    locationRun (url) {
        window.location.assign(url);
    },

    render() {
        this.props.links.map(link => {
                let linkCode = link.short;
                let RelinkCode = linkCode.replace(apiPrefix + '/', '');

                if (RelinkCode === RelinkCodeNow) {
                    this.locationRun(link.originUrl);
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

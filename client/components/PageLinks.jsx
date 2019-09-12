import React from "react";
import CreateReactClass from 'create-react-class';

const hostName = process.env.REACT_APP_CLIENT_API_PREFIX;
console.log(hostName);

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

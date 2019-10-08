import React from 'react';
import { env } from '../config/config';
import { listLinks } from '../api/index';

const apiPrefix = env.api_prefix;

let linkCodeNow = location.host + location.pathname;
let relinkCodeNow = linkCodeNow.replace(apiPrefix + '/', '');

export class PageLinks extends React.Component {
  locationRun(url) {
    window.location.assign(url);
  }

  render() {
    listLinks().then(({ data }) => {
      data.map((link) => {
        let linkCode = link.shortUrl;
        let relinkCode = linkCode.replace(apiPrefix + '/', '');

        if (relinkCodeNow === relinkCode) {
          this.locationRun(link.originUrl);
        }
      });
    });

    return (
      <div>
        <p>linkCodeNow : {linkCodeNow}</p>
      </div>
    );
  }
}

import React from 'react';

import { env } from '../config/config';
import { checkSlug, getUrl } from '../api/index';

const apiPrefix = env.api_prefix;

let linkCodeNow = location.host + location.pathname;
let relinkCodeNow = linkCodeNow.replace(apiPrefix + '/', '');

export class PageLinks extends React.Component {
  locationRun(url) {
    window.location.assign(url);
  }

  render() {
    checkSlug(relinkCodeNow).then((boolean) => {
      if (boolean.data) {
        getUrl(relinkCodeNow).then((url) => {
          this.locationRun(url.data);
        });
      } else {
        this.locationRun('/page-not-found');
      }
    });

    return <div />;
  }
}

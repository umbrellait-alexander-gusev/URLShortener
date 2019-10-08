import React from 'react';
import { Collapse } from 'react-collapse';
import { createLink, listLinks } from '../../api/index';
import '../../stores/linkStore';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originUrl: '',
      shortCustomUrl: '',
      textOpen: true,
      originFormOpen: true,
      customFormOpen: false,
      copyFormOpen: false,
      alertFormEmpty: false,
    };

    this.handleRandomlyChange = this.handleRandomlyChange.bind(this);
    this.handleCustomChange = this.handleCustomChange.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
    this.handleCustomForm = this.handleCustomForm.bind(this);
    this.handleRandomlyForm = this.handleRandomlyForm.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  handleRandomlyChange(event) {
    this.setState({ originUrl: event.target.value });
    this.setState({ alertFormEmpty: false });

    if (this.state.shortCustomUrl.length === 0) {
      this.setState({
        alertBlankText: false,
      });
    }
  }

  handleCustomChange(event) {
    const VALUE = event.target.value;
    if (VALUE.match('^[a-zA-Z0-9_]*$') !== null && VALUE.length < 6) {
      this.setState({
        shortCustomUrl: VALUE,
      });

      this.props.checkLoad();

      listLinks()
        .then((data) => {
          this.props.checkSuccess({ data, value: VALUE });
        })
        .catch((error) => {
          this.props.checkError(error);
        });
    }
  }

  handleLinkAdd() {
    if (this.state.originUrl.length > 0) {
      const newLink = {
        shortUrl: '',
        shortCustomUrl: this.state.shortCustomUrl,
        originUrl: this.state.originUrl,
      };

      this.props.createLoad();

      createLink(newLink)
        .then((data) => {
          listLinks()
            .then((db) => {
              this.props.createSuccess({ data, db: db });
            })
            .catch((error) => {
              this.props.createError(error);
            });
        })
        .catch((error) => {
          this.props.createError(error);
        });

      this.setState({
        alertFormEmpty: false,
        originFormOpen: false,
        customFormOpen: false,
        copyFormOpen: true,
      });
    } else {
      this.setState({ alertFormEmpty: true });
    }
  }

  handleCustomForm() {
    this.setState({
      shortCustomUrl: '',
      alertFormEmpty: false,
      alertUrlExist: false,
      customFormOpen: !this.state.customFormOpen,
    });
  }

  handleRandomlyForm() {
    this.setState({
      shortCustomUrl: '',
      alertFormEmpty: false,
      alertUrlExist: false,
    });
  }

  copyUrl() {
    const copyText = document.getElementById('copy-url');
    copyText.select();
    document.execCommand('copy');
  }

  reloadPage() {
    this.props.createLoad();

    this.setState({
      originUrl: '',
      shortCustomUrl: '',
      originFormOpen: true,
      copyFormOpen: false,
    });
  }

  render() {
    const { textOpen } = this.state;

    return (
      <div className="form-wrapper">
        <Collapse isOpened={this.state.originFormOpen}>
          <div className="form-block">
            <h3>Randomly generate</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the link here"
                value={this.state.originUrl}
                onChange={this.handleRandomlyChange}
              />

              <div className="input-group-append shorten-button">
                <button className="btn btn-outline-secondary" onClick={this.handleLinkAdd}>
                  Shorten URL
                </button>
              </div>
            </div>

            <Collapse isOpened={this.state.alertFormEmpty}>
              <div className="alert alert-danger alert-exit-done" role="alert">
                You forgot to enter url
              </div>
            </Collapse>
          </div>
        </Collapse>

        <Collapse isOpened={this.state.customFormOpen}>
          <div className="form-block form-block-exit-done">
            <h3>Custom url</h3>

            <p className="mb-0">The maximum length is 5 characters.</p>

            <Collapse isOpened={this.props.checkIsLoading}>
              <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true" />
              </div>
            </Collapse>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the link here"
                value={this.state.shortCustomUrl}
                onChange={this.handleCustomChange}
              />
            </div>

            <Collapse isOpened={this.props.checkDuplicate}>
              <div className="alert alert-danger alert-exit-done" role="alert">
                Oops! This url is already taken = (
              </div>
            </Collapse>
          </div>
        </Collapse>

        <Collapse isOpened={!this.state.copyFormOpen}>
          <button
            onClick={() => {
              this.handleCustomForm();
              this.setState({ textOpen: !textOpen });
            }}
            className="btn btn-outline-info mb-3 shadow-none"
          >
            {textOpen && <span>Custom url</span>}
            {!textOpen && <span>Randomly generate</span>}
          </button>
        </Collapse>

        <Collapse isOpened={this.state.copyFormOpen}>
          <div id="copy-form" className="form-block form-block-exit-done">
            <h3>Copy your URL</h3>

            <div className="input-group mb-3">
              <input id="copy-url" type="text" className="form-control" value={this.props.getShortUrl} readOnly />
              <div className="input-group-append">
                <button id="button-copy-url" className="btn btn-outline-secondary" onClick={this.copyUrl}>
                  Copy URL
                </button>
              </div>
            </div>

            <button className="btn btn-outline-info" onClick={this.reloadPage}>
              Create new URL
            </button>
          </div>
        </Collapse>
      </div>
    );
  }
}

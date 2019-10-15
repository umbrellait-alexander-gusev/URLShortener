import React from 'react';
import { Collapse } from 'react-collapse';
import { createLink, checkSlug } from '../../api/index';
import '../../stores/linkStore';
import { env } from '../../config/config';
import { toastErrors } from '../../utils/toastErrors';
import { toast } from 'react-toastify';

const apiPrefix = env.api_prefix;

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      slug: '',
      customSlug: '',
      textOpen: true,
      originFormOpen: true,
      customFormOpen: false,
      copyFormOpen: false,
    };

    this.handleRandomlyChange = this.handleRandomlyChange.bind(this);
    this.handleCustomChange = this.handleCustomChange.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
    this.handleCustomForm = this.handleCustomForm.bind(this);
    this.handleRandomlyForm = this.handleRandomlyForm.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  handleRandomlyChange(event) {
    this.setState({ url: event.target.value });
  }

  handleCustomChange(event) {
    const VALUE = event.target.value;
    if (VALUE.match('^[a-zA-Z0-9_]*$') !== null && VALUE.length < 6) {
      this.setState({
        customSlug: VALUE,
      });

      this.props.checkActionsLoad();

      checkSlug(VALUE)
        .then((data) => {
          this.props.checkActionsSuccess(data.data);
          if (data.data) {
            toast.warn('Oops! This url is already taken = (');
          }
        })
        .catch((error) => {
          this.props.checkError(error);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.createError !== prevProps.createError && this.props.createError) {
      toastErrors(this.props.createError);
    }
  }

  handleLinkAdd() {
    if (this.state.url.length === 0) {
      toast.warn('You forgot to enter url');
      return;
    }

    const newLink = {
      customSlug: this.state.customSlug,
      url: this.state.url,
    };

    this.props.createActionsLoad();

    createLink(newLink)
      .then((data) => {
        this.props.createActionsSuccess(`${apiPrefix}/${data.data.slug}`);

        this.setState({
          originFormOpen: false,
          customFormOpen: false,
          copyFormOpen: true,
        });
      })
      .catch((error) => {
        this.props.createActionsError(error);
      });
  }

  handleCustomForm() {
    this.setState({
      customSlug: '',
      customFormOpen: !this.state.customFormOpen,
    });
  }

  handleRandomlyForm() {
    this.setState({
      customSlug: '',
    });
  }

  copyUrl() {
    const copyText = document.getElementById('copy-url');
    copyText.select();
    document.execCommand('copy');
  }

  reloadPage() {
    this.setState({
      url: '',
      customSlug: '',
      originFormOpen: true,
      copyFormOpen: false,
      textOpen: true,
    });
  }

  render() {
    const { textOpen } = this.state;

    return (
      <div className="form-wrapper">
        <Collapse isOpened={this.props.checkIsLoading || this.props.createIsLoading}>
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div className="spinner-border ml-auto" role="status" aria-hidden="true" />
          </div>
        </Collapse>
        <Collapse isOpened={this.state.originFormOpen}>
          <div className="form-block">
            <h3>Randomly generate</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the link here"
                value={this.state.url}
                onChange={this.handleRandomlyChange}
              />

              <div className="input-group-append shorten-button">
                <button className="btn btn-outline-secondary" onClick={this.handleLinkAdd}>
                  Shorten URL
                </button>
              </div>
            </div>
          </div>
        </Collapse>
        <Collapse isOpened={this.state.customFormOpen}>
          <div className="form-block form-block-exit-done">
            <h3>Custom slug</h3>

            <p className="mb-0">Custom slug must contain 5 characters.</p>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the link here"
                value={this.state.customSlug}
                onChange={this.handleCustomChange}
              />
            </div>
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
              <input id="copy-url" type="text" className="form-control" value={this.props.getSlug} readOnly />
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

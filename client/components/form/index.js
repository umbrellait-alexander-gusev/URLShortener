import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from './Form.jsx';
import * as check from '../../stores/check/checkActions';
import * as create from '../../stores/create/createActions';

const mapStateToProps = (state) => {
  return {
    checkIsLoading: state.check.isLoading,
    checkError: state.check.error,
    checkDuplicate: state.check.duplicate,
    createIsLoading: state.create.isLoading,
    createError: state.create.error,
    getShortUrl: state.create.shortUrl,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    checkLoad: bindActionCreators(check.checkActionsLoad, dispatch),
    checkSuccess: bindActionCreators(check.checkActionsSuccess, dispatch),
    checkError: bindActionCreators(check.checkActionsError, dispatch),
    createLoad: bindActionCreators(create.createActionsLoad, dispatch),
    createSuccess: bindActionCreators(create.createActionSuccess, dispatch),
    createError: bindActionCreators(create.createActionsError, dispatch),
  };
};
const Connected = connect(
  mapStateToProps,
  mapActionToProps,
)(Form);

export { Connected as Form };

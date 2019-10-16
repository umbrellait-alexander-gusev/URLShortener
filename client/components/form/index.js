import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form } from './Form.jsx';
import * as check from '../../stores/check/checkActions';
import * as create from '../../stores/create/createActions';

const mapStateToProps = (state) => {
  return {
    checkIsLoading: state.check.isLoading,
    checkError: state.check.error,
    createIsLoading: state.create.isLoading,
    createSuccess: state.create.success,
    createError: state.create.error,
    getSlug: state.create.slug,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    checkActionsLoad: bindActionCreators(check.checkActionsLoad, dispatch),
    checkActionsSuccess: bindActionCreators(check.checkActionsSuccess, dispatch),
    checkActionsError: bindActionCreators(check.checkActionsError, dispatch),
    createActionsLoad: bindActionCreators(create.createActionsLoad, dispatch),
    createActionsSuccess: bindActionCreators(create.createActionsSuccess, dispatch),
    createActionsError: bindActionCreators(create.createActionsError, dispatch),
  };
};
const Connected = connect(
  mapStateToProps,
  mapActionToProps,
)(Form);

export { Connected as Form };

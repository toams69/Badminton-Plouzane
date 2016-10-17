import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ForgotPwdForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
     this.props.resetMe();
  }

  render() {
    const {forgotPwd, asyncValidating, fields: {email}, handleSubmit, submitting, user } = this.props;

    return (
      <div className="container">
      <form onSubmit={handleSubmit(forgotPwd.bind(this))}>

        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email*</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary"  disabled={submitting} >Envoyer</button>
        <Link to="/" className="btn btn-error">Annuler</Link>
      </form>

      </div>

    );
  }
}

export default ForgotPwdForm;
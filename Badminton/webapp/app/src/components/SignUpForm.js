import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {TextField, RaisedButton}from 'material-ui';


const styles = {
  image: {
    height: "80px"
  }
};

class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/profileCreator');
    }
  }

  render() {
    const {asyncValidating, fields: { name, username, email, password, confirmPassword }, handleSubmit, submitting } = this.props;
    return (
      <div className="signup-container">
        <div className="content">
          <img src={'/img/logo_480.png'} alt="boohoo" style={styles.image}/>
          <h2>Inscription sur BestSpot4Me</h2>
          <form onSubmit={handleSubmit(this.props.signUpUser.bind(this))}>
            <TextField
              hintText=""
              floatingLabelText="Prénom + Nom"
              errorText={name.touched ? name.error : ''}
              {...name}
            />
            <br />
            <TextField
              hintText=""
              floatingLabelText="Nom d'utilisateur"
              errorText={username.touched ? username.error : ''}
              {...username}
            />
            <br/>
            <TextField
              hintText=""
              floatingLabelText="Email"
              errorText={email.touched ? email.error : ''}
              {...email}
            />
            <br/>

            <TextField
              hintText=""
              floatingLabelText="Mot de Passe"
              type="password"
              errorText={password.touched ? password.error : ''}
              {...password}
            />
            <br />

            <TextField
              hintText=""
              floatingLabelText="Retaper votre mot de passe"
              type="password"
              errorText={confirmPassword.touched ? confirmPassword.error : ''}
              {...confirmPassword}
            />
            <br />

            <div className="button-container">
              <RaisedButton label="S'inscrire" primary={true}  type="submit"/>
              <Link to="/"><RaisedButton label="Annuler"  /></Link>
            </div>
          </form>
         </div>
      </div>

    );
  }
}

export default SignUpForm;
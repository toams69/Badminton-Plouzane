import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {TextField, RaisedButton}from 'material-ui';

const styles = {
  image: {
    height: "80px"
  }
};

class SignInForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/map');  
    }
    if(nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
      alert(nextProps.user.error.message);
    }
  }

  render() {
    const {asyncValidating, fields: {username, password}, handleSubmit, submitting, user } = this.props;
    return (
      <div className="login-container">
        <div className="content">
          <img src={'/img/logo_480.png'} alt="boohoo" style={styles.image}/>
          <h2>Bienvenue sur BestSpot4Me</h2>        
          <form onSubmit={handleSubmit(this.props.signInUser.bind(this))}>
            <TextField
              hintText=""
              floatingLabelText="Nom d'utilisateur"
              errorText={username.touched ? username.error : ''}
              {...username}
            />
            <br />
            <TextField
              hintText=""
              type="password"
              floatingLabelText="Mot de Passe"
              errorText={password.touched ? password.error : ''}
              {...password}
            />
            <br />
            <div className="button-container">
              <RaisedButton label="Se connecter" primary={true}  type="submit"/>
              <Link to="/signup" ><RaisedButton label="S'enregistrer"  /></Link>
            </div>
          </form>
         </div>
      </div>

    );
  }
}

export default SignInForm;
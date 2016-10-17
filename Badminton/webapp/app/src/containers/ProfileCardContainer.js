import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addActivity, addActivitySuccess } from '_common/actions/users';
import ProfileCard from '../components/ProfileCard.js';



// //For any field errors upon submission (i.e. not instant check)
// const _addActivity = (values, dispatch) => {
// 	console.log("coucou");
// 	console.log(values);
// 	const user = values.user;
// 	if (!user.activities) {
// 		user.activities = [values.activity]
// 	} else {
// 		user.activities.push(values.activity)
// 	}
//     dispatch(addActivitySuccess(user));
// };



const mapDispatchToProps = (dispatch) => {
  return {
   addActivity: (user, activity) => {
   	if (!user.activities) {
		user.activities = [activity]
	} else {
		user.activities.push(activity)
	}
    dispatch(addActivitySuccess(user));
   },
   
   resetMe: () =>{
    //sign up is not reused, so we dont need to resetUserFields
    //in our case, it will remove authenticated users
     // dispatch(resetUserFields());
    }
  }
}

const mapStateToProps = (state) => {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);

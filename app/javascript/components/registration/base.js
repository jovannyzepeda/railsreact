import React from 'react';
import {redA400, blueA400} from 'material-ui/styles/colors';
export const styles = {
	buttonTop:{
		marginTop: '1em'
	},
	underlineFocusStyle: {
		borderColor: blueA400
	},
	floatingLabelFocusStyle: {
		color: blueA400
	},
	leftSpace: {
		marginLeft: '1em'
	},
	red: redA400,
	blue: blueA400
}

export class Base extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			canSubmit: true,
			email: '',
			password: '',
			passwordConfirmation: '',
			error: ''
		};
	}

	/*activar desactivar el button disabled*/
	enableSubmitBtn(){
		this.setState({
			canSubmit: true
		})
	}
	disableSubmitBtn(){
		this.setState({
			canSubmit: false
		})
	}
	reload(){
		window.location.href = window.location.href;
	}
	/*de esta manera s asginan los valores al controlador react*/
	syncField(ev, fieldName){
		let element = ev.target;
		let value = element.value;
		let jsonState = {};
		jsonState[fieldName] = value;
		this.setState(jsonState);

	}
}
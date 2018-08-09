import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import {Base, styles} from './base';
import reqwest from 'reqwest';


export class SignUp extends Base{
	
	submit(){
		reqwest({
			url: '/users.json',
			method: 'POST',
			data: {
				user:{
					email: this.state.email,
					password: this.state.password,
					passwordConfirmation: this.state.passwordConfirmation
				}
			},
			headers: {
				'X-CSRF-Token': window.MiProyecto.token
			}
		}).then(data => {
			console.log(data)
			this.reload();
		}).catch(err => this.handleError(err))
	}

	//obtener elementos esde un array en json y mostrarlos
	handleError(err){
		const jsonErrors = JSON.parse(err.response);
		const errors = jsonErrors.errors;
		let errorsResponse = [];
		for(let key in errors){
			errorsResponse.push(<li key={key}>{errors[key]}</li>)
		}
		this.setState({
			error: errorsResponse
		})
	}

	render(){
		return (
			<MuiThemeProvider>
				<Formsy.Form onValid={()=> this.enableSubmitBtn() } 
					onInvalid={()=> this.disableSubmitBtn()}
					onValidSubmit={()=> this.submit()}>
					<ul>{this.state.error}</ul>
					<div>
						<FormsyText
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineFocusStyle}
							onChange={(e)=> this.syncField(e,"email")}
							name="email"
							required
							validations="isEmail"
							validationError="Asegúrate de intriducir un correo valido"
							floatingLabelText="Correo Electrónico"
						/>
					</div>
					<div>
						<FormsyText
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineFocusStyle}
							onChange={(e)=> this.syncField(e, "password")}
							name="password"
							required
							type="password"
							floatingLabelText="Contraseña"
						/>
					</div>
					<div>
						<FormsyText
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineFocusStyle}
							onChange={(e)=> this.syncField(e, "passwordConfirmation")}
							name="passwordConfirmation"
							required
							type="password"
							floatingLabelText="Confirmar Contraseña"
						/>
					</div>
					<div>
						<RaisedButton
							style={styles.buttonTop}
							backgroundColor = {styles.red}
							labelColor = '#ffffff'
							disabled={!this.state.canSubmit}
							type="submit"
							label="Crear Cuenta"
						/>
						<a href="#" onClick={this.props.toggle} style={styles.leftSpace}>Ya tengo cuenta</a>
					</div>
				</Formsy.Form>
			</MuiThemeProvider>
		)
	}
}
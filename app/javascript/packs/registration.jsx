import React from 'react';
import WebpackerReact from 'webpacker-react';
import { Login } from '../components/registration/login';
import { SignUp } from '../components/registration/signup';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showLogin: true
		}
		this.toggle = this.toggle.bind(this);
	}
	toggle(e){
		e.preventDefault();
		this.setState({
			showLogin: !this.state.showLogin
		})
		//para que this siempre sea parte del componente y no de error
	}
	//operador ternario si es verdadero muestra login si no lo q sea ! es  negativo
	render(){
		return (
			<div>
				{ this.state.showLogin ? 
					<Login toggle={this.toggle}/> : 
					<SignUp toggle={this.toggle}/>
				}
			</div>
		)
	}
}

//actualizar componentes react en visto con react dom
//la primer linea add event listener es eldisparador para ejecutar el dom
/* todo esto se sustituye por lo siugiente gracias al elemento webpackerreact
document.addEventListener("DOMContentLoaded", e =>{	
	ReactDOM.render(<Registration/>, document.getElementById('react-container'));
})
*/
WebpackerReact.setup({Registration})
/*tras registrarlos aqui ya podemos integrarlos en la vista con el codigo <%=react_component('nombre')%>*/
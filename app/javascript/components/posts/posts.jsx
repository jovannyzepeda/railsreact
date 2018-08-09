import React from 'react';
import {Post} from './post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Posts extends React.Component{

	//se integra este modulo por el tiempo real para poder modificar los props
	constructor(props){
		super(props);
		
		this.state = {
			posts: []
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			posts: nextProps.posts
		})	
	}
	//cambio de props para timepo real
	publications(){
		if(this.state.posts){
			//creacion de nuevo arreglo
			return this.state.posts.map(post =>{
				return <Post key={post.id} post={post}></Post>
			});
		}

		return ""
	}


	//subscribirse dentro de action cable para tiempo real con react

	componentDidMount(){
		this.subscribe();
	}

	subscribe(){
		App.post = App.cable.subscriptions.create("PostChannel",{
			connected: () =>{
				console.log("conectado");
			},
  			disconnected: () =>{
  			},
  			received: (data) =>{
  				let post = JSON.parse(data.data);
  				this.setState({
  					posts: [post].concat(this.state.posts)
  				})
  			}
		});
	}

	render(){
		return(
			<MuiThemeProvider>
				<div>
					{this.publications()}
				</div>
			</MuiThemeProvider>
		)
	}
}
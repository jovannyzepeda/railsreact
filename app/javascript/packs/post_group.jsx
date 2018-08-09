import React from 'react';
import WebpackerReact from 'webpacker-react';

import {Posts} from '../components/posts/posts';
import reqwest from 'reqwest';
import { PostForm } from '../components/posts/post_form'

//las siguientes dos lineas evitar el error de tap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export class PostGroup extends React.Component{
	constructor(props){
		super(props);

		this.add = this.add.bind(this);

		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		this.get_posts();
	}
	//agregar post despues de publicarlo ligado a post forms donde se llama despues del
	//reqwest con this.props.add(data)
	add(post){
		this.setState({
			posts: [post].concat(this.state.posts)
		})
	}

	get_posts(){
		reqwest({
			url: '/posts.json',
			method: 'GET'
		}).then(posts => {
			this.setState({
				posts: posts
			})
		})
	}

	render(){
		return(
			<div>
				<PostForm add={this.add}></PostForm>
				<Posts posts={this.state.posts}></Posts>
			</div>
		)
	}
}

WebpackerReact.setup({PostGroup});
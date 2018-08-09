import React from 'react';

const styles = {
	image: {
		height: '80px',
		float: 'left'
	},
	progressBar: {
		height: "10px",
		backgroundColor: "#222",
		position: 'relative'
	}
}
export class Uploader extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			progress: 0,
			id: 0,
			imageURL: ""
		}
	}

	componentDidMount(){
		this.getImageUrl()
		this.upload()
	}
	//crea una url temporal para mostrar
	getImageUrl(){
		let imageURL = URL.createObjectURL(this.props.image);
		this.setState({
			imageURL: imageURL
		})
	}
	//carga de archivos por ajax
	upload(){
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/images.json');

		xhr.onload = (ev) =>{
			if(ev.lengthComputable){
				let progress = (ev.loaded / ev.total) * 100;
				this.setState({
					progress: progress
				});
			}
		}
		xhr.onreadystatechange = (ev) => {
			if(xhr.readyState == 4){
				this.setState({
					progress: 100
				})
				let response = JSON.parse(xhr.response);
				this.props.notify(response.id)
			}
		}

		xhr.setRequestHeader('X-CSRF-Token', window.MiProyecto.token);

		xhr.send(this.formData());

	}
	//asignar la info de la imagen en un form data para mandarlo
	formData(){
		let formData = new FormData();

		formData.append('image[image_file]', this.props.image);

		return formData;
	}

	
	//mostrar imagen thumbanil
	image(){
		if(this.state.imageURL){
			return <img src={this.state.imageURL} style={styles.image} />
		}else{
			return ""
		}
	}


	render(){
		return(
			<div>
				<div>{this.image()}</div>
				<div style={styles.progressBar}>
					<div style={{position: 'absolute',
						height:"100%",
						width: (this.state.progress)+"%",
						backgroundColor:"#2962ff",
						color: "white"}}>	
					</div>
				</div>
			</div>
		)
	}
}
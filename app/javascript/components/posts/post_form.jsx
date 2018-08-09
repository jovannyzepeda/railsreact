import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import reqwest from 'reqwest';
import {redA400,blueA400, pink500} from 'material-ui/styles/colors';
import {markdown} from 'markdown';
import FlatButton from 'material-ui/FlatButton';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import {Uploader} from '../images/uploader';


const styles = {
	buttonStyle:{
		marginTop: '0.5em',
		marginBottom: '1.8em'
	},
	displayNoneStyle: {
		display: 'none'
	}
}

export class PostForm extends React.Component{

	constructor(props){
		super(props);

		this.openFilePicker = this.openFilePicker.bind(this);

		this.storeImageID = this.storeImageID.bind(this);

		this.state = {
			markdown_content: '',
			html_content: '',
			images: [],
			image_ids: [],
			error: ''
		}
	}

	submit(){
		this.setState({
			error: ''
		})
		reqwest({
			url: '/posts.json',
			method: 'POST',
			data: {
				post: {
					markdown_content: this.state.markdown_content,
					html_content: markdown.toHTML(this.state.markdown_content),
					image_ids: this.state.image_ids
				}
			},
			headers: {
				'X-CSRF-Token': window.MiProyecto.token
			}
		}).then(data =>{
			this.props.add(data);
			this.refs.markdown_content.resetValue();
			this.setState({
				images: [],
				image_ids: []
			})
		}).catch(err => this.handleError(err));
	}

	/*de esta manera s asginan los valores al controlador react*/
	syncField(ev, fieldName){
		let element = ev.target;
		let value = element.value;
		let jsonState = {};
		jsonState[fieldName] = value;
		this.setState(jsonState);

	}
	//obtener errores de arreglo
	handleError(err){
		const jsonErrors = JSON.parse(err.response);
		let errorsResponse = [];
		for(let key in jsonErrors){
			let children = jsonErrors[key];
			for(let value in children){
				errorsResponse.push(<li key={key + value}>{key} - {children[value]}</li>)
			}
		}
		this.setState({
			error: errorsResponse
		})
	}

	//subir archivos

	openFilePicker(){
		this.refs.picker.click();
	}

	///recorrer los elementos q tiene el input y guardarlos en la imagen 

	handleChangeFiles(ev){
		let files = ev.target.files;
		for (var i = 0; i < files.length; i++){
			let file = files[i];
			this.setState({
				images: this.state.images.concat([file])
			})
		}
	}
	///almacenar id de imagen despues de guardar
	storeImageID(id){
		this.setState({
			image_ids: this.state.image_ids.concat([id])
		})
	}
	//muestra la imagen importando el archivo uploader
	images(){
		if(this.state.images.length > 0){
			return this.state.images.map(image => {
				return <Uploader image={image} key={image.name} notify={this.storeImageID}></Uploader>
			})
		}else{
			return "";
		}
	}
	render(){
		return(
			<MuiThemeProvider>
				<Formsy.Form onValidSubmit={() => this.submit()}>
					<ul>{this.state.error}</ul>

					<input
						multiple="true"
						ref="picker"
						onChange={(e) => this.handleChangeFiles(e)}
						style={styles.displayNoneStyle}
						type="file"
					/>

					<FormsyText
						name="post[markdown_content]"
						multiLine={true}
						required
						onChange={(e) => this.syncField(e, 'markdown_content')}
						floatingLabelText="Cuentanos que esta pasando..."
						ref="markdown_content"
						fullWidth={true}>
					</FormsyText>
					<div className="row">
						{this.images()}
					</div>
					<div className="text-right">
						<FlatButton
							onClick={this.openFilePicker}
							icon={ <ImageAddAPhoto/>}
						/>
						<RaisedButton 
							type="submit"
							label="Publicar Estado"
							backgroundColor={pink500}
							labelColor='#ffffff'
							style={styles.buttonStyle}
							>	
						</RaisedButton>
					</div>
				</Formsy.Form>
			</MuiThemeProvider>

		)
	}

}
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const styles = {
	images : {
		maxWidth: '100%'
	},
	container: {
		overflow: "hidden"
	},
	infiniteWidth: {
		whiteSpace: 'nowrap',
		position: 'relative',
		transition: "all 0.4s",
		left: "0"
	},
	controls: {
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	rightButton: {
		position: "absolute",
		top: "47%",
		right: "-1.8em"
	},
	leftButton: {
		position: "absolute",
		top: "47%",
		left: "-1.8em"
	}
}

export class Carousel extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			images: []
		}
	}
	images(){
		return this.props.images.map(image =>{
			return <img src={image.urls.original} style={styles.images} key={image.id}/>
		})
	}
	//obtiene el lugar actual de la imagen 
	getLeftValue(){
		let styles = window.getComputedStyle(this.refs.carousel, null);
		return parseInt(styles.getPropertyValue("left"));
	}
	//mueve carousel a la izquerda
	goLeft(){
		let currentPosition = this.getLeftValue();
		let newPosition = currentPosition + 300;
		if(newPosition > 0) newPosition = 0;
		this.refs.carousel.style.left = newPosition+"px";
	}
	//obtinee el tamaño total de carousel
	getContainerWidth(){
		let styles = window.getComputedStyle(this.refs.carousel.firstChild, null);
		let imgWidth =  parseInt(styles.getPropertyValue("width"));
		return imgWidth * (this.props.images.length - 1);
	}
	//mueve carousel a la derecha
	goRight(){
		let currentPosition = this.getLeftValue();
		let newPosition = currentPosition - 300;
		if((newPosition * -1) > this.getContainerWidth()) newPosition = -this.getContainerWidth();
		this.refs.carousel.style.left = newPosition+"px";
	}


	controls(){
		if(this.props.images.length <= 1) return "";
		return(
			<div style={styles.controls}>
				<FloatingActionButton onClick={(e) => this.goLeft()} style={styles.leftButton} secondary={true}>
					<KeyboardArrowLeft/>
				</FloatingActionButton>
				<FloatingActionButton onClick={(e) => this.goRight()}  style={styles.rightButton} secondary={true}>
					<KeyboardArrowRight/>
				</FloatingActionButton>
			</div>
		)
	}


	render(){
		return(
			<div style={{position: 'relative'}}>
				{this.controls()}
				<div style={styles.container}>
					<div style={styles.infiniteWidth} ref="carousel">
						{this.images()}
					</div>
				</div>
			</div>
		);
	}

}
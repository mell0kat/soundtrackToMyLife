'use strict';
// Routing: choose what to render based on the string stored in window.location.hash.
// Handle the initial route
// navigated()

// console.log(window.location)
// // Handle browser navigation events
// window.addEventListener('hashchange', navigated, false);

// function navigated(component) {
// 		ReactDOM.render(
//  		React.createElement(PageView, 
// 			Object.assign({}, state, {
// 					onPageChange: function(page){
// 						console.log('on page change being called', page)
// 						setState({newPage:page})
// 					},
// 					onNewPageSubmit: submitNewPage
// 				})),
// 	document.getElementById('react-app')
// 	)
// }




//create element like this createElement(string/ReactClass type, [object props], [children ...]) -> ReactElement
// can pass in custom classes as first arg to create element

var PageItem = React.createClass({
	//props can take a callback function
	propTypes: {
		name: React.PropTypes.string,
		lyrics: React.PropTypes.string,
		email: React.PropTypes.string,
		imageUrl: React.PropTypes.string,
		trackID: React.PropTypes.string

	},
	render: function() {
		return (
			React.createElement('div', {className:'PageItem'},
				React.createElement('h2', {className: 'PageItem-name'}, this.props.name),
				React.createElement('div', {style: {backgroundImage: 'url(' + this.props.imageUrl +')', backgroundSize:'100%', backgroundRepeat: 'no-repeat', height: '80%', width:'90%', margin:'0 auto'}}),
					React.createElement('p', {className:'PageItem-lyrics'}, this.props.lyrics),
					React.createElement('a', {href: this.props.email}, this.props.email),
					React.createElement('iframe', {src: 'https://embed.spotify.com/?uri=spotify:track:' + this.props.trackId, style: {frameborder:"0", align:"right", width: "90%", height: "80px"}})
					)
				) 
		// <iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A69NO5gH4OviBD9TFgpFjHP" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
	}
});



var PageForm = React.createClass({
	propTypes: {
		value: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},
	// To avoid this, define your handlers as component instance methods by passing them to
	 // React.createClass. React auto-binds instance methods, ensuring that this always refers 
	 // to your component instance. 

	onNameInput: function(e) {
		this.props.onChange(Object.assign({}, this.props.value, {name:e.target.value}))
	},
	onEmailInput: function(e) {
		this.props.onChange(Object.assign({}, this.props.value, {email:e.target.value}))
	},
	onImageUrlInput: function(e) {
		this.props.onChange(Object.assign({}, this.props.value, {imageUrl:e.target.value}))
	},
	onLyricsInput: function(e) {
		this.props.onChange(Object.assign({}, this.props.value, {lyrics:e.target.value}))
	},
	onSubmit: function(e) {
		console.log('submitting in page form')
		e.preventDefault();
		this.props.onSubmit();
	},
	render: function() {
		var errors = this.props.value.errors || {};
		return (
			React.createElement('form',{className:'PageForm', 
				onSubmit:this.onSubmit,
				noValidate:true
			},
				React.createElement('input', {defaultValue:this.props.value.name, 
					type: 'text',
					placeholder:'Name Here',
					onChange: this.onNameInput
				}),
				React.createElement('input', {defaultValue:this.props.value.email, 
					type: 'text',
					placeholder:'email here',
					onChange: this.onEmailInput,
					className: errors.name && 'PageForm-error'
				}),
				React.createElement('input', {defaultValue:this.props.value.imageUrl, 
					type: 'text',
					placeholder:'photoUrl here',
					onChange: this.onImageUrlInput
				}),
				React.createElement('textarea', {defaultValue: this.props.value.lyrics, 
					placeholder:'Lyrics here',
					onChange: this.onLyricsInput
					}),
				React.createElement('button', {type:"submit"}, 'Add a page')
				)
			)
		}
	})


// var pageElement = React.createElement(PageItem, {name: 'Brother Ali'})
var PageView = React.createClass({
	propTypes: {
		pages: React.PropTypes.array.isRequired,
		newPage: React.PropTypes.object,
		onPageChange: React.PropTypes.func.isRequired,
		onNewPageSubmit: React.PropTypes.func.isRequired
	},
	addPage: function(page){
		this.props.pages.push(page);
		this.props.newPage = {};
	},
	render: function(){
		var onPageChange = this.props.onPageChange;
		console.log(this)
		var pageElements = this.props.pages
		.filter(function(page){ return page.email})
		.map(function(page){return React.createElement(PageItem, page) })
		return (
			React.createElement('div', {className:'PageView'},
				React.createElement('div', {className:'PageView-list'}, pageElements, React.createElement(PageItem, {name: 'Soundtrack to my life'})),
				React.createElement(PageForm, {value:this.props.newPage,
					onChange: this.props.onPageChange, 
					onSubmit: this.props.onNewPageSubmit}
				)
			)
			)
		}
	})


var pages = [
{key:1, name: 'Brother Ali', lyrics:'Sexy ass me', email:'forestwhitaker@gmail.com', imageUrl: 'http://i.imgur.com/AAxn9VT.png', trackId: '1WPQ1MfGc8KYi4eu0JwjlR' },
{key:2, name: 'Killers', lyrics:'Not a solider', email:'livvahs@gmail.com', imageUrl: 'http://i.imgur.com/ElZWmZM.png', trackId: '0kYUrLVQOfx21xuXu7OGrT'},
{key:3, name: 'R. Hoof', lyrics:'Under these wild', email:'guitarboy@hotmail.com', imageUrl:'http://i.imgur.com/wOb43ST.png', trackId:'69NO5gH4OviBD9TFgpFjHP'}
];

// var pageItems = pages.map(function(page){
// 	return React.createElement(PageItem, page)
// })

var state = {};
function submitNewPage() {

	state.newPage.key = state.pages.length + 1;
	state.newPage.errors = {};

	if (!/.+@.+\..+/.test(state.newPage.email)) {
	  state.newPage.errors.email = ["Please enter your new contact's email"]
	}
	Object.assign(state, state.newPage)

	state.pages.push(state.newPage)
	setState({newPage: state.newPage})
}
function setState(changes) {
 	Object.assign(state, changes);
 	ReactDOM.render(
 		React.createElement(PageView, 
			Object.assign({}, state, {
					onPageChange: function(page){
						console.log('on page change being called', page)
						setState({newPage:page})
					},
					onNewPageSubmit: submitNewPage
				})),
	document.getElementById('react-app')
	)
 }



setState({pages: pages, newPage: {name:"", email: "", lyrics: "", errors:null}})
// When your data has changed, you just call render again.
// React only creates a new HTML tree for what has changed
'use strict';


//create element like this createElement(string/ReactClass type, [object props], [children ...]) -> ReactElement
// can pass in custom classes as first arg to create element

var PageItem = React.createClass({
	//props can take a callback function
	propTypes: {
		name: React.PropTypes.string,
		imageUrl: React.PropTypes.string,
		trackID: React.PropTypes.string

	},
	moveLeft: function(){
		if (pageNumber === 0){
			pageNumber  = pages.length-1;
			setState({ pages: [pages[pageNumber]]});
		}else{
			setState({pages: [pages[--pageNumber]]});
		}	
	},
	moveRight: function(){
		console.log("trying to move right")
		if (pageNumber === pages.length-1){
			pageNumber  = 0;
			setState({pages: [pages[pageNumber]]})
		}else{
			setState({pages: [pages[++pageNumber]]})
		}
	},

	render: function() {
		return (
			React.createElement('div', {className:'container PageItem'},
				React.createElement('div', {className:'row PageItemRow'},
					React.createElement('div', {className:'col-xs-6'},
						React.createElement('p', {className: 'description'}, "These pages were taken from my music 'diary', where I write lyrics that strike me."),
						React.createElement('img', {className:'leftPage', src: this.props.imageUrl, style: { width:'90%', margin:'2% auto'}}),
						React.createElement('span', {className: 'arrow leftArrow', onClick: this.moveLeft}, '<')
					),
					React.createElement('div', {className:'col-xs-6 rightPageCol'},
						React.createElement('p', {className: 'description'}, "These photos are either of me or taken by me."),
						React.createElement('img', {className:'rightPage', src: this.props.myImageUrl, style: { width:'90%', margin:'2% auto', marginTop: '6%'}}),
						React.createElement('span', {className: 'arrow', onClick: this.moveRight}, '>')
					)
				),
				React.createElement('div', {className:'row'},
						React.createElement('iframe', {src: 'https://embed.spotify.com/?uri=spotify:track:' + this.props.trackId, style: {frameborder:"0", align:"right", width: "90%", height: "80px"}})
					) 
			)
		)
	}
});



// var PageForm = React.createClass({
// 	propTypes: {
// 		value: React.PropTypes.object.isRequired,
// 		onChange: React.PropTypes.func.isRequired,
// 		onSubmit: React.PropTypes.func.isRequired
// 	},
// 	// To avoid this, define your handlers as component instance methods by passing them to
// 	 // React.createClass. React auto-binds instance methods, ensuring that this always refers 
// 	 // to your component instance. 

// 	onNameInput: function(e) {
// 		this.props.onChange(Object.assign({}, this.props.value, {name:e.target.value}))
// 	},
// 	onImageUrlInput: function(e) {
// 		this.props.onChange(Object.assign({}, this.props.value, {imageUrl:e.target.value}))
// 	},
// 	onSubmit: function(e) {
// 		console.log('submitting in page form')
// 		e.preventDefault();
// 		this.props.onSubmit();
// 	},
// 	render: function() {
// 		var errors = this.props.value.errors || {};
// 		return (
// 			React.createElement('form',{className:'PageForm', 
// 				onSubmit:this.onSubmit,
// 				noValidate:true
// 			},
// 				React.createElement('input', {defaultValue:this.props.value.name, 
// 					type: 'text',
// 					placeholder:'Name Here',
// 					onChange: this.onNameInput
// 				}),
// 				React.createElement('input', {defaultValue:this.props.value.imageUrl, 
// 					type: 'text',
// 					placeholder:'photoUrl here',
// 					onChange: this.onImageUrlInput
// 				}),
// 				React.createElement('button', {type:"submit"}, 'Add a page')
// 				)
// 			)
// 		}
// 	})


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
		.map(function(page){return React.createElement(PageItem, page) });
		console.log('pageElements:', pageElements)
		return (
			React.createElement('div', {className: 'wholePage'},
				React.createElement('h1', {}, 'Soundtrack To My Life'),
				React.createElement('div', {className:'PageView-list'}, pageElements)
			)
				// React.createElement(PageForm, {value:this.props.newPage,
				// 	onChange: this.props.onPageChange, 
				// 	onSubmit: this.props.onNewPageSubmit}
				// )
		);
	}
})


var pages = [
{key:1, name: 'Brother Ali', imageUrl: 'http://i.imgur.com/AAxn9VT.png', myImageUrl:'https://i.imgur.com/xCqe0xD.jpg', trackId: '1WPQ1MfGc8KYi4eu0JwjlR' },
{key:2, name: 'Killers', imageUrl: 'http://i.imgur.com/ElZWmZM.png', myImageUrl:'https://i.imgur.com/O5df4E2.jpg', trackId: '0kYUrLVQOfx21xuXu7OGrT'},
{key:3, name: 'Ryan Vanderhoof', imageUrl:'http://i.imgur.com/wOb43ST.png', myImageUrl:'https://i.imgur.com/ZJqH2MT.jpg', trackId:'69NO5gH4OviBD9TFgpFjHP'},
{key:4, name: 'Bleachers', imageUrl:'https://i.imgur.com/CGGRZoT.jpg', myImageUrl:'https://i.imgur.com/egFTbth.jpg', trackId:'1RwwmiVtLAtPmxAqKVfwgG'}, 
{key:5, name: 'Bon Iver', imageUrl:'https://i.imgur.com/WzJLWLl.jpg', myImageUrl:'https://i.imgur.com/OxlFieM.jpg', trackId:'4fbvXwMTXPWaFyaMWUm9CR'}, 
{key:6, name: 'Hozier', imageUrl:'https://i.imgur.com/kzYnBY9.jpg', myImageUrl:'https://i.imgur.com/lGSzoo2.jpg', trackId:'0efT4YKQLQx2YHbp6vgRX8'}, 
{key:7, name: 'Billy Joel', imageUrl:'https://i.imgur.com/xvxKaXq.jpg', myImageUrl:'https://i.imgur.com/vPGOQV2.jpg', trackId:'4U45aEWtQhrm8A5mxPaFZ7'}, 
{key:8, name: 'Billy Joel', imageUrl:'https://i.imgur.com/Z0mdgBa.jpg', myImageUrl:'https://i.imgur.com/70b2Cnj.jpg',trackId:'5DH7nDryMhpixm4G4B7RP9'}
];

// var pageItems = pages.map(function(page){
// 	return React.createElement(PageItem, page)
// })

var state = {};
var pageNumber = 0;
function submitNewPage() {

	state.newPage.key = state.pages.length + 1;
	state.newPage.errors = {};

	Object.assign(state, state.newPage);
	state.pages.push(state.newPage);
	setState({newPage: state.newPage});
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



setState({pages: [pages[3]], newPage: {name:"", errors:null}})
// When your data has changed, you just call render again.
// React only creates a new HTML tree for what has changed
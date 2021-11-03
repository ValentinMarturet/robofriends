import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';
import ErrorBoundry from '../Components/ErrorBoundry';

import { setSearchField } from '../actions.js'

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

function App(props) {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }
	const [robots, setRobots] = useState([]);
	// const [searchfield, setSearchfield] = useState('');

	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 	.then(response => response.json())
	// 	.then(users => this.setState({ robots: users }));
	// }
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => setRobots(users));
	}, [])
// onSearchChange es un evento que cambia el valor del state y lo actualiza
	// const onSearchChange = (event) => {
	// 	setSearchfield(event.target.value)
	// }
	
	const { searchField, onSearchChange } = props;

	const filteredRobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	})
	return !robots.length ?
		<h1 className='tc'>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
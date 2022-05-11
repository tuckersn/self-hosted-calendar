import React from 'react';
import './App.scss';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet
  } from "react-router-dom";

function App() {
	return (
		<div>
			app stuff here
			<Link to={'/me'}>test</Link>
			<Outlet></Outlet>
		</div>
	);
}

export default App;

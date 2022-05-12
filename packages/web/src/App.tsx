import React from 'react';
import './App.scss';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet
  } from "react-router-dom";
import styled from 'styled-components';


const Frame = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const TitleBar = styled.div`
	flex: 0 0 32px;
	border-bottom: 2px solid red;
`;

const Content = styled.div`
	flex: 1;
`;


function App() {
	return (
		<Frame>
			<TitleBar>
				app stuff here
				<Link to={'/me'}>test</Link>
				<Link to={'/login'}>Sign In</Link>
			</TitleBar>
			<Content>
				<Outlet></Outlet>
			</Content>
		</Frame>
	);
}

export default App;

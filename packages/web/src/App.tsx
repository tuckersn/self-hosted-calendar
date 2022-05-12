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
`;

const SideBar = styled.div`
	flex: 0 0 200px;
	border-right: 2px solid rga(0,0,0,0.1);
`;

const Content = styled.div`
	flex: 1;
`;


function App() {
	return (
		<Frame>
			<SideBar>
				app stuff here
				<Link to={'/me'}>test</Link>
			</SideBar>
			<Content>
				<Outlet></Outlet>
			</Content>
		</Frame>
	);
}

export default App;

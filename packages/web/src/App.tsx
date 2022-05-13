import React from 'react';
import './App.scss';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet,
	useNavigate,
	useLocation
  } from "react-router-dom";
import styled from 'styled-components';

const TITLE_BAR_HEIGHT = '32px';

const Frame = styled.div`
	height: 100vh;
	width: 100vw;
	
	display: flex;
	overflow: hidden;
	flex-direction: column;
`;

const TitleBar = styled.div`
	display: flex;

	flex: 0 0 ${TITLE_BAR_HEIGHT};
	width: 100%;
	align-items: center;

	border-bottom: 2px solid red;
	background-color: rgba(255,255,255,0.15);
`;

const TitleBarLeft = (styled.div`
	flex: 1;
	display: flex;

	text-align: left;
`);

const TitleBarCenter = (styled.div`

`);

const TitleBarRight = (styled.div`
	flex: 1;
	display: flex;

	align-items: center;
	text-align: right;
`);

const TitleBarMenuButton = (styled.div`
	display: flex;
	
	height: ${TITLE_BAR_HEIGHT};
	width: ${TITLE_BAR_HEIGHT};
	
	border: 1px solid white;
	font-size: 11px;

	align-items: center;
`);

const TitleBarLogoButtonContainer = (styled.div`
	font-size: 28px;
	vertical-align: center;
	text-align: center;
	align-self: center;
`);

const TitleBarUserIconContainer = (styled.div`
	border: 1px solid cyan;
	background-color: white;
	height: ${TITLE_BAR_HEIGHT};
	width: ${TITLE_BAR_HEIGHT};
`);

const Content = styled.div`
	flex: 1;
`;


function App() {

	let navigate = useNavigate();
	let location = useLocation();

	return (
		<Frame>
			<TitleBar>
				<TitleBarLeft>
					<TitleBarMenuButton>
						Menu
					</TitleBarMenuButton>
					<TitleBarLogoButtonContainer onClick={() => {
						navigate("/");
					}}>
						Home
					</TitleBarLogoButtonContainer>
				</TitleBarLeft>
				<TitleBarCenter>
					<Link to={'/me'}>test</Link>
				</TitleBarCenter>			
				<TitleBarRight>
					<Link style={{flex: 1}} to={'/login'}>Sign In</Link>
					<TitleBarUserIconContainer>
						<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" height={"32px"} width={"32px"} alt="user icon"/>
					</TitleBarUserIconContainer>
				</TitleBarRight>
			</TitleBar>
			<Content>
				<Outlet></Outlet>
			</Content>
		</Frame>
	);
}

export default App;

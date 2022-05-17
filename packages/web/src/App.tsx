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
import { useUser } from './shared/hooks/useUser';
import { setUser } from './common/store/userSlice';
import { Button } from './components/inputs/Button';
import { Toggle } from './components/inputs/Toggle';

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
	flex: 1;
	display: flex;
`);

const TitleBarRight = (styled.div`
	flex: 1;
	display: flex;

	align-items: center;
	justify-content: flex-end;
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

	const navigate = useNavigate();
	const [user, setUser] = useUser();

	return (
		<Frame>
			<TitleBar>
				<TitleBarLeft>
					<Toggle style={{
						border: 0
					}} falseComponent={
						<TitleBarMenuButton>
							Menu
						</TitleBarMenuButton>
					} trueComponent= {
						<React.Fragment>
							<TitleBarMenuButton style={{
								backgroundColor: "cyan"
							}}>
								Menu
							</TitleBarMenuButton>
							<div style={{
								position: "relative",
								width: 0,
								height: 0,
								top: "-1px"
							}}>
								<div style={{
									border: "1px solid white",
									width: "250px",
									height: "auto",
									backgroundColor: "rgba(0,0,0,0.80)",
									padding: "6px",
									paddingLeft: "12px",
									paddingRight: "12px"
								}}> 
									AAAAAAAAAAAAAAAAA
									<br/>
									AAAAAAAAAAAAAAAAA
									<br/>
									AAAAAAAAAAAAAAAAA
									<br/>
									AAAAAAAAAAAAAAAAA
									<br/>
									AAAAAAAAAAAAAAAAA
									<br/>
								</div>
							</div>
						</React.Fragment>
					}/>
					<TitleBarLogoButtonContainer onClick={() => {
						navigate("/");
					}}>
						Home
					</TitleBarLogoButtonContainer>
				</TitleBarLeft>
				<TitleBarCenter>
					{
						user !== null ?
						<div contentEditable={true} style={{
								flex: "1",
								width: "auto",
								border: "1px solid cyan",
								textAlign: "center"
							}}>
								search/command bar here
						</div> : <div></div>
					}
				</TitleBarCenter>			
				<TitleBarRight>
				{
						user === null ?
						<React.Fragment>
							<Link style={{flex: 1, paddingRight: "8px"}} to={'/login'}>Log In / Sign Up</Link>
						</React.Fragment> :
						<React.Fragment>
							<Button style={{paddingRight: "8px"}} onClick={() => {
								localStorage.removeItem("jwt");
								setUser(null);
								navigate("/");
							}}>Logout</Button>
							<TitleBarUserIconContainer>
								<Link to={'/me'}>
									<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" height={"32px"} width={"32px"} alt="user icon"/>
								</Link>
							</TitleBarUserIconContainer>
						</React.Fragment>
					}
				</TitleBarRight>
			</TitleBar>
			<Content>
				<Outlet></Outlet>
			</Content>
		</Frame>
	);
}

export default App;

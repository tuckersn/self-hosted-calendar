import React, { useEffect } from 'react';
import './App.scss';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet,
	useNavigate,
	useLocation,
	Location
  } from "react-router-dom";
import styled from 'styled-components';
import { useUser } from './common/hooks/useUser';
import { setUser } from './common/store/userSlice';
import { Button } from './components/inputs/Button';
import { Toggle } from './components/inputs/Toggle';
import { CornerMenu } from './components/menus/CornerMenu';
import { DropDown } from './components/inputs/DropDown';
import { FloatingContainer } from './components/styled';
import { COLORS, NAV_BAR_HEIGHT } from './common/style';



const Frame = styled.div`
	height: 100vh;
	width: 100vw;
	
	display: flex;
	overflow: hidden;
	flex-direction: column;

	background-color: ${COLORS.background};
`;

const TitleBar = styled.div`
	display: flex;

	flex: 0 0 ${NAV_BAR_HEIGHT}px;
	width: 100%;
	align-items: center;
	overflow: none;

	box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
	border-bottom: 2px solid #000000;
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

const TitleBarMenuDiv = (styled.div<{ active?: boolean }>`
	display: flex;
	
	height: ${NAV_BAR_HEIGHT}px;
	width: ${NAV_BAR_HEIGHT}px;
	
	border: 1px solid white;
	font-size: 11px;

	align-items: center;

	background-color: ${(props) => props.active ? '#626262' : '#000000'};
	:hover {
		background-color: rgba(255,255,255,0.5);
	}
`);

const TitleBarLogoButtonContainer = (styled.div`
	font-size: 20px;
	vertical-align: center;
	text-align: center;
	align-self: center;
`);

const TitleBarUserIconContainer = (styled.div`
	border: 1px solid cyan;
	background-color: white;
	height: ${NAV_BAR_HEIGHT};
	width: ${NAV_BAR_HEIGHT};
`);

const Content = styled.div`
	flex: 1;
`;




function App() {

	const navigate = useNavigate();
	const [user, setUser] = useUser();
	const location = useLocation();

	useEffect(() => {
		console.log(`[NAVIGATED]: ${location.pathname}`);
	}, [location.pathname]);

	return (
		<Frame>
			<TitleBar>
				<TitleBarLeft>
					<DropDown style={{
						border: 0
					}} FalseComponent={({
						setValue
					}) => {
						return <TitleBarMenuDiv onClick={() => {
							setValue(true);
						}}>
							Menu
						</TitleBarMenuDiv>
					}} TrueComponent= {({
						value,
						setValue
					}) => {
						return <React.Fragment>
							<TitleBarMenuDiv active={true} onClick={() => {
								setValue(false);
							}}>
								Menu
							</TitleBarMenuDiv>
							<FloatingContainer y={NAV_BAR_HEIGHT+1}>
								<CornerMenu menuOpen={value!} setMenuOpen={setValue}/>
							</FloatingContainer>
						</React.Fragment>
					}}/>
					<TitleBarLogoButtonContainer onClick={() => {
						navigate("/");
					}}>
						YourCalendar
					</TitleBarLogoButtonContainer>
				</TitleBarLeft>
				<TitleBarCenter>
					{
						user !== null ?
						<div style={{
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
									<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" height={"20px"} width={"20px"} alt="user icon"/>
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

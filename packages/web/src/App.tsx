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
import { VscMenu } from "react-icons/vsc";
import { MdAdd, MdLogout, MdMenu, MdSearch } from "react-icons/md"

import { useUser } from './common/hooks/useUser';
import { setUser } from './common/store/userSlice';
import { Button } from './components/inputs/Button';
import { Toggle } from './components/inputs/Toggle';
import { CornerMenu } from './components/menus/CornerMenu';
import { DropDown } from './components/inputs/DropDown';
import { FloatingContainer } from './components/style';
import { COLORS, CSS_PRESETS, NAV_BAR_HEIGHT, STYLE_VALUES } from './common/style';
import { useTitle } from './common/hooks/useTitle';
import {Helmet} from "react-helmet";
import { NewMenu } from './components/menus/NewMenu';



const Frame = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: -999999999;

	display: flex;
	overflow: hidden;
	flex-direction: column;

	background-color: ${COLORS.background};
`;

const TitleBar = styled.div`
	display: flex;

	flex: 0 0 ${NAV_BAR_HEIGHT}px;
	max-height: ${NAV_BAR_HEIGHT}px;
	width: 100%;
	align-items: center;
	overflow: none;

	box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
	border-bottom: 2px solid #595959;
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

	padding-right: 4px;
`);

const TitleBarMenuDiv = (styled.div<{ active?: boolean }>`
	display: flex;
	
	height: ${NAV_BAR_HEIGHT - 2}px;
	width: ${NAV_BAR_HEIGHT - 2}px;
	
	border-right: 1px solid white;
	font-size: 11px;

	align-items: center;
	justify-content: center;

	background-color: ${(props) => props.active ? COLORS.backgroundExtremelyLight : COLORS.background};
	:hover {
		background-color: rgba(255,255,255,0.5);
	}
	svg {
		margin-left: -1px;
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


const TitleBarButtonIcon = (styled.div`
	font-size: 24px;
	height: 100%;
	vertical-align: center;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`);


const TitleBarSearchContainer = (styled.div`
	width: 100%;
	border-top: 2px solid white;
	border-bottom: 2px solid white;
	background-color: ${COLORS.backgroundDark};
	overflow: hidden;
	white-space: nowrap;
`);


const Content = styled.div`
	flex: 1;
	height: calc(100vh - ${NAV_BAR_HEIGHT}px);
`;




function App() {

	const navigate = useNavigate();
	const [user, setUser] = useUser();
	const location = useLocation();
	const [title, setTitle] = useTitle()

	const [newMenuOpen, setNewMenuOpen] = React.useState(false);

	useEffect(() => {
		console.log(`[NAVIGATED]: ${location.pathname}`);
	}, [location.pathname]);

	return (
		<Frame>
			<Helmet>
                <meta charSet="utf-8" />
                <title>{title === "" ? "Calendar" : "Calendar | " + title}</title>
            </Helmet>
			<TitleBar>
				<TitleBarLeft>
					<DropDown style={{
						border: 0
					}} FalseComponent={({
						setValue
					}) => {
						return <TitleBarMenuDiv active={false} onClick={() => {
							setValue(true);
						}}>
							<MdMenu size={20}/>
						</TitleBarMenuDiv>
					}} TrueComponent= {({
						value,
						setValue
					}) => {
						return <React.Fragment>
							<TitleBarMenuDiv active={true} onClick={() => {
								setValue(false);
							}}>
								<MdMenu size={20}/>
							</TitleBarMenuDiv>
							<FloatingContainer y={NAV_BAR_HEIGHT}>
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
								textAlign: "center",
								display: "flex",
								
							}}>
							<Button small style={{
								borderRadius: `${STYLE_VALUES.borderRadius}px 0px 0px ${newMenuOpen ? 0 : STYLE_VALUES.borderRadius}px`,
							}}>
								<Button onClick={() => {
									return setNewMenuOpen(!newMenuOpen);
								}} >
									<MdAdd size={18}/>
								</Button>
								
								<FloatingContainer offsetX={36} offsetY={21}>
									<NewMenu active={newMenuOpen} setActive={setNewMenuOpen}/>
								</FloatingContainer>
							</Button>
							<TitleBarSearchContainer>
								search/command bar here
							</TitleBarSearchContainer>
							<Button small style={{
								borderRadius: `0px ${STYLE_VALUES.borderRadius}px ${STYLE_VALUES.borderRadius}px 0px`,
							}}>
								<MdSearch size={18}/>
							</Button>
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
							<TitleBarButtonIcon onClick={() => {
								localStorage.removeItem("jwt");
								setUser(null);
								navigate("/");
							}}><MdLogout/></TitleBarButtonIcon>
							{/* <TitleBarUserIconContainer>
								<Link to={'/me'}>
									<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" height={"20px"} width={"20px"} alt="user icon"/>
								</Link>
							</TitleBarUserIconContainer> */}
							<TitleBarButtonIcon style={{
								backgroundColor: "white"
							}} onClick={() => {
								navigate("/me");
							}}>
								<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" height={"20px"} width={"20px"} alt="user icon"/>
							</TitleBarButtonIcon>
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

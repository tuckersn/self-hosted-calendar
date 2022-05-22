import React, { useEffect, useState } from "react";
import { Link, useHref, useLocation } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import { useDebugMode } from "../../common/hooks";
import { useIsAdmin } from "../../common/hooks/useIsAdmin";
import { useUser } from "../../common/hooks/useUser";
import { COLORS, CSS_PRESETS } from "../../common/style";
import { DropDown } from "../inputs/DropDown";
import { Toggle } from "../inputs/Toggle";

export interface CornerMenuProps {
	style?: CSSProperties;

	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

let listingPadding = 24;

const CornerMenuContainer = (styled.div`
	border-right: 2px solid white;
	border-bottom: 2px solid white;
	border-radius: 0px 0px 10px 0px;
	display: flex;
	flex-direction: column;
	width: 350px;
	height: auto;
	background-color: ${COLORS.backgroundSlightlyDark};
	${CSS_PRESETS.boxShadowBottomOnly}
`);

export type ListingProps = {
	selected?: boolean;
	expanded?: boolean;
}; 


const ListingNotLink = (styled.div<ListingProps>`
	font-size: 20px;
	padding: 2px;
	padding-left: ${listingPadding}px;
	padding-right: ${listingPadding}px;
	padding-bottom: 0px;
`);


const Listing = styled(ListingNotLink)`
	${ListingNotLink.tem}

	:hover {
		background-color: rgba(255,255,255,0.2);
	}
`;



const ListingDropDownNotLink = (styled.div<ListingProps>`
	font-size: 20px;
	padding: 2px;
	padding-left: 0px;
	padding-right: ${listingPadding}px;
	padding-bottom: 0px;
`);


const ListingDropDown = styled(ListingDropDownNotLink)`
	:hover {
		background-color: rgba(255,255,255,0.2);
	}
`;




const ListingSpacer = (styled.div`
	height: 4px;
	border: 1px solid #ffffff8a;
	align-self: center;
	width: 100%;
`);

const ListingButton = (styled.button`
	background-color: transparent;
	border: 1px solid white;
	border-radius: 4px;
	color: white;
	font-weight: bold;
	height: ${listingPadding}px;
	width: ${listingPadding}px;
`);

const SubListing = (styled.div`
	font-size: 16px;
	padding: 0;
	padding-left: 36px;
	padding-right: 12px;}
	:hover {
		background-color: rgba(255,255,255,0.2);
	}
`);

export function CornerMenu({
	style,
	menuOpen,
	setMenuOpen
} : CornerMenuProps) { 

	const [user] = useUser();
	const isAdmin = useIsAdmin();
	const [debugMode] = useDebugMode();
	// const history = useHistory();
	const location = useLocation();
	
	useEffect(() => {
		console.log("CornerMenu.tsx: useEffect");
		return () => {
			setMenuOpen(!menuOpen);
		};
	}, [menuOpen, setMenuOpen]);

	return <CornerMenuContainer style={style}>
		<Link to={"/"}>
			<Listing>
				Home
			</Listing>
		</Link>
		<ListingSpacer/>
		<Link to={"/board"}>
			<Listing>
				Boards
			</Listing>
		</Link>
		<ListingSpacer/>
		<Link to={"/calendar"}>
			<Listing>
				Calendar
			</Listing>
		</Link>
		<ListingSpacer/>
		<Link to={"/todo"}>
			<Listing>
				Todos
			</Listing>
		</Link>
		{
			isAdmin ? <React.Fragment>
				<ListingSpacer/>
				<DropDown FalseComponent={({value, setValue}) => {
					return <Link to={"/admin"}>
						<ListingDropDown>
							<ListingButton onClick={(event) => {
								setValue(true);
								event.preventDefault();
							}}>
								{'>'}
							</ListingButton>
							Admin Panel
						</ListingDropDown>
					</Link>
				}} TrueComponent={({setValue}) => {
					return <React.Fragment>
						<Link to={"/admin"}>
							<ListingDropDown>
								<ListingButton onClick={(event) => {
									setValue(false);
									event.preventDefault();
								}}>
									V
								</ListingButton>
								Admin Panel
							</ListingDropDown>
						</Link>
						<SubListing>
							<Link to={"/admin/users"}>
								L Users
							</Link>
						</SubListing>
						<SubListing>
							<Link to={"/admin/database"}>
								L Database
							</Link>
						</SubListing>
					</React.Fragment>
				}}/>
				{/* <Link to={"/admin"}>
					<Listing>
						Pseudo Users
					</Listing>
				</Link> */}
			</React.Fragment> : ''
		}
		{
			debugMode ? <React.Fragment>
				<ListingSpacer/>
				<DropDown FalseComponent={({value, setValue}) => {
					return <ListingDropDownNotLink>
						<ListingButton onClick={(event) => {
							setValue(true);
							event.preventDefault();
						}}>
							{'>'}
						</ListingButton>
						Debug Pages
					</ListingDropDownNotLink>
				}} TrueComponent={({setValue}) => {
					return <React.Fragment>
						<ListingDropDownNotLink>
							<ListingButton onClick={(event) => {
								setValue(false);
								event.preventDefault();
							}}>
								V
							</ListingButton>
							Debug Pages
						</ListingDropDownNotLink>
						<SubListing>
							<Link to={"/debug/samples"}>
								L UI Samples
							</Link>
						</SubListing>
					</React.Fragment>
				}}/>
			</React.Fragment> : ''
		}
	</CornerMenuContainer>
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import { useIsAdmin, useUser } from "../../shared/hooks/useUser";
import { DropDown } from "../inputs/DropDown";
import { Toggle } from "../inputs/Toggle";

export interface CornerMenuProps {
	style?: CSSProperties;
}

const CornerMenuContainer = (styled.div`
	border-right: 2px solid white;
	border-bottom: 2px solid white;
	border-radius: 0px 0px 10px 0px;
	width: 350px;
	height: auto;
	background-color: rgba(0,0,0,1);

`);

const Listing = (styled.div`
	font-size: 20px;
	padding: 6px;
	padding-left: 12px;
	padding-right: 12px;}
	:hover {
		background-color: rgba(255,255,255,0.2);
	}
`);

const ListingButton = styled.button`
	background-color: transparent;
	border: 1px solid white;
	border-radius: 4px;
	color: white;
	font-weight: bold;
	height: 24px;
	width: 24px;
`;

const SubListing = (styled.div`
	font-size: 16px;
	padding: 6px;
	padding-left: 36px;
	padding-right: 12px;}
	:hover {
		background-color: rgba(255,255,255,0.2);
	}
`);

export function CornerMenu({
	style
} : CornerMenuProps) { 

	const [user] = useUser();
	const isAdmin = useIsAdmin();
	
	useEffect(() => {
		console.log("CornerMenu.tsx: useEffect");
	}, []);

	return <CornerMenuContainer style={style}>
		<Link to={"/"}>
			<Listing>
				Home
			</Listing>
		</Link>
		<Link to={"/board"}>
			<Listing>
				Boards
			</Listing>
		</Link>
		<Link to={"/calendar"}>
			<Listing>
				Calendar
			</Listing>
		</Link>
		<Link to={"/todo"}>
			<Listing>
				Todos
			</Listing>
		</Link>
		{
			isAdmin ? <div>
				<DropDown FalseComponent={({value, setValue}) => {
					return <Link to={"/admin"}>
						<Listing>
							<ListingButton onClick={(event) => {
								setValue(true);
								event.preventDefault();
							}}>
								{'>'}
							</ListingButton>
							Admin Panel
						</Listing>
					</Link>
				}} TrueComponent={({setValue}) => {
					return <React.Fragment>
						<Link to={"/admin"}>
							<Listing>
								<ListingButton onClick={(event) => {
									setValue(false);
									event.preventDefault();
								}}>
									V
								</ListingButton>
								Admin Panel
							</Listing>
						</Link>
						<SubListing>
							Users
						</SubListing>
						<SubListing>
							Database
						</SubListing>
					</React.Fragment>
				}}/>
				{/* <Link to={"/admin"}>
					<Listing>
						Pseudo Users
					</Listing>
				</Link> */}
			</div> : ''
		}
		<br/>
		<br/>
		<br/>
	</CornerMenuContainer>
}
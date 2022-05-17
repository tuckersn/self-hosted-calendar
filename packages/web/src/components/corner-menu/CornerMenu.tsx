import { Link } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import { useIsAdmin, useUser } from "../../shared/hooks/useUser";

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

export function CornerMenu({
	style
} : CornerMenuProps) { 

	const [user] = useUser();
	const isAdmin = useIsAdmin();
	

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
				<Link to={"/admin"}>
					<Listing>
						Admin Panel
					</Listing>
				</Link>
				{/* <Link to={"/admin"}>
					<Listing>
						Pseudo Users
					</Listing>
				</Link> */}
			</div> : ''
		}
	</CornerMenuContainer>
}
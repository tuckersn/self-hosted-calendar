import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import { COLORS } from "../../common/style";

export interface HeaderProps {
	children?: React.ReactNode;
	style?: CSSProperties;
	crumbs: {
		label: string;
		url: string;
	}[]
}

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0;
	margin: 0;
	padding: 0;
	height: min-content;
`;

const Crumb = styled.div`
	color: grey;
	:hover {
		color: ${COLORS.highLightBright};
	}
`;

const TitleCrumb = styled.div`
	color: white;
	:hover {
		color: ${COLORS.highLightBright};
	}
`;



export function Header({ children, style, crumbs: propsCrumbs } : HeaderProps) {

	const location = useLocation();
	const navigate = useNavigate();
	const [crumbs] = useState([
		{
			label: "Home",
			url: "/"
		},
		...propsCrumbs
	]);


	return <HeaderContainer style={style}>
		{
			crumbs.map((crumb, index) => {
				return <Crumb
					key={crumb.url + index}
					onClick={() => {
						navigate(crumb.url);
					}}>
					{crumb.label}/
				</Crumb>
			})
		}
		<TitleCrumb>
			{children}
		</TitleCrumb>
	</HeaderContainer>;
}
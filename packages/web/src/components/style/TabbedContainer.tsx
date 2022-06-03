import { useEffect, useMemo, useState } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { COLORS } from "../../common/style";

export interface TabbedContainerProps {
	/**
	 * Tab key mapped to a label
	 */
	tabs: {
		[tabKey: string]: {
			label: string;
			content: React.ReactNode;
		}
	};
	setSelectedTab?: (tabKey: string) => void;
	containerStyle?: FlattenSimpleInterpolation;
}



const OuterContainer = styled.div<TabbedContainerProps>`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border: 1px solid white;
	${props => props.containerStyle}
`;

const NavContainer = styled.div<TabbedContainerProps>`
	display: flex;
	flex-direction: row;
	width: 100%;
	flex: 0 0 32px;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid grey;
`;

const NavItem = styled.div<TabbedContainerProps & { active: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	
	flex: 1;
	height: 100%;

	font-size: 14px;
	text-align: center;
	background-color: ${COLORS.backgroundDark};

	${({ active }) => active && `
		background-color: ${COLORS.backgroundLight};
	`}

	border-left: 1px solid grey;
	:first-child {
		border-left: none;
	}
	:hover {
		color: ${COLORS.highLight};
		background-color: ${COLORS.backgroundSlightlyLight};
	}
`;

const ContentContainer = styled.div<TabbedContainerProps>`
	width: 100%;
	flex: 1;
`


export function TabbedContainer(props: TabbedContainerProps) {
	const { tabs } = props;
	const tabArray = useMemo(() => {
		return Object.keys(tabs);
	}, [tabs]);
	const [selectedTab, setSelectedTab] = useState(tabArray[0]);

	
	return <OuterContainer {...props}>
		<NavContainer {...props}>
			{
				tabArray.map((tabKey) => {
					return <NavItem key={tabKey} {...props} active={selectedTab === tabKey} onClick={() => {
						setSelectedTab(tabKey);
						if(props.setSelectedTab) {
							props.setSelectedTab(tabKey);
						}
					}}>
						{tabs[tabKey].label}
					</NavItem>;
				})
			}
		</NavContainer>
		<ContentContainer {...props}>
			{tabs[selectedTab].content}
		</ContentContainer>
	</OuterContainer>;
}
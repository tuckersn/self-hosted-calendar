import { MdAccountCircle, MdCalendarToday, MdDataExploration, MdHttp, MdIntegrationInstructions, MdSettings, MdTask } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DiDatabase } from "react-icons/di";
import { GiFishingHook } from "react-icons/gi";

import { COLORS } from "../../common/style";
import { Header, HeaderProps } from "../../components/layouts/Header";
import { SidebarLayout } from "../../components/layouts/SidebarLayout";

const TitleBar = styled.div`
	font-size: 28px;
	text-align: center;
	padding-top: 8px;
	padding-bottom: 8px;
	margin-bottom: 8px;
	border-bottom: 1px solid #575757;
	:hover {
		color: ${COLORS.highLightBright};
	}
`;

const SidebarItem = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	padding-top: 8px;
	padding-bottom: 3px;


	:hover {
		background-color: #575757;
		color: ${COLORS.highLightBright};
	}
`;

const SidebarItemIconContainer = styled.div`
	flex: 20%;
	text-align: right;
	justify-content: center;
	align-items: center;
`;

const SidebarItemTitle = styled.div`
	flex: 80%;

	margin-left: 4px;
	margin-top: 1px;

	text-align: left;
	font-size: 20px;

	justify-content: center;
	align-items: center;
`;

export const adminPageCrumbs: HeaderProps['crumbs'] = [{
	label: "Admin",
	url: "/admin"
}];

export function AdminPage() {

	const navigate = useNavigate();

	return <SidebarLayout sidebarContent={
		<div>

			<TitleBar onClick={() => {
				navigate("/admin");
			}}>
				Admin Panel
			</TitleBar>

			<SidebarItem onClick={() => {
				navigate("/admin/users");
			}}>
				<SidebarItemIconContainer>
					<MdAccountCircle size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Users
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/calendars");
			}}>
				<SidebarItemIconContainer>
					<MdCalendarToday size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Calendars
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/tasks");
			}}>
				<SidebarItemIconContainer>
					<MdTask size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Tasks
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/webhooks");
			}}>
				<SidebarItemIconContainer>
					<GiFishingHook size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Webhooks
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/databases");
			}}>
				<SidebarItemIconContainer>
					<DiDatabase size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Database
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/settings");
			}}>
				<SidebarItemIconContainer>
					<MdSettings size={30}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Settings
				</SidebarItemTitle>
			</SidebarItem>
		</div>
	}>
		<Outlet></Outlet>
	</SidebarLayout>;
}
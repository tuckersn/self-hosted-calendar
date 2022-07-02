import { MdAccountCircle, MdCalendarToday, MdDataExploration, MdEvent, MdHttp, MdIntegrationInstructions, MdSettings, MdTask, MdTaskAlt, MdViewModule } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DiDatabase } from "react-icons/di";
import { GiFishingHook } from "react-icons/gi";

import { COLORS } from "../../common/style";
import { Header, HeaderProps } from "../../components/layouts/Header";
import { SidebarLayout } from "../../components/layouts/SidebarLayout";
import { useIsAdmin } from "../../common/hooks";
import { useEffect } from "react";

const TitleBar = styled.div`
	font-size: 24px;
	text-align: center;
	padding-top: 8px;
	padding-bottom: 8px;
	margin-bottom: 8px;
	border-bottom: 1px solid #575757;
	:hover {
		color: ${COLORS.highLightBright};
	}
`;

const ICON_SIZE = 28;

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

	margin-left: 8px;
	margin-top: 3px;

	text-align: left;
	font-size: 16px;

	justify-content: center;
	align-items: center;
`;

export const adminPageCrumbs: HeaderProps['crumbs'] = [{
	label: "Admin",
	url: "/admin"
}];

export function AdminPage() {

	const navigate = useNavigate();
	const admin = useIsAdmin();

	useEffect(() => {
		if(!admin) {
			navigate("/");
		}
	}, [admin, navigate]);

	return <SidebarLayout sidebarContent={
		<div>

			<TitleBar onClick={() => {
				navigate("/admin");
			}}>
				Admin
				<br/>
				Panel
			</TitleBar>

			<SidebarItem onClick={() => {
				navigate("/admin/users");
			}}>
				<SidebarItemIconContainer>
					<MdAccountCircle size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Users
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/calendars");
			}}>
				<SidebarItemIconContainer>
					<MdCalendarToday size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Calendars
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/events");
			}}>
				<SidebarItemIconContainer>
					<MdEvent size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Events
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/task-boards");
			}}>
				<SidebarItemIconContainer>
					<MdViewModule size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Task Boards
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/tasks");
			}}>
				<SidebarItemIconContainer>
					<MdTaskAlt size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Tasks
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/webhooks");
			}}>
				<SidebarItemIconContainer>
					<GiFishingHook size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Webhooks
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/databases");
			}}>
				<SidebarItemIconContainer>
					<DiDatabase size={ICON_SIZE}/>
				</SidebarItemIconContainer>
				<SidebarItemTitle>
					Database
				</SidebarItemTitle>
			</SidebarItem>

			<SidebarItem onClick={() => {
				navigate("/admin/settings");
			}}>
				<SidebarItemIconContainer>
					<MdSettings size={ICON_SIZE}/>
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
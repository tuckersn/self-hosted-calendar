import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';



import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { AccountInfoPage } from './pages/account/AccountInfoPage';
import { BoardPage } from './pages/board/BoardPage';
import { ErrorPage } from './pages/ErrorPage';
import { LoginRegisterPage } from './pages/login/LoginRegisterPage';
import { Provider } from 'react-redux';
import { store } from './common/store/store';
import { AdminPage } from './pages/admin/AdminPage';
import { AdminDashboardPage } from './pages/admin/pages/dashboard/AdminDashboard';
import { UserAdminPage } from './pages/admin/pages/user/UserAdminPage';
import { DatabaseAdminPage } from './pages/admin/pages/database/DatabaseAdminPage';
import { nanoid } from '@reduxjs/toolkit';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { UISamplesPage } from './pages/debug/UISamplesPage';

import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material';
import { TaskAdminPage } from './pages/admin/pages/task/TaskAdminPage';
import { WebhookAdminPage } from './pages/admin/pages/webhooks/WebhooksAdminPage';
import { SettingsAdminPage } from './pages/admin/pages/settings/SettingsAdminpage';
import { CalendarAdminPage } from './pages/admin/pages/calendar/CalendarAdminPage';
import { TaskBoardAdminPage } from './pages/admin/pages/task-boards/TaskBoardAdminPage';
import { EventAdminPage } from './pages/admin/pages/event/EventAdminPage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { UserRoute } from './common/hooks';

export const themeOptions = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: '#aa6c33',
			dark: '#8da8c7',
		},
		secondary: {
			main: '#184eb1',
		},
		background: {
			paper: '#201e1e',
			default: '#121010',
		},
		error: {
			main: '#ce2e1f',
		},
	},
	typography: {
		fontFamily: 'Open Sans',
	},
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	(() => {
		const appKey = nanoid();


		return <Provider store={store}>
			<ThemeProvider theme={themeOptions}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App key={appKey}/>}>
								
								{/* Homepage */}
								<Route index element={<HomePage/>}/>
								
								{/* Password & OAuth login */}
								<Route path="login">
									<Route index element={<LoginPage/>}/>
									<Route path="register" element={<LoginRegisterPage/>}/>
								</Route>
								
								<Route element={<UserRoute/>}>
									{/* User's account info */}
									<Route path="me" element={<AccountInfoPage/>}/>

									<Route path="calendar" element={<CalendarPage/>}/>

									<Route path="event">
										<Route path="overview"/>
									</Route>

									<Route path="board" element={<BoardPage/>}>
										{/* List of user's boards */}
										<Route index element={<div/>}/>
										{/* Specific boards */}
										<Route path=":boardId" element={<div/>}/>
										{/* Board creation form */}
										<Route path="new" element={<div/>}/>
									</Route>

									<Route path="tasks">
										<Route path="overview" element={<div>
											Tasks overview
										</div>}/>
									</Route>

									<Route path="debug">
										<Route path="samples" element={<UISamplesPage/>}/>
									</Route>
								</Route>

								<Route path="admin" element={<AdminPage/>}>
									<Route index element={<AdminDashboardPage/>}/>
									<Route path="users" element={<UserAdminPage/>}/>
									<Route path="calendars" element={<CalendarAdminPage/>}/>
									<Route path="events" element={<EventAdminPage/>}/>
									<Route path="task-boards" element={<TaskBoardAdminPage/>}/>
									<Route path="tasks" element={<TaskAdminPage/>}/>
									<Route path="webhooks" element={<WebhookAdminPage/>}/>
									<Route path="databases" element={<DatabaseAdminPage/>}/>
									<Route path="settings" element={<SettingsAdminPage/>}/>
								</Route>



								
								<Route path="error">
									<Route path="404" element={<ErrorPage errorCode={404} errorMessage={"Page not found."}/>}/>
								</Route>
								<Route path="*" element={<Navigate to={"/error/404"}/>}/>
					
							</Route>
						</Routes>
					</BrowserRouter>
				</LocalizationProvider>
			</ThemeProvider>
		</Provider>
	})()
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

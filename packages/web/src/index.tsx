import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AccountInfoPage } from './pages/AccountInfoPage';
import { BoardPage } from './pages/BoardPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App/>}>
				
				{/* Dashboard */}
				<Route index element={<HomePage/>}/>
				
				{/* Password & OAuth login */}
				<Route path="login" element={<LoginPage/>}/>
				
				{/* User's account info */}
				<Route path="me" element={<AccountInfoPage/>}/>

				<Route path="board" element={<BoardPage/>}>
					{/* List of user's boards */}
					<Route index element={<div/>}/>
					{/* Specific boards */}
					<Route path=":boardId" element={<div/>}/>
					{/* Board creation form */}
					<Route path="new" element={<div/>}/>
				</Route>
	
			</Route>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

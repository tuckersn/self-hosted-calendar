import React from 'react';
import ReactDOM from 'react-dom/client';



import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { AccountInfoPage } from './pages/account/AccountInfoPage';
import { BoardPage } from './pages/board/BoardPage';
import { ErrorPage } from './pages/ErrorPage';
import { LoginRegisterPage } from './pages/login/LoginRegisterPage';
import { Provider } from 'react-redux';
import { store } from './common/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>}>
					
					{/* Dashboard */}
					<Route index element={<HomePage/>}/>
					
					{/* Password & OAuth login */}
					<Route path="login">
						<Route index element={<LoginPage/>}/>
						<Route path="register" element={<LoginRegisterPage/>}/>
					</Route>
					
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

					<Route path="*" element={<ErrorPage errorCode={404} errorMessage={"Page not found."}/>}/>
		
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

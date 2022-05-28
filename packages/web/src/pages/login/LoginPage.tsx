import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { JWT, jwtDecode } from "@internal/schema/dist";

import { COLORS } from "../../common/style";
import { Button } from "../../components/inputs/Button";
import { TextInput } from "../../components/inputs/TextInput";
import { useUser } from "../../common/hooks/useUser";



const Container = (styled.div`
	color: ${COLORS.primary};
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;

	flex-align: center;
	align-items: center;
	text-align: center;
	justify-content: center;
	background-color: ${COLORS.backgroundSlightlyDark};

`);

const InnerContainer = (styled.div`
	width: 800px;
	height: 450px;
	border: 1px solid white;
	border-radius: 20px;
	padding: 32px;
	display: flex;
	background-color: ${COLORS.background};
`);


const InputField = (styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`);


async function submitLogin(username: string, password: string, updateUser: (user: JWT) => void, navigate: (path: string) => void) {
	const payload = {
		username,
		password
	}

	const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});

	const json = await result.json();

	//TODO: error popup
	if(result.status !== 200) {
		console.error("Error logging in:", result, "BODY:", json);
		if(result.status === 401) {
			return {
				success: false,
				error: "Invalid username or password"
			}
		}
		return {
			success: false,
			message: "Unknown error has occurred."
		};
	}

	// Assumes correct response from server.
	const jwt = jwtDecode(json.token);
	localStorage.setItem("jwt", json.token);
	localStorage.setItem("username", jwt.username);
	console.log("JWT:", jwt);
	updateUser(jwt);

	//TODO: popup telling them to login
	navigate("/");
	return {
		success: true,
		message: "Successfully logged in"
	}
}

export function LoginPage() {

	const navigate = useNavigate();

	const [username, setUsername] = useState(localStorage.getItem("username") || "");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [user, updateUser] = useUser();

	return <Container>
		<InnerContainer>

			<div style={{
				flex: "1",
				borderRight: "2px dashed white",
				display: 'flex',
				flexDirection: "column"
			}}>
				<h2>Sign In</h2>
				<InputField style={{paddingRight: "32px"}}>
					
					<TextInput label="Username" value={username} onValueChange={setUsername}/>
		
				</InputField>
				<InputField style={{paddingRight: "32px"}}>

					<TextInput label="Password" type="password" value={password} onValueChange={setPassword} onEnter={async () => {
						const res = await submitLogin(username, password, updateUser, navigate);
						if(!res.success) {
							setError(res.error || "Unknown error has occurred.");
						}
					}}/>
			
				</InputField>
				<br/>
				{
					error && <div style={{color: "red"}}>{error}</div>
				}
				<InputField>
					<Button style={{
						minWidth: "100px",
						margin: "auto"
					}} onClick={async () => {
						const res = await submitLogin(username, password, updateUser, navigate);
						if(!res.success) {
							setError(res.error || "Unknown error has occurred.");
						}
					}}>
						Submit
					</Button>
				</InputField>
				<div style={{
					flex: "1",
					display: "flex",
					alignItems: "end",
					justifyContent: "center",
					textAlign: "center",
					paddingBottom: "8px"
				}}>
					<Button style={{
						padding: "8px",
						paddingLeft: "16px",
						paddingRight: "16px"
					}} onClick={() => {
						navigate("./register");
					}}>
						Password sign up here
					</Button>
				</div>
			</div>
			<div style={{ flex: "1" }}>
				<div>OAuth sign ins would go here.</div>
			</div>
		</InnerContainer>
	</Container>;
}
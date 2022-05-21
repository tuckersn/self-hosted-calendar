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


`);

const InnerContainer = (styled.div`
	width: 600px;
	height: 300px;
	border: 1px solid white;
	display: flex;
`);


const InputField = (styled.div`
	display: flex;
`);
const InputFieldLeft = (styled.div`
	flex: 50%;
	flex-align: center;
	text-align: center;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: "auto";
`);
const InputFieldRight = (styled.div`
	flex: 50%;
	flex-align: left;
`);


export function LoginPage() {

	const navigate = useNavigate();

	const [username, setUsername] = useState(localStorage.getItem("username") || "");
	const [password, setPassword] = useState("");

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
					<InputFieldLeft>
						Username
					</InputFieldLeft>
					<InputFieldRight>
						<TextInput value={username} onValueChange={setUsername}/>
					</InputFieldRight>
				</InputField>
				<InputField style={{paddingRight: "32px"}}>
					<InputFieldLeft>
						Password
					</InputFieldLeft>
					<InputFieldRight>
						<TextInput value={password} onValueChange={setPassword}/>
					</InputFieldRight>
				</InputField>
				<br/>
				<InputField>
					<Button style={{
						minWidth: "100px",
						margin: "auto"
					}} onClick={async () => {
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
							return;
						}

						// Assumes correct response from server.
						const jwt = jwtDecode(json.token);
						localStorage.setItem("jwt", json.token);
						localStorage.setItem("username", jwt.username);
						console.log("JWT:", jwt);
						updateUser(jwt);

						//TODO: popup telling them to login
						navigate("/");
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
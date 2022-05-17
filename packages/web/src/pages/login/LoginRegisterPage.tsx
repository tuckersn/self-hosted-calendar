import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/inputs/Button";
import { TextInput } from "../../components/inputs/TextInput";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";


export function LoginRegisterPage() {

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [displayName, setDisplayName] = useState("");

	return <ArticleLayout title={"Registration"}>

		<h1>
			Registration
		</h1>

		<h5>Username</h5>
		<TextInput value={username} onValueChange={setUsername}/>
		<br/>

		<h5>Password</h5>
		{/*TODO: Add sensitive text input*/}
		<TextInput value={password} onValueChange={setPassword}/>
		<br/>

		<h5>Email</h5>
		<TextInput value={email} onValueChange={setEmail}/>
		<br/>

		<h5>Display name</h5>
		<TextInput value={displayName} onValueChange={setDisplayName}/>
		<br/>


		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}}>
			<div style={{ marginRight: "32px", border: "1px dashed white", padding: "4px" }}>
				Captcha would go here
			</div>
			<Button style={{
				width: "min-content"
			}} onClick={async () => {
				const payload = {
					username,
					password,
					email,
					displayName
				}

				const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/login/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)
				});

				//TODO: error popup
				if(result.status !== 200) {
					console.error("Error registering user:", result);
					return;
				}

				//TODO: popup telling them to login
				navigate("/login");
			}}>
				Register
			</Button>
		</div>
		
		
	</ArticleLayout>;
}
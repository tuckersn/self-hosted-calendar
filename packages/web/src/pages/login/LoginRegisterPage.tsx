import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/input/Button";
import { TextInput } from "../../components/input/TextInput";
import { ArticleLayout } from "../../components/layout/ArticleLayout";


export function LoginRegisterPage() {

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
				console.log("User registration payload:", payload);

				const result = await fetch("/api/user/register", {
					method: "POST"
				});
				console.log("RESULT:", result, process.env.REACT_APP_SERVER_URL);
			}}>
				Register
			</Button>
		</div>
		
		
	</ArticleLayout>;
}
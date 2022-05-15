import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../common/style";
import { Button } from "../../components/input/Button";
import { TextInput } from "../../components/input/TextInput";

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

	let navigate = useNavigate();


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
						<TextInput value="username"/>
					</InputFieldRight>
				</InputField>
				<InputField style={{paddingRight: "32px"}}>
					<InputFieldLeft>
						Password
					</InputFieldLeft>
					<InputFieldRight>
						<TextInput value="password"/>
					</InputFieldRight>
				</InputField>
				<br/>
				<InputField>
					<Button style={{
						minWidth: "100px",
						margin: "auto"
					}} onClick={() => {
						console.log("Submitting user login");
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
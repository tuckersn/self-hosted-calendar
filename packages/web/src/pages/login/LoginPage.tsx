import styled from "styled-components";
import { Colors } from "../../common/style";

const Container = (styled.div`
	color: ${Colors.primary};
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
`);


const InputField = (styled.div`
	display: flex;
`);


export function LoginPage() {
	return <Container>
		<InnerContainer>
			<h1>Sign In</h1>
			<div style={{
				height: "100%",
				width: "100%",
				display: "flex"
			}}>
				<div style={{ flex: "1" }}>
					<InputField>
						Username:
						<input type="text"/>
					</InputField>
					<InputField>
						Password:
						<input type="text"/>
					</InputField>
					<InputField>
						Submit
					</InputField>
				</div>
				<div style={{ flex: "1" }}>
					<div>OAuth sign ins would go here.</div>
				</div>
			</div>
		</InnerContainer>
	</Container>;
}
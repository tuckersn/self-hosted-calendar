import styled from "styled-components";
import { Colors } from "../common/style";

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
	width: 400px;
	height: 300px;
	border: 1px solid white;
	dis`);

export function LoginPage() {
	return <Container>
		<InnerContainer>
			<h1>Sign In</h1>
			<div>
				Username:
				<input type="text"/>
			</div>
			<div>
				Password:
				<input type="text"/>
			</div>
			<button>
				Submit
			</button>
		</InnerContainer>
	</Container>;
}
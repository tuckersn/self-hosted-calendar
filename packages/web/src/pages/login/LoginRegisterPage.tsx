import styled from "styled-components";

export const RegistrationContainer = (styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

`);

export function LoginRegisterPage() {
	return <RegistrationContainer>
		Register here!
	</RegistrationContainer>;
}
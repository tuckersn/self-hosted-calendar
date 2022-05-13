import styled from "styled-components";


const ErrorContainer = (styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`);

export function ErrorPage({
	errorCode,
	errorMessage
} : {
	errorCode?: number,
	errorMessage?: string
}) {
	
	errorCode = errorCode || -1;
	errorMessage = errorMessage || "unknown";

	return <ErrorContainer>
		<h1>Oh no!</h1>
		<h3>Error code: {errorCode}<br/>Error message: {errorMessage}</h3>
	</ErrorContainer>
}
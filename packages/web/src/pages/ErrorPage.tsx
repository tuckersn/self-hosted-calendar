import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ArticleLayout } from "../components/layouts/ArticleLayout";


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

	const location = useLocation();
	const state: {
		errorCode?: number,
		errorMessage?: string
	} = location.state as any;
	
	errorCode = errorCode || state?.errorCode || -1;
	errorMessage = errorMessage || state?.errorMessage || "unknown";

	return <ArticleLayout pageTitle="Error">
		<ErrorContainer>
			<h1>Oh no!</h1>
			<h3>Error code: {errorCode}<br/>Error message: {errorMessage}</h3>
		</ErrorContainer>
	</ArticleLayout>

}
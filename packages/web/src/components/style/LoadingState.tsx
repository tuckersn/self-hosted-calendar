import React from "react";

export interface LoadingProps {
	state: any | null;
	element: JSX.Element;
}

export function Loading(props: LoadingProps) {
	return <React.Fragment>
		{
			props.state === null ?
				<div>Loading...</div> :
				props.element
		}
	</React.Fragment>;
}
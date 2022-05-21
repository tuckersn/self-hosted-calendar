import React, { CSSProperties, useEffect } from "react";
import ReactDOM from "react-dom";


export interface DropDownProps {
	style?: CSSProperties;
	className?: string;

	FalseComponent: React.ComponentType<DropDownChildProps>;
	TrueComponent: React.ComponentType<DropDownChildProps>;
	
	onValue?: (value: boolean) => any;
	value?: boolean;

	closeOnOutsideClick?: boolean;
}


export interface DropDownChildProps extends DropDownProps {
	setValue: (value: boolean) => any;
}


export function DropDown(props: DropDownProps) {

	const {
		style,
		className,
		FalseComponent,
		TrueComponent,
		onValue,
		closeOnOutsideClick,
		value: valueProp
	} = props;

	const containerRef = React.useRef<HTMLDivElement>(null);
	const [value, setValue] = React.useState(valueProp || false);

	useEffect(() => {
		console.log("INSTANCE:", containerRef.current);
	}, []);

	useEffect(() => {
		if(onValue) {
			onValue(value);
		}
		if(closeOnOutsideClick && !value && containerRef !== null) {
			const click = (event: MouseEvent) => {
				if(event instanceof PointerEvent || event instanceof MouseEvent) {
					console.log("EV");
					const target = event.target!;
					if(!(target instanceof Node)) {
						setValue(false);
						document.removeEventListener("mousedown", click);
					} else {
						// Set value to false if the target is NOT a child of the container or the container
						const container = ReactDOM.findDOMNode(containerRef.current);
						if(!(container?.contains(target) || target === container)) {
							setValue(false);
							document.removeEventListener("mousedown", click);
						}
					}				
				}
			};
			document.addEventListener("mousedown", click, { capture: true });
		}
	}, [value, onValue, closeOnOutsideClick]);

	// Update the value if the prop changes.
	useEffect(() => {
		if(valueProp !== value && valueProp !== undefined) {
			setValue(valueProp);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valueProp]);

	return <div ref={containerRef} style={style} className={className}> 
		{
			value ?
				<TrueComponent {...props} value={value} setValue={setValue}/> : 
				<FalseComponent {...props} value={value} setValue={setValue}/>
		}
	</div>	
}
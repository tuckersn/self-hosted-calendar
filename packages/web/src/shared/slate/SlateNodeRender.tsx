import { SlateNode, SlateNodeType } from "@internal/schema/dist/serialization";
import React from "react";

export interface SlateNodeRenderProps {
	node: SlateNode;
}

export function SlateNodeRender(props: SlateNodeRenderProps) {
	const { node } = props;

	switch (node.type) {
		case SlateNodeType.TEXT:
			return <span style={{
				color: node.color || "white",
				fontWeight: node.bold ? "bold" : "normal",
				fontStyle: node.italic ? "italic" : "normal",
				textDecoration: node.underline ? "underline" : "none"
			}}>{node.text}</span>;
		case SlateNodeType.ELEMENT:
			switch(node.elementType) {
				case "p":
					return <p>{node.children.map(child => <SlateNodeRender node={child} />)}</p>;
				case "h1":
					return <h1>{node.children.map(child => <SlateNodeRender node={child} />)}</h1>;
				case "h2":
					return <h2>{node.children.map(child => <SlateNodeRender node={child} />)}</h2>;
				case "h3":
					return <h3>{node.children.map(child => <SlateNodeRender node={child} />)}</h3>;
			}
			break;
		case SlateNodeType.EDITOR:
			return <React.Fragment>{node.children.map(child => <SlateNodeRender node={child} />)}</React.Fragment>;
		case SlateNodeType.UNKNOWN:
			return <React.Fragment>{node.children.map(child => <SlateNodeRender node={child} />)}</React.Fragment>;			
	}
	return null;
}
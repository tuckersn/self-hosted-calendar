import { SlateNode, SlateNodeType } from "@internal/schema/dist/serialization";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";

export interface SlateNodeRenderProps {
	node: SlateNode & { key?: string };
}

function addKeyIfNeeded(node: SlateNode & { key?: string }): [SlateNode & { key?: string }, string] {
	if (node.key === undefined) {
		node.key = nanoid();
	}
	return [
		node,
		node.key
	];
};

function children(node: SlateNode & { key?: string }): Array<ReturnType<typeof SlateNodeRender>> {
	if(node.children === undefined) {
		return [];
	}
	return node.children.map((child) => {
		const [childNode, key] = addKeyIfNeeded(child);
		return <SlateNodeRender key={key} node={childNode} />;
	});
};

export function SlateNodeRender(props: SlateNodeRenderProps) {
	const { node } = props;

	switch (node.type) {
		case SlateNodeType.TEXT:
			return <span key={node.key} style={{
				color: node.color || "white",
				fontWeight: node.bold ? "bold" : "normal",
				fontStyle: node.italic ? "italic" : "normal",
				textDecoration: node.underline ? "underline" : "none"
			}}>
				{node.text}
			</span>;
		case SlateNodeType.ELEMENT:
			switch(node.elementType) {
				case "p":
					return <p key={node.key}>{children(node)}</p>;
				case "h1":
					return <h1 key={node.key}>{children(node)}</h1>;
				case "h2":
					return <h2 key={node.key}>{children(node)}</h2>;
				case "h3":
					return <h3 key={node.key}>{children(node)}</h3>;
			}
			break;
		case SlateNodeType.EDITOR:
			return <React.Fragment key={node.key}>{children(node)}</React.Fragment>;
		case SlateNodeType.UNKNOWN:
			return <React.Fragment key={node.key}>{children(node)}</React.Fragment>;			
	}
	return null;
}


export enum SlateNodeType {
	UNKNOWN = -1,
	EDITOR = 10,
	TEXT = 20,
	ELEMENT = 30,
}

export interface ISlateNode {
	type: SlateNodeType;
	children?: SlateNode[];
}


//
// Base Nodes
//
export interface SlateEditorNode extends ISlateNode {
	type: SlateNodeType.EDITOR;
	children: SlateNode[];
}
// /**
//  * To be used by slate, before we assign these values the
//  * partial SlateEditorNode interface will not apply.
//  */
// export type SlateEditorNodePartial = Partial<SlateEditorNode> & Pick<SlateEditorNode, 'children'>;
// export function SlateEditorNode(node: SlateEditorNodePartial): SlateEditorNode {
// 	node.nodeType = SlateNodeType.EDITOR;
// 	return node as SlateEditorNode;
// }


export interface SlateUnknownNode extends ISlateNode {
	type: SlateNodeType.UNKNOWN;
	children: SlateNode[];
}
export interface SlateTextNode extends ISlateNode {
	type: SlateNodeType.TEXT;
	text: string;
	children?: undefined;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	color?: string;
}

export interface SlateElementNode extends ISlateNode {
	type: SlateNodeType.ELEMENT;
	elementType: string;
	children: SlateNode[];
}

//
// Element Nodes
//
export interface SlateElementHeadingOneNode extends ISlateNode {
	type: SlateNodeType.ELEMENT;
	elementType: "h1";
	children: SlateNode[];
}

export interface SlateElementHeadingTwoNode extends ISlateNode {
	type: SlateNodeType.ELEMENT;
	elementType: "h2";
	children: SlateNode[];
}

export interface SlateElementHeadingThreeNode extends ISlateNode {
	type: SlateNodeType.ELEMENT;
	elementType: "h3";
	children: SlateNode[];
}

export interface SlateElementParagraphNode extends ISlateNode {
	type: SlateNodeType.ELEMENT;
	elementType: "p";
	children: SlateNode[];
}

export type SlateElement = SlateElementHeadingOneNode | SlateElementHeadingTwoNode | SlateElementHeadingThreeNode | SlateElementParagraphNode;
/**
 * Combined node, can use nodeType and type to determine specific type.
 */
export type SlateNode = SlateTextNode | SlateEditorNode | SlateUnknownNode | SlateElement;




export type SlateSanitizationError = {
	slateSanitizationError: "UNKNOWN_NODE_TYPE";
	node: SlateNode;
} | {
	slateSanitizationError: "UNKNOWN_ELEMENT_TYPE";
	node: SlateElementNode;
} | {
	slateSanitizationError: "INVALID ATTRIBUTE";
	node: SlateNode;
	attribute: string;
}
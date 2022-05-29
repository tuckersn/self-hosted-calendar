


export interface ISlateNode {
	nodeType: string;
	children?: SlateNode[];
}

//
// Base Nodes
//
export interface SlateEditorNode extends ISlateNode {
	nodeType: "editor-node";
	children: SlateNode[];
}

export interface SlateUnknownNode extends ISlateNode {
	nodeType: "unknown-node";
	children: SlateNode[];
}
export interface SlateTextNode extends ISlateNode {
	nodeType: "text-node";
	children: undefined;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
}

export interface SlateElementNode extends ISlateNode {
	nodeType: "element-node";
	type: string;
	children: SlateNode[];
}

//
// Element Nodes
//
export interface SlateElementHeadingOneNode extends ISlateNode {
	nodeType: "element-heading-one-node";
	type: "h1";
	children: SlateNode[];
}

export interface SlateElementHeadingTwoNode extends ISlateNode {
	nodeType: "element-heading-two-node";
	type: "h2";
	children: SlateNode[];
}

export interface SlateElementHeadingThreeNode extends ISlateNode {
	nodeType: "element-heading-three-node";
	type: "h3";
	children: SlateNode[];
}

export interface SlateElementParagraphNode extends ISlateNode {
	nodeType: "element-paragraph-node";
	type: "p";
	children: SlateNode[];
}


/**
 * Combined node, can use nodeType and type to determine specific type.
 */
export type SlateNode = SlateTextNode | SlateEditorNode | SlateUnknownNode | SlateElementHeadingOneNode | SlateElementHeadingTwoNode | SlateElementHeadingThreeNode | SlateElementParagraphNode;

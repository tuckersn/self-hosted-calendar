import { BaseEditor, Descendant, Editor, Transforms, Element, Text, Node } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import styled, { css } from "styled-components";

/**
 * 
 *  SLATE EDITOR 
 * 
 */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export interface SlateComponentProps {
	color?: string;
}

export type ParagraphElement = {
	type: 'paragraph'
	children: CustomText[]
} & SlateComponentProps; 

export type HeadingOneElement = {
	type: 'headingOne'
	level: number
	children: CustomText[]
} & SlateComponentProps;

export type HeadingTwoElement = {
	type: 'headingTwo'
	level: number
	children: CustomText[]
} & SlateComponentProps;

export type HeadingThreeElement = {
	type: 'headingThree'
	level: number
	children: CustomText[]
} & SlateComponentProps;

export type HeadingFourElement = {
	type: 'headingFour'
	level: number
	children: CustomText[]
} & SlateComponentProps;

export type HeadingFiveElement = {
	type: 'headingFive'
	level: number
	children: CustomText[]
} & SlateComponentProps;

export type CodeElement = {
	type: 'code'
	children: CustomText[]
} & SlateComponentProps;

export type CustomElement = ParagraphElement | HeadingOneElement | HeadingTwoElement | HeadingThreeElement | HeadingFourElement | HeadingFiveElement | CodeElement;

export type FormattedText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
	color?: string;
}

export type CustomText = FormattedText





export const slateComponentStyle = (css<SlateComponentProps>`
	color: ${props => {
		console.log("COLOR:", props.color);
		return props.color || 'white';
	}};
`);

export const DefaultComponent = styled.p`
	${slateComponentStyle}
`;
export const CodeComponent = styled.code``;
export const HeadingOneComponent = styled.h1`
	font-weight: normal;
`;
export const HeadingTwoComponent = styled.h2`
	font-weight: normal;
`;
export const HeadingThreeComponent = styled.h3`
	font-weight: normal;
`;
export const HeadingFourComponent = styled.h4`
	font-weight: normal;
`;
export const HeadingFiveComponent = styled.h5`
	font-weight: normal;
`;
 
export const renderElement = (props: RenderElementProps) => {
	 const element = props.element as any;
	 switch (element.type) {
		 case 'headingOne':
			 return <HeadingOneComponent {...props}/>
		 case 'headingTwo':
			 return <HeadingTwoComponent {...props}/>
		 case 'headingThree':
			 return <HeadingThreeComponent {...props}/>
		 case 'headingFour':
			 return <HeadingFourComponent {...props}/>
		 case 'headingFive':
			 return <HeadingFiveComponent {...props}/>
		 case 'code':
			 return <CodeComponent {...props} />
		 default:
			 return <DefaultComponent {...props} />
	 }
 }
 
export const LeafComponent = ({ attributes, children, leaf } : RenderLeafProps) => {
	 
 
	 
	 if (leaf.bold) {
		 children = <strong>{children}</strong>
	 }
	 
	 if (leaf.italic) {
		 children = <em>{children}</em>
	 }
	 
	 if (leaf.underline) {
		 children = <u>{children}</u>
	 }
	 
	 return <span style={{
		 color: leaf.color
	 }} {...attributes}>{children}</span>
 }
 
 

export const initialValue: Descendant[] = [
	{
	type: 'paragraph',
	children: [{ text: 'A line of text in a paragraph.' }],
	},
]
 
export function toggleBold(editor: Editor) {
	 const trueMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.bold === true;
			 }
			 return false;
		 }
	 }))
	 const falseMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.bold !== true;
			 }
			 return false;
		 }
	 }))
 
	 for(const [node, path] of trueMatches) {
		 Transforms.setNodes(
			 editor,
			 { bold: undefined },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 
	 for(const [node, path] of falseMatches) {
		 Transforms.setNodes(
			 editor,
			 { bold: true },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
}
 
export function toggleItalic(editor: Editor) {
	 const trueMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.italic === true;
			 }
			 return false;
		 }
	 }))
	 const falseMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.italic !== true;
			 }
			 return false;
		 }
	 }))
 
	 for(const [node, path] of trueMatches) {
		 Transforms.setNodes(
			 editor,
			 { italic: undefined },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 
	 for(const [node, path] of falseMatches) {
		 Transforms.setNodes(
			 editor,
			 { italic: true },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 }
 
export function toggleUnderline(editor: Editor) {
	 const trueMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.underline === true;
			 }
			 return false;
		 }
	 }))
	 const falseMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.underline !== true;
			 }
			 return false;
		 }
	 }))
 
	 for(const [node, path] of trueMatches) {
		 Transforms.setNodes(
			 editor,
			 { underline: undefined },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 
	 for(const [node, path] of falseMatches) {
		 Transforms.setNodes(
			 editor,
			 { underline: true },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 }
 
 
export function applyColor(editor: Editor, color: string) {
	 const falseMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.color !== color;
			 }
			 return false;
		 }
	 }));
 
	 for(const [node, path] of falseMatches) {
		 Transforms.setNodes(
			 editor,
			 { color },
			 // Apply it to text nodes, and split the text node up if the
			 // selection is overlapping only part of it.
			 {
				 at: path
			 }
		 );
	 }
 }
 
export function serialize(node: Node) {
	 if(Text.isText(node)) {
		 return {
			 nodeType: "text-node",
			 bold: node.bold,
			 italic: node.italic,
			 underline: node.underline,
			 text: node.text
		 };
	 }
	 const children: any[] = node.children.map((n) => serialize(n));
 
	 if(Element.isElement(node)) {
		 return {
			 nodeType: "element-node",
			 type: node.type,
			 children: children
		 };
	 }
	 
	 return {
		 nodeType: "unknown-node",
		 children
	 }
 }


export function setElement(editor: Editor, elementType: CustomElement['type']) {
	
	
	const [match] = Editor.nodes(editor, {
		match: (n) => {
			if(Element.isElement(n)) {
				return n.type === elementType;
			}
			return false;
		}
	})
	Transforms.setNodes(
		editor,
		{ type: match ? 'paragraph' : elementType } as any,
		{ match: n => Editor.isBlock(editor, n) }
	)
}
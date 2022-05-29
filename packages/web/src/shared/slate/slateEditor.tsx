import { SlateEditorNode, SlateElement, SlateNode, SlateNodeType, SlateTextNode } from "@internal/schema/dist/serialization";
import { BaseEditor, Descendant, Editor, Transforms, Element, Text, Node } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import styled, { css } from "styled-components";

/**
 * 
 *  SLATE EDITOR 
 * 
 */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomText = SlateTextNode;


// export const slateComponentStyle = (css<SlateComponentProps>`
// 	color: ${props => {
// 		console.log("COLOR:", props.color);
// 		return props.color || 'white';
// 	}};
// `);

export const slateComponentStyle = (css`
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
	 const element = props.element as SlateElement;
	 switch (element.elementType) {
		case 'h1':
			return <HeadingOneComponent {...props}/>
		case 'h2':
			return <HeadingTwoComponent {...props}/>
		case 'h3':
			return <HeadingThreeComponent {...props}/>
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
		type: SlateNodeType.ELEMENT,
		elementType: 'p',
		children: [{
			type: SlateNodeType.TEXT,
			text: 'A line of text in a paragraph.'
		}],
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
	console.log(editor);
	 const trueMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			console.log("N:", n);
			 if(Text.isText(n)) {
				 console.log("NT:", n);
				 return n.underline === true;
			 }
			 return false;
		 }
	 }))
	 console.log("TRUE MATCHES:", trueMatches);
	 const falseMatches = Array.from(Editor.nodes(editor, {
		 match: n => {
			 if(Text.isText(n)) {
				 return n.underline !== true;
			 }
			 return false;
		 }
	 }))
	 console.log("FALSE:", falseMatches);
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
 
export function serialize(node: SlateNode): SlateNode {
	 if(Text.isText(node)) {
		return {
			type: SlateNodeType.TEXT,
			bold: node.bold,
			italic: node.italic,
			underline: node.underline,
			text: node.text
		};
	 }
	 const children: any[] = node.children?.map((n) => serialize(n));
 
	 if(Element.isElement(node)) {
		return {
			type: SlateNodeType.ELEMENT,
			elementType: node.elementType,
			children: children
		};
	 }
	 
	 return {
		type: SlateNodeType.UNKNOWN,
		children
	 }
 }


export function setElement(editor: Editor, elementType: SlateElement['elementType']) {
	
	
	const [match] = Editor.nodes(editor, {
		match: (n) => {
			if(Element.isElement(n)) {
				return n.elementType === elementType;
			}
			return false;
		}
	})
	Transforms.setNodes(
		editor,
		{ elementType: match ? 'p' : elementType },
		{ match: n => Editor.isBlock(editor, n) }
	)
}
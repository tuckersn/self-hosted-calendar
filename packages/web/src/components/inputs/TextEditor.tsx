import { useMemo, useState } from "react";
import { createEditor, Node, Transforms, Editor, BaseEditor, Descendant, Element } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact, RenderElementProps } from "slate-react";
import styled from "styled-components";
import { STYLE_VALUES } from "../../common/style";
import { ButtonToggle } from "./ButtonToggle";


export interface TextEditorProps {
	outerStyle?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	value?: string;
	onValue?: (value: string) => void;
}

const TextEditorContainer = styled.div<TextEditorProps>`

	
	background-color: ${props => props.theme.background};
	color: white;

	display: flex;
	flex-direction: column;
	
`;

const TextEditorToolbar = styled.div`
	flex: 0;
	display: flex;

`;

const TextEditorContentOuterContainer = styled.div`
	overflow-y: scroll;
	flex: 1;
	border: 2px solid white;
	border-top: none;
	border-radius: 0 0 ${STYLE_VALUES.borderRadius}px ${STYLE_VALUES.borderRadius}px;
`;

const TextEditorContentContainer = styled.div<TextEditorProps>`
	padding: 16px;
`;

/**
 * 
 *  SLATE EDITOR 
 * 
 */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
	type: 'paragraph'
	children: CustomText[]
}
 
export type HeadingOneElement = {
	type: 'headingOne'
	level: number
	children: CustomText[]
}

export type HeadingTwoElement = {
	type: 'headingTwo'
	level: number
	children: CustomText[]
}

export type HeadingThreeElement = {
	type: 'headingThree'
	level: number
	children: CustomText[]
}

export type HeadingFourElement = {
	type: 'headingFour'
	level: number
	children: CustomText[]
}

export type HeadingFiveElement = {
	type: 'headingFive'
	level: number
	children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingOneElement | HeadingTwoElement | HeadingThreeElement | HeadingFourElement | HeadingFiveElement;

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText
 
declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor
		Element: CustomElement
		Text: CustomText
   }
 }

const DefaultElement = styled.p``;
const CodeElement = styled.code``;
const HeadingOneComponent = styled.h1``;
const HeadingTwoComponent = styled.h2``;
const HeadingThreeComponent = styled.h3``;
const HeadingFourComponent = styled.h4``;
const HeadingFiveComponent = styled.h5``;

const renderElement = (props: RenderElementProps) => {
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
			return <CodeElement {...props} />
		default:
			return <DefaultElement {...props} />
	}
}

const renderMark = (props: any, editor: any, next: any) => {
	const { children, mark, attributes } = props
	switch (mark.type) {
	  case 'bold':
		return <strong {...attributes}>{children}</strong>
	  case 'italic':
		return <em {...attributes}>{children}</em>
	  case 'underline':
		return <u {...attributes}>{children}</u>
	  default:
		return next()
	}
  }

  const initialValue: Descendant[] = [
	{
	  type: 'paragraph',
	  children: [{ text: 'A line of text in a paragraph.' }],
	},
  ]


export function TextEditor(props: TextEditorProps) {
	const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
	const [value, setValue] = useState<any[]>([
		{ type: "paragraph", children: [{ text: "hello world" }] }
	]);

	return <TextEditorContainer {...props} style={props.outerStyle}>
		<Slate
			editor={editor}
			value={value}
			onChange={(event) => {
				setValue(event);
			}}>
					
				<TextEditorToolbar>
					<ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								const node = n as any;
								console.log("N:", n);
								// return n.type === 'code';
								return node.type === 'code';
							}
						})

						
					}}>Bold</ButtonToggle>

					<ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.type === 'headingOne';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'headingOne' } as any,
							{ match: n => Editor.isBlock(editor, n) }
						)
					}}>H1</ButtonToggle>

					<ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.type === 'headingTwo';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'headingTwo' } as any,
							{ match: n => Editor.isBlock(editor, n) }
						)
					}}>H2</ButtonToggle>
					
					<ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.type === 'headingThree';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'headingThree' } as any,
							{ match: n => Editor.isBlock(editor, n) }
						)
					}}>H3</ButtonToggle>
					
					{/* <ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.type === 'headingFour';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'headingFour' } as any,
							{ match: n => Editor.isBlock(editor, n) }
						)
					}}>H4</ButtonToggle>
					
					<ButtonToggle small active={true} onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.type === 'headingFive';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'headingFive' } as any,
							{ match: n => Editor.isBlock(editor, n) }
						)
					}}>H5</ButtonToggle> */}

					{/* <MarkButton format="bold" icon="format_bold" />
					<MarkButton format="italic" icon="format_italic" />
					<MarkButton format="underline" icon="format_underlined" />
					<MarkButton format="code" icon="code" />
					<BlockButton format="heading-one" icon="looks_one" />
					<BlockButton format="heading-two" icon="looks_two" />
					<BlockButton format="block-quote" icon="format_quote" />
					<BlockButton format="numbered-list" icon="format_list_numbered" />
					<BlockButton format="bulleted-list" icon="format_list_bulleted" />
					<BlockButton format="left" icon="format_align_left" />
					<BlockButton format="center" icon="format_align_center" />
					<BlockButton format="right" icon="format_align_right" />
					<BlockButton format="justify" icon="format_align_justify" /> */}
				</TextEditorToolbar>
				<TextEditorContentOuterContainer>
					<div style={{
						height: 0
					}}>
						<TextEditorContentContainer>
							<Editable
								renderElement={renderElement}
								onKeyDown={event => {
									if (event.key === '`' && event.ctrlKey) {
										event.preventDefault()
										
										const [match] = Editor.nodes(editor, {
											match: n => {
												const node = n as any;
												console.log("N:", n);
												// return n.type === 'code';
												return node.type === 'code';
											}
										})
										Transforms.setNodes(
											editor,
											{ type: match ? 'paragraph' : 'code' } as any,
											{ match: n => Editor.isBlock(editor, n) }
										)
									}
							}}/>
						</TextEditorContentContainer>
					</div>
				</TextEditorContentOuterContainer>
		</Slate>
	</TextEditorContainer>;
}
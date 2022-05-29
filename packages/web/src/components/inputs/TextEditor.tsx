import { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Node, Transforms, BaseEditor, Descendant, Element, Editor, RangeInterface, Range, Path } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact, RenderElementProps, useSlateStatic, RenderLeafProps} from "slate-react";

import styled, { css } from "styled-components";
import { ThemedStyledFunction } from "styled-components";

import { COLORS, STYLE_VALUES } from "../../common/style";
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
	border: 2px solid darkgray;
	background: ${COLORS.backgroundDark};
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

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText
 
declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor
		Element: CustomElement
		Text: CustomText
   }
 }



const slateComponentStyle = (css<SlateComponentProps>`
	color: ${props => {
		console.log("COLOR:", props.color);
		return props.color || 'white';
	}};
`);

const DefaultComponent = styled.p`
	${slateComponentStyle}
`;
const CodeComponent = styled.code``;
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
			return <CodeComponent {...props} />
		default:
			return <DefaultComponent {...props} />
	}
}

const Leaf = ({ attributes, children, leaf } : RenderLeafProps) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>
	}
	
	// if (leaf.code) {
	// 	children = <code>{children}</code>
	// }
	
	// if (leaf.italic) {
	// 	children = <em>{children}</em>
	// }
	
	// if (leaf.underline) {
	// 	children = <u>{children}</u>
	// }
	
	return <span {...attributes}>{children}</span>
}



  const initialValue: Descendant[] = [
	{
	  type: 'paragraph',
	  children: [{ text: 'A line of text in a paragraph.' }],
	},
  ]



export function TextEditor(props: TextEditorProps) {
	const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
	const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
	const [value, setValue] = useState<any[]>([
		{ type: "paragraph", children: [{ text: "hello world" }] }
	]);

	useEffect(() => {
		console.log("UPDATE", slateComponentStyle, slateComponentStyle + '');
	}, []);

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
								if(Element.isElement(n)) {
									return n.type === 'code';
								}
								return false;
							}
						})

						
					}}>Bold</ButtonToggle>

					<ButtonToggle small active={true} onClick={() => {
						const { selection } = editor;
						if(!selection) return;

						// const { selection } = editor;
						// if(!selection) return;
						// const [match] = Editor.nodes(editor, {
					
						// 	at: Editor.unhangRange(editor, editor.selection as any),
						// 	match: n => {
						// 		if(Element.isElement(n)) {
									
						// 		}
						// 		return !Editor.isEditor(n);
						// 	}
						// })
						
						const [match] = Editor.nodes(editor, {
					
							at: Editor.unhangRange(editor, editor.selection as any),
							match: n => {
								if(Element.isElement(n)) {
									
								}
								return !Editor.isEditor(n);
							}
						})

						console.log("SELECTED:", selection, Path.isPath(selection.anchor.path));

						Transforms.setNodes(
							editor,
							{ type: 'headingOne' },
							{ match: n => Editor.isBlock(editor, n) }
						)
					
						
					}}>Red</ButtonToggle>

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
							{ type: match ? 'paragraph' : 'headingOne' },
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
							{ type: match ? 'paragraph' : 'headingTwo' },
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
							{ type: match ? 'paragraph' : 'headingThree' },
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
								renderLeaf={renderLeaf}
								renderElement={renderElement}
								onKeyDown={event => {

									function setElement(elementType: CustomElement['type']) {
										event.preventDefault()
										
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

									if (event.key === '1' && event.ctrlKey) {
										setElement('headingOne');
									} else if (event.key === '2' && event.ctrlKey) {
										setElement('headingTwo');
									} else if (event.key === '3' && event.ctrlKey) {
										setElement('headingThree');
									} else if (event.key === '`' && event.ctrlKey) {
										setElement('code');
									} else if(event.key === 'b' && event.ctrlKey) {
										console.log("EVENT:", event);
									}
							}}/>
						</TextEditorContentContainer>
					</div>
				</TextEditorContentOuterContainer>
		</Slate>
	</TextEditorContainer>;
}
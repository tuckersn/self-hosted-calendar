import { useCallback, useEffect, useMemo, useState } from "react";
import { MdColorLens, MdFormatBold, MdFormatItalic, MdFormatUnderlined } from "react-icons/md";
import { createEditor, Node, Transforms, BaseEditor, Descendant, Element, Editor, RangeInterface, Range, Path, Text } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact, RenderElementProps, useSlateStatic, RenderLeafProps} from "slate-react";
import { Transform } from "stream";

import styled, { css } from "styled-components";
import { ThemedStyledFunction } from "styled-components";

import { COLORS, STYLE_VALUES } from "../../common/style";
import { Button } from "./Button";
import { ButtonToggle } from "./ButtonToggle";


export interface TextEditorProps {
	outerStyle?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	value?: string;
	onValue?: (value: string) => void;
}

const TextEditorContainer = styled.div<TextEditorProps>`
	background: ${COLORS.backgroundDark};
	color: white;
	
	border: 2px solid darkgray;
	border-radius: ${STYLE_VALUES.borderRadius}px;

	display: flex;
	flex-direction: column;
	
`;

const TextEditorToolbar = styled.div`
	flex: 0;
	display: flex;
	border-bottom: 1px solid darkgray;
	padding: 4px;

	div {
		margin-left: 8px;
	}

	div:first-child  {
		margin-left: 0px;
	}
`;

const TextEditorContentOuterContainer = styled.div`
	overflow-y: scroll;
	flex: 1;
	background: ${COLORS.backgroundSlightlyDark};
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

export type FormattedText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
}

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
const HeadingOneComponent = styled.h1`
	font-weight: normal;
`;
const HeadingTwoComponent = styled.h2`
	font-weight: normal;
`;
const HeadingThreeComponent = styled.h3`
	font-weight: normal;
`;
const HeadingFourComponent = styled.h4`
	font-weight: normal;
`;
const HeadingFiveComponent = styled.h5`
	font-weight: normal;
`;

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
	
	if (leaf.italic) {
		children = <em>{children}</em>
	}
	
	if (leaf.underline) {
		children = <u>{children}</u>
	}
	
	return <span {...attributes}>{children}</span>
}



  const initialValue: Descendant[] = [
	{
	  type: 'paragraph',
	  children: [{ text: 'A line of text in a paragraph.' }],
	},
  ]

function toggleBold(editor: Editor) {
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

function toggleItalic(editor: Editor) {
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

function toggleUnderline(editor: Editor) {
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

export function TextEditor(props: TextEditorProps) {
	const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
	const [value, setValue] = useState<any[]>([
		{ type: "paragraph", children: [{ text: "hello world" }] }
	]);
	
	const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);


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
					<Button small onClick={() => {
						toggleBold(editor);
					}}>
						<MdFormatBold size={20}/>
					</Button>

					<Button small onClick={() => {
						toggleItalic(editor);
					}}>
						<MdFormatItalic size={20}/>
					</Button>

					<Button small onClick={() => {
						toggleUnderline(editor);
					}}>
						<MdFormatUnderlined size={20}/>
					</Button>

					<Button small onClick={() => {
						// const [match] = Editor.nodes(editor, {
						// 	match: n => {
						// 		if(Text.isText(n)) {
						// 			return n.bold === true;
						// 		}
						// 		return false;
						// 	}
						// })
						// console.log("MATCH:", match);
						// Transforms.setNodes(
						// 	editor,
						// 	{ bold: match ? undefined : true },
						// 	// Apply it to text nodes, and split the text node up if the
						// 	// selection is overlapping only part of it.
						// 	{ match: n => Text.isText(n), split: true }
						// );
						
					}}>
						<MdColorLens size={20}/>
					</Button>

					<Button small onClick={() => {
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
					}} style={{
						width: "30px",
						fontSize: "14px"
					}}>
						H1
					</Button>

					<Button small onClick={() => {
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
					}} style={{
						width: "30px",
						fontSize: "14px"
					}}>
						H2
					</Button>
					
					<Button small onClick={() => {
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
					}} style={{
						width: "30px",
						fontSize: "14px"
					}}>
						H3
					</Button>
					
					{/* <Button small onClick={() => {
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
					}}>H4</Button>
					
					<Button small onClick={() => {
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
					}}>H5</Button> */}

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
										toggleBold(editor);
									} else if(event.key === 'i' && event.ctrlKey) {
										toggleItalic(editor);
									} else if(event.key === 'u' && event.ctrlKey) {
										toggleUnderline(editor);
									}
							}}/>
						</TextEditorContentContainer>
					</div>
				</TextEditorContentOuterContainer>
		</Slate>
	</TextEditorContainer>;
}
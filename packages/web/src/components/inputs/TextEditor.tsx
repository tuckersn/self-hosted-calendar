import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorResult, PhotoshopPicker, SketchPicker } from "react-color";
import { MdColorLens, MdFormatBold, MdFormatItalic, MdFormatUnderlined } from "react-icons/md";
import { createEditor, Node, Transforms, BaseEditor, Descendant, Element, Editor, RangeInterface, Range, Path, Text } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact, RenderElementProps, useSlateStatic, RenderLeafProps} from "slate-react";
import { Transform } from "stream";
import styled, { css } from "styled-components";
import { ThemedStyledFunction } from "styled-components";

import { SlateElement, SlateNode, SlateNodeType, SlateEditorNode, SlateTextNode } from "@internal/schema/dist/serialization";

import { COLORS, STYLE_VALUES } from "../../common/style";
import { SlateEditor } from "../../shared/slate";
import { CustomEditor, CustomText, initialValue, LeafComponent, renderElement } from "../../shared/slate/slateEditor";
import { FloatingContainer } from "../style";
import { Button } from "./Button";
import { ButtonToggle } from "./ButtonToggle";


declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: SlateElement
		Text: CustomText
   }
 }
 
export interface TextEditorProps {
	outerStyle?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	value?: Descendant[];
	valueCb?: (value: (SlateElement | SlateTextNode)[]) => void;
	onColor?: (color: ColorResult) => ColorResult | void;
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


function editorToEditorNode(editor: CustomEditor): SlateNode {
	return {
		...editor,
		type: SlateNodeType.EDITOR,
		children: editor.children as unknown as SlateNode[]
	}
}

export function TextEditor(props: TextEditorProps) {
	const { onColor } = props;

	const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), []);
	const [value, setValue] = useState<Descendant[]>(props.value || initialValue);
	const [selectedColor, setSelectedColor] = useState<string>("#FFF");
	const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
	const renderLeaf = useCallback((props: RenderLeafProps) => <LeafComponent {...props} />, []);

	useEffect(() => {
		if(props.valueCb)
			props.valueCb(value);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return <TextEditorContainer {...props} style={props.outerStyle}>
		<Slate
			editor={editor}
			value={value}
			onChange={(event) => {
				setValue(event);
			}}>
					
				<TextEditorToolbar>
					<Button small onClick={() => {
						SlateEditor.toggleBold(editor);
					}}>
						<MdFormatBold size={20}/>
					</Button>

					<Button small onClick={() => {
						SlateEditor.toggleItalic(editor);
					}}>
						<MdFormatItalic size={20}/>
					</Button>

					<Button small onClick={() => {
						SlateEditor.toggleUnderline(editor);
					}}>
						<MdFormatUnderlined size={20}/>
					</Button>

					<Button small onClick={() => {
						setColorPickerOpen(!colorPickerOpen);
					}}>
						<MdColorLens color={selectedColor} size={20}/>						
					</Button>

					<Button small onClick={() => {
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.elementType === 'h1';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ elementType: match ? 'p' : 'h1' },
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
									return n.elementType === 'h2';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ elementType: match ? 'p' : 'h2' },
							{ match: n => Editor.isBlock(editor, n) }
						)
					}} style={{
						width: "30px",
						fontSize: "14px"
					}}>
						H2
					</Button>
					
					<Button small onClick={() => {
						console.log("E:", editor);
						const [match] = Editor.nodes(editor, {
							match: n => {
								if(Element.isElement(n)) {
									return n.elementType === 'h3';
								}
								return false;
							}
						})
						Transforms.setNodes(
							editor,
							{ elementType: match ? 'p' : 'h3' },
							{ match: n => Editor.isBlock(editor, n) }
						)
					}} style={{
						width: "30px",
						fontSize: "14px"
					}}>
						H3
					</Button>
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
									function cb(cb: () => void) {
										cb();
										event.preventDefault();
									}

									if (event.key === '1' && event.ctrlKey) {
										cb(() => {
											SlateEditor.setElement(editor, 'h1');
										});
									} else if (event.key === '2' && event.ctrlKey) {
										cb(() => {
											SlateEditor.setElement(editor, 'h2');
										});
									} else if (event.key === '3' && event.ctrlKey) {
										cb(() => {
											SlateEditor.setElement(editor, 'h3');
										});
									} else if (event.key === 'p' && event.ctrlKey) {
										SlateEditor.setElement(editor, 'p');
									} else if(event.key === 'b' && event.ctrlKey) {
										SlateEditor.toggleBold(editor);
									} else if(event.key === 'i' && event.ctrlKey) {
										SlateEditor.toggleItalic(editor);
									} else if(event.key === 'u' && event.ctrlKey) {
										SlateEditor.toggleUnderline(editor);
									}
							}}/>
						</TextEditorContentContainer>
					</div>
				</TextEditorContentOuterContainer>
		</Slate>
		{
			colorPickerOpen && (
				<FloatingContainer offsetX={150}>
					<SketchPicker 
						onChange={(color) => {
							if(onColor) {
								color = onColor(color) || color;
							}
							SlateEditor.applyColor(editor, selectedColor);
							setSelectedColor(color.hex);
						}}
						color={selectedColor}
					/>
					<Button small style={{
						marginTop: '4px'
					}} onClick={() => {
						SlateEditor.applyColor(editor, selectedColor);
						setColorPickerOpen(false);
					}}>
						Apply
					</Button>
				</FloatingContainer>
			)
		}
	</TextEditorContainer>;
}
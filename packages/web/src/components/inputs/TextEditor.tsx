import { useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import styled from "styled-components";
import { STYLE_VALUES } from "../../common/style";

export interface TextEditorProps {
	outerStyle?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	value?: string;
	onValue?: (value: string) => void;
}

const TextEditorContainer = styled.div<TextEditorProps>`
	border: 2px solid white;
	border-radius: ${STYLE_VALUES.borderRadius}px;
	
	background-color: ${props => props.theme.background};
	color: white;

	display: flex;
	flex-direction: column;
	
`;

const TextEditorToolbar = styled.div`
	border-bottom: 1px solid white;
	flex: 0;
`;

const TextEditorContentOuterContainer = styled.div`
	overflow-y: scroll;
	flex: 1;
`;

const TextEditorContentContainer = styled.div<TextEditorProps>`
	padding: 16px;
`;



export function TextEditor(props: TextEditorProps) {
	const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
	const [value, setValue] = useState<any[]>([
		{ type: "paragraph", children: [{ text: "hello world" }] }
	]);

	return <TextEditorContainer {...props} style={props.outerStyle}>
		<Slate editor={editor} value={value} onChange={(event) => {
				console.log("EVENT:", event);
				setValue(event);
				//setDescription(event.value);
			}}>
			<TextEditorToolbar>
				<button>Bold</button>
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
						<Editable/>
					</TextEditorContentContainer>
				</div>
			</TextEditorContentOuterContainer>
		</Slate>
	</TextEditorContainer>;
}
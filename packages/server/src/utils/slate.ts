
import escapeHtml from "escape-html";
import xss from "xss";

import { SlateNode, SlateNodeType, SlateSanitizationError } from '@internal/schema/dist/serialization';
import { verifyColorIsHex } from "@internal/common/dist";


export function slateSanitize(slateNode: SlateNode): SlateNode {
	if(slateNode.type === SlateNodeType.TEXT) {

		// Verify booleans
		for(let attribute of ['bold', 'italic', 'underline'] as ['bold', 'italic', 'underline']) {
		if(![true, false, undefined].includes(slateNode[attribute])) {
				throw {
					slateSanitizationError: "INVALID ATTRIBUTE",
					node: slateNode,
					attribute
				} as SlateSanitizationError;
			}
		}

		if(slateNode.color && !verifyColorIsHex(slateNode.color)) {
			throw {
				slateSanitizationError: "INVALID ATTRIBUTE",
				node: slateNode,
				attribute: "color"
			} as SlateSanitizationError;
		}

		return {
			type: SlateNodeType.TEXT,
			//TODO: HTML sanitize
			text: xss(escapeHtml(slateNode.text.replace(/\r?\n/g, ''))),
			color: slateNode.color,
			bold: slateNode.bold,
			italic: slateNode.italic,
			underline: slateNode.underline
		};
	}

	if(slateNode.type === SlateNodeType.ELEMENT) {
		return {
			type: SlateNodeType.ELEMENT,
			elementType: slateNode.elementType,
			children: slateNode.children.map(slateSanitize)
		};
	}

	if(slateNode.type === SlateNodeType.UNKNOWN || slateNode.type === SlateNodeType.EDITOR) {
		const children = slateNode.children.map(slateSanitize);
		return {
			type: slateNode.type,
			children
		}
	}
	
	throw {
		slateSanitizationError: "UNKNOWN_NODE_TYPE",
		node: slateNode
	} as SlateSanitizationError;
}
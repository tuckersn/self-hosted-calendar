import { CSSProperties, useState } from "react";
import styled from "styled-components";
import { COLORS, STYLE_VALUES } from "../../common/style";
import { FloatingContainer } from "../style";
import { DropDown, DropDownProps } from "./DropDown";
import { SelectProps } from "./Select";

export interface SelectDropDownListItemProps<LIST_ITEM_VALUE> {
	value: LIST_ITEM_VALUE;
	active: boolean;
	open: boolean;
}

export interface SelectDropDownProps<LIST_ITEM_VALUE = any> {
	list: LIST_ITEM_VALUE[];

	TitleComponent: React.ComponentType<Omit<SelectDropDownListItemProps<LIST_ITEM_VALUE>, 'active'>>;
	ListItemComponent: React.ComponentType<SelectDropDownListItemProps<LIST_ITEM_VALUE>>;

	style?: CSSProperties;
	value?: LIST_ITEM_VALUE | null;
	onValue?: (value: LIST_ITEM_VALUE | null) => any;
}

const SelectDropDownContainer = styled.div<SelectDropDownProps & { open: boolean }>`
	border: 1px solid rgb(255, 255, 255);
	border-radius: 3px;
	background-color: ${COLORS.backgroundDark};
	padding: 5px;
	user-select: none;
	${
		({ open }) => open ?
			`border-bottom-left-radius: 0;
			 border-bottom-right-radius: 0;` :
			`border-bottom-left-radius: 3px;
			 border-bottom-right-radius: 3px;`
	}
`;

const DropDownBox = styled.div`
	border: 1px solid rgb(255, 255, 255);
	border-radius: 3px;
	position: relative;
`;

const ListItemContainer = styled.div<SelectDropDownListItemProps<any>>`
	border-bottom: 1px solid ${COLORS.darkBorder};
	padding: 5px;
	padding-left: 8px;
	padding-right: 8px;
	${
		({ active }) => active ?
			`background-color: ${COLORS.highLight};
			 font-weight: bold;` :
			`background-color: ${COLORS.backgroundLight};
			 color: rgb(255,255,255);`
	}
	:last-child {
		border-bottom: none;
	}
`;

export function SelectDropDown(props: SelectDropDownProps) {

	const { TitleComponent, ListItemComponent } = props;

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string | null>(null);

	return <SelectDropDownContainer {...props} open={open} onClick={() => {
		setOpen(!open);
	}}>
		<DropDown value={open} TrueComponent={() => {
			return <div>
				<TitleComponent {...props} open={open} value={value}/>
				<FloatingContainer offsetX={-6} offsetY={8}>
					<DropDownBox>
						{
							props.list.map((item, index) => {
								return <ListItemContainer {...props} open={open} key={index} value={item} active={item === value} onClick={() => {
									setValue(item);
									setOpen(false);
								}}>
									<ListItemComponent {...props} open={open} key={index} value={item} active={item === value}/>
								</ListItemContainer> 
							})
						}
					</DropDownBox>
				</FloatingContainer>
			</div>;
		}} FalseComponent={() => {
			return <div>
				<TitleComponent {...props} open={open} value={value}/>
			</div>;
		}}/>
	</SelectDropDownContainer>;
}
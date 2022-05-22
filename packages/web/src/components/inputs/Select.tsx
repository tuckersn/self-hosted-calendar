import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";
import { COLORS, STYLE_VALUES } from "../../common/style";

interface ListItemProps<LIST_ITEM_VALUE> extends SelectProps<LIST_ITEM_VALUE> {
	value: LIST_ITEM_VALUE;
	active: boolean;
}

export interface SelectProps<LIST_ITEM_VALUE> {
	list: LIST_ITEM_VALUE[];
	
	TitleComponent: React.ComponentType<SelectProps<LIST_ITEM_VALUE>>;
	ListItemComponent: React.ComponentType<ListItemProps<LIST_ITEM_VALUE>>;
	
	style?: CSSProperties;
	value?: LIST_ITEM_VALUE | null;
	onValue?: (value: LIST_ITEM_VALUE | null) => any;
}

const SelectContainer = styled.div`
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 3px;
`;

const TitleContainer = styled.div`
	border-bottom: 1px solid ${COLORS.border};
	background-color: rgba(255, 255, 255, ${STYLE_VALUES.backgroundOpacity * 0.5});
	padding: 5px;
`;




const ListItemContainer = styled.div<ListItemProps<any>>`
	border-bottom: 1px solid ${COLORS.darkBorder};
	${
		({ active }) => active ?
			`background-color: rgba(255, 255, 255, ${STYLE_VALUES.backgroundOpacity * 2.5});` :
			`background-color: ${COLORS.backgroundLayer};`
	}
	padding: 5px;

	:last-child {
		border-bottom: none;
	}
`;

export function Select<LIST_ITEM_VALUE>(props: SelectProps<LIST_ITEM_VALUE>) {
	const { TitleComponent, ListItemComponent, style, value, onValue } = props;

	const [selectedValue, setSelectedValue] = React.useState<LIST_ITEM_VALUE | null>(value || null);

	useEffect(() => {
		if(onValue) {
			onValue(selectedValue);
		}
	}, [selectedValue, onValue]);

	return <SelectContainer style={style}>
		<TitleContainer>
			<TitleComponent {...props} />
		</TitleContainer>
		{
			props.list.map(item => {
				const active = selectedValue === item;
				return <ListItemContainer {...props} value={item} active={active} onClick={() => {
					setSelectedValue(item);
				}}>
					<ListItemComponent {...props} value={item} active={active}/>
				</ListItemContainer>
			})
		}
		
	</SelectContainer>
}
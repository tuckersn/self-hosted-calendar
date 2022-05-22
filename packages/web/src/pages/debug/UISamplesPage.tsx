import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/inputs/Button";
import { DropDown } from "../../components/inputs/DropDown";
import { Select } from "../../components/inputs/Select";
import { TextInput } from "../../components/inputs/TextInput";
import { Toggle } from "../../components/inputs/Toggle";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: center;
`;

const Box = styled.div`
	height: 200px;
	width: 200px;
	margin: 10px;
	padding: 25px;
	border: 1px dashed rgba(255, 255, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const BoxLabel = styled.div`
	font-size: 18px;
	font-weight: bold;
	text-align: center;	
`;

export function UISamplesPage() {


	const [dropdownOpen, setDropdownOpen] =  useState(false);
	const [selected, setSelected] = useState<string>("");


	return <React.Fragment>
		<div style={{
			textAlign: "center"
		}}>
			<h1>UI Samples</h1>
		</div>
		<Container>
			<Box>
				<Button>
					Button
				</Button>
			</Box>
			<Box>
				<Toggle falseComponent={<div>Toggle: false</div>} trueComponent={<div>Toggle: true</div>}/>
			</Box>
			<Box>
				<button onClick={() => {
					setDropdownOpen(!dropdownOpen);
				}}>
					{dropdownOpen ? "true" : "false"}
				</button>
				<DropDown value={dropdownOpen} TrueComponent={() => {
					return <div>DropDown: true</div>;
				}} FalseComponent={() => {
					return <div>DropDown: false</div>;
				}}/>
			</Box>
			<Box>
				<TextInput value="Text Input"/>
			</Box>
			<Box>
				Value: {selected}
				<Select value={selected} onValue={(value) => {
					if(value !== null) {
						setSelected(value);
					}
				}} style={{width: "100px"}} list={["A", "B", "C"]} TitleComponent={() => {
					return <React.Fragment>
						Select Title
					</React.Fragment>
				}} ListItemComponent={({value}) => {
					return <React.Fragment>
						{value}
					</React.Fragment>
				}}/>
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
			<Box>
				TEST
			</Box>
		</Container>
	</React.Fragment>;
}
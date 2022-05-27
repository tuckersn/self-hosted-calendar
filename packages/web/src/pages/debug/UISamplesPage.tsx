import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { CSS_PRESETS } from "../../common/style";
import { Button } from "../../components/inputs/Button";
import { DropDown } from "../../components/inputs/DropDown";
import { Select } from "../../components/inputs/Select";
import { SelectDropDown } from "../../components/inputs/SelectDropDown";
import { TextInput } from "../../components/inputs/TextInput";
import { Toggle } from "../../components/inputs/Toggle";
import { FloatingContainer } from "../../components/style";


const BOX_SIZE = 200;

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
	height: ${BOX_SIZE}px;
	width: ${BOX_SIZE}px;
	margin: 10px;
	padding: 25px;
	border: 3px dotted rgba(255, 255, 255, 0.5);
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	${CSS_PRESETS.boxShadowDark}
`;

const BoxLabel = styled.div`
	font-size: 18px;
	font-weight: bold;
	text-align: center;	
`;

export function UISamplesPage() {


	const [buttonText, setButtonText] = useState<string>("");
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
				{buttonText}
				<Button onClick={() => {
					setButtonText(buttonText + "Clicked!\n");
				}}>
					Button
				</Button>
			</Box>
			<Box>
				<Toggle FalseComponent={() => {
					return <div>Toggle: false</div>
				}} TrueComponent={() => {
					return <div>Toggle: true</div>
				}}/>
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
			<Box style={{
				width: `${BOX_SIZE * 1.5}px`,
			}}>
				<SelectDropDown
					list={["AAA", "BBB", "CCC"]}
					TitleComponent={({ open, value }) => {
						return <React.Fragment>
							{
								open ? "v " : "> "
							}
							{ value || "SelectDropDown"}
						</React.Fragment>
					}}
					ListItemComponent={({value}) => {
						return <React.Fragment>
							{value}
						</React.Fragment>
					}}
				/>
			</Box>
			<Box style={{
				width: `${BOX_SIZE * 1.5}px`,
			}}>
				<Toggle
					TrueComponent={() => {
						return <div style={{
							width: "250px",
							padding: "16px",
							textAlign: "center"
						}}>
							Floating Container <br/>
							x and y<br/>
							<FloatingContainer x={200} y={100}>
								<div style={{
									padding: "10px",
									backgroundColor: "#ff0000",
									height: "200px",
									width: "200px"
								}}>
									Floating container <br/>
									With X and Y set
									(Click to close this)
								</div>
							</FloatingContainer>
						</div>;
					}}
					FalseComponent={() => {
						return <div style={{
							width: "250px",
							padding: "16px",
							textAlign: "center"
						}}>
							Floating Container <br/>
							x and y<br/>
						</div>;
					}}
				/>
				<Toggle
					TrueComponent={() => {
						return <div style={{
							width: "250px",
							padding: "16px",
							textAlign: "center"
						}}>
							Floating Container <br/>
							offsetX and offsetY
							<FloatingContainer offsetX={50} offsetY={0}>
								<div style={{
									padding: "10px",
									backgroundColor: "cyan",
									color: "black",
									height: "200px",
									width: "200px"
								}}>
									Floating container <br/>
									With offsetX and offsetY set
									(Click to close this)
								</div>
							</FloatingContainer>
						</div>;
					}}
					FalseComponent={() => {
						return <div style={{
							width: "250px",
							padding: "16px",
							textAlign: "center"
						}}>
							Floating Container <br/>
							offsetX and offsetY
						</div>;
					}}
				/>
			</Box>
			<Box style={{
				width: `${BOX_SIZE * 1.5}px`,
			}}>
			</Box>
			<Box style={{
				height: `${BOX_SIZE * 1.5}px`,
			}}></Box>
			<Box style={{
				height: `${BOX_SIZE * 1.5}px`,
			}}></Box>
			<Box style={{
				height: `${BOX_SIZE * 1.5}px`,
			}}></Box>
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
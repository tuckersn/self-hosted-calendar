import React, { useEffect } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { useTable } from "react-table";

import { Header } from "../../../../components/layouts/Header";
import { TabbedContainer } from "../../../../components/style/TabbedContainer";
import { adminPageCrumbs } from "../../AdminPage";
import { COLORS, STYLE_VALUES } from "../../../../common/style";
import { UserRestApi } from "@internal/schema/dist";
import { Loading } from "../../../../components/style/LoadingState";
import { apiRequest } from "../../../../common/api/api-request";
import { Button } from "../../../../components/inputs/Button";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const HalfOfContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
`;


const UserListTableContainer = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
	display: flex;
	border: 1px solid white;
	border-radius: ${STYLE_VALUES.borderRadius}px;

	justify-content: flex-start;
	align-items: flex-start;


`;

const UserListTable = styled.table`
	flex: 1;	
`;

const TableHead = styled.thead`
	tr {
		background-color: ${COLORS.backgroundSlightlyDark};
		
	}
	th {
		border-left: 1px solid white;
		border-bottom: 1px solid white;
		&:first-of-type {
			border-left: 0;
		}
	}
`;


const Details = styled.p`
	font-size: 20px;
	margin-bottom: 8px;	
`;



export function UserAdminPage() {


	const [details, setDetails] = useState<UserRestApi.GetUserOverview['ResponseBody'] | null>(null);

	useEffect(() => {
		apiRequest("GET", "/api/user/admin/overview").then(async (res) => {
			if(res.body === null) {
				throw new Error("Response body is null in overview call");
			}
			setDetails(await res.json());
		});
	}, []);

	const data = React.useMemo(
		() => [
			{
				action: "id_here_1",
				col1: 'Hello',
				col2: 'World',
			},
			{
				action: "id_here_2",
				col1: 'react-table',
				col2: 'rocks',
			},
			{
				action: "id_here_3",
				col1: 'whatever',
				col2: 'you want',
			},
		],
		[]
	)

	const columns = React.useMemo<[{
		Header: string,
		accessor: 'action'
	},{
		Header: string,
		accessor: 'col1'
	}, {
		Header: string,
		accessor: 'col2'
	}]>(
		() => [
			{
				Header: '',
				accessor: 'action', // accessor is the "key" in the data
			},
			{
				Header: 'Column 1',
				accessor: 'col1', // accessor is the "key" in the data
			},
			{
				Header: 'Column 2',
				accessor: 'col2',
			},
		],
		[]
	)

	const tableInstance = useTable({ columns, data })

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = tableInstance


	return <Container>
		<HalfOfContainer>
			<Header crumbs={adminPageCrumbs}>
				User Panel
			</Header>
			<h1>User Admin Page</h1>
			
			<TabbedContainer noBorder navStyle={css`
				border: 1px solid white;	
			`} containerStyle={css`
				flex: 1;
			`} contentStyle={css`
				padding: 16px;
			`} tabs={{
				"Details": {
					label: "Details",
					content: <div>
						<Loading state={details} element={<div>
							<Details>Total accounts: {details?.accountCount}</Details>
							
							<Details>Total admins: {details?.adminCount}</Details>
							
							<Details>Active accounts: {details?.activeCount}</Details>
							
							<Details>Service accounts: {details?.serviceCount}</Details>
						</div>}/>
					</div>
				},
				"User List": {
					label: "User List",
					content: <UserListTableContainer>
						<UserListTable {...getTableProps()}>
							<TableHead>
							{// Loop over the header rows
								headerGroups.map(headerGroup => (
									// Apply the header row props
									<tr {...headerGroup.getHeaderGroupProps()}>
										{// Loop over the headers in each row
											headerGroup.headers.map(column => {
												if(column.id === 'action') {
													// Apply the header cell props
													return <th style={{
														width: "50px"
													}} {...column.getHeaderProps()}>
														
													</th>;
												} else {
													// Apply the header cell props
													return <th {...column.getHeaderProps()}>
														{// Render the header
														column.render('Header')}
													</th>
												}
											})
										}
									</tr>
							))}
							</TableHead>
							{/* Apply the table body props */}
							<tbody {...getTableBodyProps()}>
								{// Loop over the table rows
									rows.map(row => {
									// Prepare the row for display
									prepareRow(row)
									return (
										// Apply the row props
										<tr {...row.getRowProps()}>
											{// Loop over the rows cells
											row.cells.map(cell => {
												
												if(cell.column.id === 'action') {
													return <td {...cell.getCellProps()}>
														<Button>
															Action
														</Button>
													</td>;
												}

												return <td {...cell.getCellProps()}>
													{// Render the cell contents
													cell.render('Cell')}
												</td>;
											})}
										</tr>
									)
								})}
							</tbody>
						</UserListTable>
					</UserListTableContainer>
				},
				"Settings": {
					label: "Settings",
					content: <div>
						<h2>Settings</h2>
					</div>
				}
			}}/>
		</HalfOfContainer>
	</Container>;
}
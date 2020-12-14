import React, { Component, Fragment, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
	SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Modal from '../../components/modals/moreInfo';
const { SearchBar } = Search;

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.options = {
			custom: true,
			paginationSize: 4,
			pageStartIndex: 1,
			firstPageText: 'First',
			prePageText: 'Back',

			nextPageText: 'Next',
			lastPageText: 'Last',
			nextPageTitle: 'First page',
			prePageTitle: 'Pre page',
			firstPageTitle: 'Next page',
			lastPageTitle: 'Last page',
			showTotal: true,
			totalSize: this.props.data.length,
		};
		this.columns = [
			{
				dataField: 'week',
				text: 'Week',
				sort: true,
			},

			{
				dataField: 'date',
				text: 'Date',
				sort: true,
			},
			{
				dataField: 'id',
				text: 'Lecture ID',
				sort: true,
			},
			{
				dataField: 'lecture',
				text: 'Lecture',
				sort: true,
			},
			{
				dataField: 'attendees',
				text: 'Number of Attendees',
				sort: true,
			},
			{
				dataField: 'more',
				text: '',
				formatter: (e, row) => {
					return <Modal data={row} />;
				},
			},
		];
	}

	// rowEvents = {
	// 	onClick: (e, row, rowIndex) => {},
	// 	onMouseEnter: (e, row, rowIndex) => {
	// 		console.log(`enter on row with index: ${rowIndex}`);
	// 	},
	// };
	contentTable = ({ paginationProps, paginationTableProps }) => (
		<div>
			<div className="float-right">
				<PaginationListStandalone {...paginationProps} />
			</div>
			<ToolkitProvider
				keyField="id"
				columns={this.columns}
				data={this.props.data}
				bootstrap4
				search
			>
				{(toolkitprops) => (
					<div>
						<div
							className="float-left align-middle"
							style={{ width: '300px', display: 'flex', flexDirection: 'row' }}
						>
							<div style={{ margin: 'auto' }}>
								<SizePerPageDropdownStandalone {...paginationProps} />
							</div>
							<div style={{ margin: 'auto', paddingTop: '7px' }}>
								<SearchBar {...toolkitprops.searchProps} />
							</div>
						</div>
						<BootstrapTable
							striped
							hover
							bootstrap4
							// rowEvents={this.rowEvents}
							// cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
							{...toolkitprops.baseProps}
							{...paginationTableProps}
						/>
					</div>
				)}
			</ToolkitProvider>
			<div className="float-right">
				<PaginationListStandalone {...paginationProps} />
			</div>
		</div>
	);

	render() {
		return (
			<PaginationProvider pagination={paginationFactory(this.options)}>
				{this.contentTable}
			</PaginationProvider>
		);
	}
}

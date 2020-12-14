import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
	SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const columns = [
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
		dataField: 'fi',
		text: 'Faculty Intern',
		sort: true,
	},

	{
		dataField: 'status',
		text: 'Status',
		sort: true,
		formatter: (cellContent) => {
			switch (cellContent) {
				case 'missed':
					return (
						<span className="mb-2 mr-2 badge badge-pill badge-danger">
							{cellContent}
						</span>
					);

				case 'attended':
					return (
						<span className="mb-2 mr-2 badge badge-pill badge-success">
							{cellContent}
						</span>
					);
				default:
					return (
						<span className="mb-2 mr-2 badge badge-pill badge-primary">
							{cellContent}
						</span>
					);
			}
		},
	},
];
const data = [
	{
		id: 1,
		date: 'Sat Oct 10 11:58:11 2020',
		lecture: 'Lecture 1',
		week: '1',
		status: 'missed',
		fi: 'Mr James Peter',
	},
	{
		id: 2,
		date: 'Sat Oct 10 11:58:11 2020',
		lecture: 'Lecture 3',
		week: '2',
		status: 'missed',
		fi: 'Mr James Peter',
	},
	{
		id: 3,
		date: 'Sat Oct 10 11:58:11 2020',
		lecture: 'Lecture 3',
		week: '3',
		status: 'attended',
		fi: 'Mr James Peter',
	},
];

const defaultSorted = [
	{
		dataField: 'name',
		order: 'desc',
	},
];
const options = {
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
	totalSize: data.length,
};

const contentTable = ({ paginationProps, paginationTableProps }) => (
	<div>
		<div className="float-right">
			<PaginationListStandalone {...paginationProps} />
		</div>
		<ToolkitProvider
			keyField="id"
			columns={columns}
			data={data}
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

export default () => {
	return (
		<PaginationProvider pagination={paginationFactory(options)}>
			{contentTable}
		</PaginationProvider>
	);
};

// export default () => {
//   return (
//     <BootstrapTable
//       keyField="id"
//       bootstrap4
//       hover
//       data={data}
//       columns={columns}
//       defaultSortDirection="asc"
//     />
//   );
// };

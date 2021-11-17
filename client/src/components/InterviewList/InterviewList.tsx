import {
    Button,
    DataTable,
    DataTableSkeleton,
    Link,
    Modal,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'carbon-components-react';
import cx from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useIInterviewListQuery } from '../../generated/graphql';

// const props = () => ({
//     disabled: boolean('Disable page inputs (disabled)', false),
//     size: select('Size (size)', sizes, undefined) || undefined,
//     page: number('The current page (page)', 1),
//     totalItems: number('Total number of items (totalItems)', 103),
//     pagesUnknown: boolean(
//         'Total number of items unknown (pagesUnknown)',
//         false,
//     ),
//     pageInputDisabled: boolean(
//         'Disable page input (pageInputDisabled)',
//         undefined,
//     ),
//     pageSizeInputDisabled: boolean(
//         'Disable page size input (pageSizeInputDisabled)',
//         undefined,
//     ),
//     backwardText: text(
//         'The description for the backward icon (backwardText)',
//         'Previous page',
//     ),
//     forwardText: text(
//         'The description for the forward icon (forwardText)',
//         'Next page',
//     ),
//     pageSize: number('Number of items per page (pageSize)', 10),
//     pageSizes: array('Choices of `pageSize` (pageSizes)', [10, 20, 30, 40, 50]),
//     itemsPerPageText: text(
//         'Label for `pageSizes` select UI (itemsPerPageText)',
//         'Items per page:',
//     ),
//     onChange: action('onChange'),
// });

// const rows = [
//     {
//         id: 'a',
//         name: 'Load Balancer 3',
//         protocol: 'HTTP',
//         port: 3000,
//         rule: 'Round robin',
//         attached_groups: 'Kevin’s VM Groups',
//         status: <Link disabled={true}>Disabled</Link>,
//     },
//     {
//         id: 'b',
//         name: 'Load Balancer 1',
//         protocol: 'HTTP',
//         port: 443,
//         rule: 'Round robin',
//         attached_groups: 'Maureen’s VM Groups',
//         status: <Link>Starting</Link>,
//     },
//     {
//         id: 'c',
//         name: 'Load Balancer 2',
//         protocol: 'HTTP',
//         port: 80,
//         rule: 'DNS delegation',
//         attached_groups: 'Andrew’s VM Groups',
//         status: <Link>Active</Link>,
//     },
//     {
//         id: 'd',
//         name: 'Load Balancer 6',
//         protocol: 'HTTP',
//         port: 3000,
//         rule: 'Round robin',
//         attached_groups: 'Marc’s VM Groups',
//         status: <Link disabled={true}>Disabled</Link>,
//     },
//     {
//         id: 'e',
//         name: 'Load Balancer 4',
//         protocol: 'HTTP',
//         port: 443,
//         rule: 'Round robin',
//         attached_groups: 'Mel’s VM Groups',
//         status: <Link>Starting</Link>,
//     },
//     {
//         id: 'f',
//         name: 'Load Balancer 5',
//         protocol: 'HTTP',
//         port: 80,
//         rule: 'DNS delegation',
//         attached_groups: 'Ronja’s VM Groups',
//         status: <Link>Active</Link>,
//     },
// ];

// const headers = [
//     {
//         key: 'name',
//         header: 'Name',
//     },
//     {
//         key: 'protocol',
//         header: 'Protocol',
//     },
//     {
//         key: 'port',
//         header: 'Port',
//     },
//     {
//         key: 'rule',
//         header: 'Rule',
//     },
//     {
//         key: 'attached_groups',
//         header: 'Attached Groups',
//     },
//     {
//         key: 'status',
//         header: 'Status',
//     },
// ];

interface Props {
    showHeaders?: boolean;
}
export default function InterviewList({
    showHeaders = true,
}: Props): ReactElement {
    const [{ data, fetching, error }] = useIInterviewListQuery();
    const [rows, setRows] = useState<any>([]);
    const [headers, setHeaders] = useState<any>([]);
    useEffect(() => {
        let interviewList: any = data?.IInterviewList;
        let header: any = [];
        interviewList?.map(interview =>
            Object.keys(interview)
                .filter(
                    key =>
                        key != '__typename' &&
                        key != 'id' &&
                        (header.length > 0
                            ? header.filter(e => e.key).length > 0
                                ? false
                                : true
                            : true),
                )
                .map((key, index) => {
                    header.push({
                        key: key,
                        header: key.charAt(0).toUpperCase() + key.slice(1),
                    });
                }),
        );

        setHeaders(header);
        setRows(interviewList);
    }, [data]);
    return (
        <div>
            {fetching ? <DataTableSkeleton /> : null}
            {data?.IInterviewList && rows && headers ? (
                <DataTable rows={rows} headers={headers}>
                    {({
                        rows,
                        headers,
                        getTableProps,
                        getHeaderProps,
                        getRowProps,
                    }) => (
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {headers.map(header => (
                                        <TableHeader
                                            {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow {...getRowProps({ row })}>
                                        {row.cells.map(cell => (
                                            <TableCell key={cell.id}>
                                                {cell.value}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </DataTable>
            ) : (
                <h1> No Interviews found</h1>
            )}

            {/* TODO: Populate pagination data */}
            {/* <Pagination
                pageSize={10}
                pageSizes={[10, 20, 30, 40, 50]}
                onChange={e => console.log('Pagination', e)}
            /> */}
            <br />
        </div>
    );
}

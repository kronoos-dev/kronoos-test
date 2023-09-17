// @ts-nocheck
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {IDataContent, itemField} from "../../../@types/dataContent.types";
import {Tooltip} from "@mui/material";
import {columns} from "./Columns";
import {theme} from "../../../theme";


export default function DataTable({rows}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '95%'}}>
            <TableContainer sx={{maxHeight: 600}}>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{
                                        top: 57, minWidth: column.minWidth,
                                        backgroundColor: theme.palette.primary.main,
                                        color: '#FFF', textAlign: 'center', fontWeight: 'bold'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: IDataContent, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            // @ts-ignore
                                            const value: itemField = row[column.id];
                                            if (value.hasError) {
                                                return (
                                                    <Tooltip title={value.message}>
                                                        <TableCell key={column.id} sx={{color: 'red'}}>
                                                            {value.value ? value.value : '*'}
                                                        </TableCell>
                                                    </Tooltip>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value.value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

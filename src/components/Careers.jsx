import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

const columns = [
    { id: 'fit', label: 'Fit', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 170 },
];

const createData = (fit, title) => ({ fit, title });

const Careers = ({ jobZone, answerGlobal}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                answers: answerGlobal.answers,
                job_zone: jobZone
            }
            try {
                const response = await axios.post('https://fobi-app-cms7.onrender.com/api/career/', data);

                const formattedResult = response.data.career.map(item => ({
                    link: item.href,
                    fit: item.fit,
                    title: item.title
                }));
                console.log(formattedResult);
                setCareers(formattedResult);

            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchData();
    }, [answerGlobal]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Typography variant="h5">
                Carreiras que atendem aos seus interesses e nível de preparação:
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {careers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align="left">
                                                {column.id === 'title' ? (
                                                    <a href={row.link} target="_blank" rel="noopener noreferrer">
                                                        {row[column.id]}
                                                    </a>
                                                ) : (
                                                    row[column.id]
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={careers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default Careers;

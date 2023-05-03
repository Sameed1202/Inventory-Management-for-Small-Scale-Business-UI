import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Product Name", minWidth: 170 },
  { id: "barcode", label: "BARCODE", minWidth: 100 },
  {
    id: "current_qty",
    label: "Current Quantity",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "reorder_point",
    label: "Reorder Point",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    name: "Frozen chicken drumsticks",
    barcode: "165832989665543",
    current_qty: 25,
    reorder_point: 4,
    should_reorder: false,
  },
  {
    name: "Redbull energy drink",
    barcode: "7622201761820",
    current_qty: 42,
    reorder_point: 34,
    should_reorder: false,
  },
  {
    name: "Frozen chicken drumsticks",
    barcode: "165832989665543",
    current_qty: 25,
    reorder_point: 4,
    should_reorder: false,
  },
];

export default function StickyHeadTable({ rowdata }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        fontSize: 30,
        borderColor: "#F55050",
        borderStyle: "solid",
        margin: 2,
        padding: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{fontSize: "20px",
            fontWeight: "bold",
            paddingTop: "8px"}}
      >
        Reorder the below items to be instock
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: 18 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowdata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize: 18 }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ fontSize: 18 }}
      />
    </Paper>
  );
}

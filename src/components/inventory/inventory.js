import Navbar from "../Navbar";
import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useBarcode } from "@createnextapp/react-barcode";

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../api/apiEndpoints";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./inventory.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fontSize } from "@mui/system";

export const Inventory = () => {
  var [productList, setProductList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});

  const updatedName = useRef("");
  const updatedPrice = useRef("");
  const updatedQty = useRef();
  const updatedLeadTime = useRef();

  const newBarcode = useRef("");
  const newName = useRef("");
  const newPrice = useRef("");
  const newQty = useRef();
  const newLeadTime = useRef();

  const tableHeadingFontSize = 16;
  const tableFontSize = 15;
  const buttonFontSize = 12;

  const resetAll = () => {
    updatedName.current = "";
    updatedPrice.current = "";
    updatedQty.current = "";
    updatedLeadTime.current = "";

    newName.current = "";
    newPrice.current = "";
    newQty.current = "";
    newBarcode.current = "";
    newLeadTime.current = "";

    setOpen(false);
    setOpenNew(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log("selectedRow: ", selectedRow);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenNew(false);
  };

  const handleUpdate = () => {
    console.log("updated ref: ", updatedName.current.value);

    const updateData = [
      {
        barcode: selectedRow.barcode,
        name: updatedName.current.value,
        price: updatedPrice.current.value,
        quantity: Number(updatedQty.current.value),
        leadtime: Number(updatedLeadTime.current.value),
        
      },
    ];
    console.log("Update method: updateData: ", updateData);
    const resp = updateProduct(updateData);
    console.log("Update product api response from inventory:", resp);
    resetAll();
    window.location.reload(false);
  };

  const handleDelete = () => {
    const deleteData = {
      barcode: selectedRow.barcode,
    };

    deleteProduct(deleteData);
    resetAll();
    window.location.reload(false);
    console.log("selectedRow: ", selectedRow);
  };

  const handleAddNewClickOpen = () => {
    setOpenNew(true);
  };

  const handleAddNewProduct = () => {
    const updateData = {
      barcode: newBarcode.current.value,
      name: newName.current.value,
      price: newPrice.current.value,
      quantity: Number(newQty.current.value),
      leadtime: Number(newLeadTime.current.value)
    };

    console.log("handleAddNewProducts: updateData:  ", updateData);
    if (
      updateData.barcode != "" &&
      updateData.name != "" &&
      updateData.price != "" &&
      updateData.quantity > 0
    ) {
      addProduct(updateData);
      resetAll();
      window.location.reload(false);
    }
  };

  const CreateBarcode = (barcode) => {
    var val = barcode.barcode;
    console.log(val);
    var { inputRef } = useBarcode({
      value: val,
      options: {
        background: "#fff",
      },
    });

    return (
      <Box
        component="img"
        sx={{
          height: 82,
          width: 200,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        ref={inputRef}
      />
    );
  };

  const tableContainerSx = {
    border: "1px solid rgb(234,239,243, 0.4)",
    // width: "max-content",
    width: window.innerWidth - 400,
    height: 700,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    borderRadius: 2,
    maxHeight: window.innerHeight - 300,
    cursor: "pointer",
  };

  console.log("anc");

  useEffect(() => {
    console.log("inside use effect");
    async function fetchProducts() {
      const products = await getAllProducts();

      setProductList(products);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div
        id="containerDiv"
        class="background-img"
        style={{
          height: window.innerHeight - 100,
        }}
      >
        <section className="inventory-section">
          <TableContainer component={Paper} sx={tableContainerSx}>
            <Table stickyHeader={true}>
              <TableHead
                sx={{
                  "& .MuiTableCell-stickyHeader": {
                    backgroundColor: "primary.main",
                  },
                  "& #blank": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <TableRow align="center" scope="header">
                  <Button
                    sx={{
                      width: "maxWidth",
                      fontSize: buttonFontSize,
                      fontWeight: "bold",
                    }}
                    variant="outlined"
                    color="success"
                    onClick={handleAddNewClickOpen}
                  >
                    click to add new product
                  </Button>

                  <TableCell id="blank"></TableCell>
                  <TableCell id="blank"></TableCell>
                  <TableCell id="blank"></TableCell>
                  <Button
                    align="center"
                    sx={{
                      margin: 1,
                      width: "maxWidth",
                      fontSize: buttonFontSize,
                      fontWeight: "bold",
                    }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      window.location.reload(false);
                    }}
                  >
                    Refresh
                  </Button>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: tableHeadingFontSize,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                    scope="header"
                  >
                    Barcode
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: tableHeadingFontSize, color: "#fff" }}
                    scope="header"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: tableHeadingFontSize, color: "#fff" }}
                    scope="header"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: tableHeadingFontSize, color: "#fff" }}
                    scope="header"
                  >
                    Available quantity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: tableHeadingFontSize, color: "#fff" }}
                    scope="header"
                  >
                    Operations
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& tr:nth-of-type(2n+1)": {
                    backgroundColor: "#eef2f9",
                  },
                }}
              >
                {productList?.map((row) => (
                  <TableRow
                    key={row.barcode}
                    id={row.barcode}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => setSelectedRow(row)}
                  >
                    <TableCell
                      sx={{ fontSize: tableFontSize }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {/* {row.barcode} */}
                      <CreateBarcode barcode={row.barcode} />
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: tableFontSize, fontWeight: "bold" }}
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: tableFontSize }} align="center">
                      {row.price}
                    </TableCell>
                    <TableCell sx={{ fontSize: tableFontSize }} align="center">
                      {row.quantity}
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          width: 80,
                          fontSize: buttonFontSize,
                          fontWeight: "bold",
                        }}
                        variant="outlined"
                        color="success"
                        onClick={handleClickOpen}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        <section>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontSize: 18, fontWeight: 500 }}>
              Update Product
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontSize: tableHeadingFontSize }}>
                Please update the Product details below:
              </DialogContentText>
              <TextField
                fontSize="16"
                autoFocus
                margin="dense"
                id="name"
                label="Product name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={selectedRow.name}
                inputRef={updatedName}
              />
              <TextField
                fontSize="16"
                margin="dense"
                id="name"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={selectedRow.price}
                inputRef={updatedPrice}
              />
              <TextField
                fontSize="16"                
                margin="dense"
                id="name"
                label="Available quantity"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={selectedRow.quantity}
                inputRef={updatedQty}
              />
              <TextField
                fontSize="16"                
                margin="dense"
                id="name"
                label="Lead Time"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={selectedRow.leadtime}
                inputRef={updatedLeadTime}
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ fontSize: tableHeadingFontSize }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="warning"
                sx={{ fontSize: tableHeadingFontSize }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                color="error"
                sx={{ fontSize: tableHeadingFontSize }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </section>
        <section>
          <Dialog open={openNew} onClose={handleClose}>
            <DialogTitle sx={{ fontSize: 18, fontWeight: 500 }}>
              Add Product
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontSize: tableHeadingFontSize }}>
                Please enter new product details:
              </DialogContentText>
              <TextField
                fontSize="16"
                autoFocus
                margin="dense"
                id="name"
                label="Barcode id"
                type="text"
                fullWidth
                variant="standard"
                inputRef={newBarcode}
              />

              <TextField
                fontSize="16"                
                margin="dense"
                id="name"
                label="Product name"
                type="text"
                fullWidth
                variant="standard"
                inputRef={newName}
              />
              <TextField
                fontSize="16"                
                margin="dense"
                id="name"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                inputRef={newPrice}
              />
              <TextField
                fontSize="16"
                autoFocus
                margin="dense"
                id="name"
                label="Available quantity"
                type="text"
                fullWidth
                variant="standard"
                inputRef={newQty}
              />
              <TextField
                fontSize="16"
                autoFocus
                margin="dense"
                id="name"
                label="Lead time"
                type="text"
                fullWidth
                variant="standard"
                inputRef={newLeadTime}
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ fontSize: tableHeadingFontSize }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="success"
                sx={{ fontSize: tableHeadingFontSize }}
                onClick={handleAddNewProduct}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      </div>
    </>
  );
};

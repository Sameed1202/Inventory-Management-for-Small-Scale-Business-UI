import React from 'react'
import Box from "@mui/material/Box";
import { useBarcode } from "@createnextapp/react-barcode";

export   const CreateBarcode = (barcode) => {
    var val = barcode.barcode;
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

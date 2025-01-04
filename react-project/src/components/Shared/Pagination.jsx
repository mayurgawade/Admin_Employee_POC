import React from "react";
import { Button, Pagination, Typography, Box } from "@mui/material";

const CustomPagination = ({ total, currentPage, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  if (totalPages <= 1) return null; // No need to show pagination for one page or less

  const handlePageClick = (event, page) => {
    onPageChange(page);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Typography variant="body2" color="gray">
        Showing {" "}
        {Math.min(currentPage * itemsPerPage, total)} out of {total} entries
      </Typography>

      <Box display="flex" alignItems="center">
        <Button
          onClick={() => handlePageClick(null, currentPage - 1)}
          disabled={currentPage === 1}
          size="small"
          color="gray"
          sx={{
            marginRight: 1,
          }}
        >
          Previous
        </Button>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageClick}
          shape="rounded"
          size="small"
          siblingCount={1}
          boundaryCount={1}
        />

        <Button
          onClick={() => handlePageClick(null, currentPage + 1)}
          disabled={currentPage === totalPages}
          size="small"
          color="gray"
          sx={{
            marginLeft: 1,
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomPagination;

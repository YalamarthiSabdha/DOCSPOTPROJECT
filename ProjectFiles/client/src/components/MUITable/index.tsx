import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 15,
    padding: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "14px 16px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f8f9ff",
  },
  "&:hover": {
    backgroundColor: "#f0f2ff",
    transform: "scale(1.001)",
    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.1)",
  },
  transition: "all 0.3s ease",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface MUITableProps {
  tableHead: string[];
  children: React.ReactNode;
}

const MUITable: React.FC<MUITableProps> = ({ tableHead, children }) => {
  return (
    <>
      <TableContainer 
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map((header, index) => (
                <StyledTableCell align="left" key={index}>
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MUITable;

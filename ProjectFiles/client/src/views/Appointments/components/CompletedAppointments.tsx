import React from "react";
import Navbar from "../../../components/Navbar";
import { Heading } from "../../../components/Heading";
import { Box } from "@mui/material";
import { useCompletedAppointmentsQuery } from "../../../redux/api/doctorSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId } from "../../../redux/auth/authSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/MUITable";
import { formatDate, formatTime, maskingPhoneNumber } from "../../../utils";
import { IoBookOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

const tableHead = ["Id", "Patient", "Phone", "Date", "Rating", "Review"];

const CompletedAppointments = () => {
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useCompletedAppointmentsQuery({
    userId,
  });

  return (
    <>
      {isLoading && <OverlayLoader />}

      <Navbar>
        <Heading>Completed Appointments</Heading>
        <Box
          sx={{
            margin: "20px 0",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <MUITable tableHead={tableHead}>
            {isSuccess && data.data.length > 0 ? (
              data.data.map((row: any) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{row._id}</StyledTableCell>
                  <StyledTableCell>{`${row.userInfo?.name}`}</StyledTableCell>
                  <StyledTableCell>
                    {maskingPhoneNumber(row?.userInfo?.phoneNumber)}
                  </StyledTableCell>
                  <StyledTableCell>{`${formatDate(row?.date)} ${formatTime(
                    row?.time
                  )}`}</StyledTableCell>
                  <StyledTableCell>
                    {row.rating ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <AiFillStar style={{ color: "#FFD700", fontSize: "18px" }} />
                        <span style={{ fontWeight: 600, color: "#667eea" }}>{row.rating}/5</span>
                      </Box>
                    ) : (
                      <span style={{ color: "#9e9e9e", fontStyle: "italic" }}>Not rated yet</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.review ? (
                      <Box
                        sx={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={row.review}
                      >
                        {row.review}
                      </Box>
                    ) : (
                      <span>-</span>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  sx={{ height: "100px" }}
                  colSpan={tableHead?.length}
                  align="center"
                >
                  <Box
                    sx={{
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <IoBookOutline />
                    {data?.data?.length === 0 ? "No completed appointments yet" : ""}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MUITable>
        </Box>
      </Navbar>
    </>
  );
};

export default CompletedAppointments;

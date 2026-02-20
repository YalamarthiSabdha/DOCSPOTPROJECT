import { Heading } from "../../components/Heading";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/MUITable";
import Navbar from "../../components/Navbar";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import useTypedSelector from "../../hooks/useTypedSelector";
import { formatDate, formatTime, maskingPhoneNumber } from "../../utils";
import { useUserAppointmentsQuery, useRateAppointmentMutation } from "../../redux/api/userSlice";
import { selectedUserId } from "../../redux/auth/authSlice";
import { Box, Button } from "@mui/material";
import CustomChip from "../../components/CustomChip";
import { IoBookOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import RatingDialog from "../../components/RatingDialog";
import ToastAlert from "../../components/ToastAlert/ToastAlert";

const tableHead = ["Id", "Doctor", "Phone", "Date", "Status", "Actions"];

const Appointments = () => {
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useUserAppointmentsQuery({
    userId,
  });

  const [rateAppointment, { isLoading: ratingLoading }] = useRateAppointmentMutation();
  
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const handleRatingClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setRatingDialogOpen(true);
  };

  const handleRatingSubmit = async (rating: number, review: string) => {
    try {
      const result: any = await rateAppointment({
        appointmentId: selectedAppointment._id,
        rating,
        review,
      });

      if (result?.data?.status) {
        setToast({
          message: "Rating submitted successfully",
          appearence: true,
          type: "success",
        });
      } else if (result?.error) {
        setToast({
          message: result?.error?.data?.message || "Failed to submit rating",
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Rating Error:", error);
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}

      <Navbar>
        <Heading>Appointments</Heading>
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
                  <StyledTableCell>{`${row.doctorInfo?.prefix} ${row.doctorInfo?.fullName}`}</StyledTableCell>
                  <StyledTableCell>
                    {maskingPhoneNumber(row?.doctorInfo?.phoneNumber)}
                  </StyledTableCell>
                  <StyledTableCell>{`${formatDate(row?.date)} ${formatTime(
                    row?.time
                  )}`}</StyledTableCell>
                  <StyledTableCell>
                    <CustomChip
                      label={
                        row.status === "pending"
                          ? "Pending"
                          : row.status === "approved"
                          ? "Approved"
                          : row.status === "rejected"
                          ? "Cancelled"
                          : ""
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.isCompleted && !row.rating ? (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRatingClick(row)}
                        sx={{ 
                          textTransform: "none",
                          borderColor: "#667eea",
                          color: "#667eea",
                          borderRadius: "8px",
                          fontWeight: 500,
                          padding: "6px 16px",
                          "&:hover": {
                            borderColor: "#764ba2",
                            backgroundColor: "#f0f2ff",
                          },
                        }}
                      >
                        Rate
                      </Button>
                    ) : row.rating ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AiFillStar style={{ color: "#FFD700", fontSize: "18px" }} />
                        <span style={{ fontWeight: 600, color: "#667eea" }}>{row.rating}/5</span>
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
                    {data?.data?.length === 0 ? "No records found" : ""}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MUITable>
        </Box>
      </Navbar>

      {selectedAppointment && (
        <RatingDialog
          open={ratingDialogOpen}
          onClose={() => {
            setRatingDialogOpen(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleRatingSubmit}
          doctorName={`${selectedAppointment.doctorInfo?.prefix} ${selectedAppointment.doctorInfo?.fullName}`}
          loading={ratingLoading}
        />
      )}

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Appointments;

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Heading } from "../../../components/Heading";
import { Box, Tooltip } from "@mui/material";
import {
  useAppointmentStatusMutation,
  useDoctorAppointmentsQuery,
  useMarkAppointmentCompletedMutation,
} from "../../../redux/api/doctorSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId } from "../../../redux/auth/authSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/MUITable";
import { formatDate, formatTime, maskingPhoneNumber } from "../../../utils";
import CustomChip from "../../../components/CustomChip";
import { IoBookOutline } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import { FcCancel } from "react-icons/fc";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";
import Spinner from "../../../components/Spinner";

const tableHead = ["Id", "Patient", "Phone", "Date", "Status", "Actions"];

const DoctorAppointment = () => {
  const userId = useTypedSelector(selectedUserId);

  const [appointmentId, setAppointmentId] = useState("");
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const { data, isLoading, isSuccess } = useDoctorAppointmentsQuery({
    userId,
  });

  const [appointmentStatus, { isLoading: appointmentLoading }] =
    useAppointmentStatusMutation();

  const [markAppointmentCompleted, { isLoading: completingLoading }] =
    useMarkAppointmentCompletedMutation();

  const appointmentHandler = async (id: string, status: string) => {
    try {
      const payload = {
        appointmentId: id,
        status,
      };

      const appointment: any = await appointmentStatus(payload);

      if (appointment?.data?.status) {
        setToast({
          ...toast,
          message: appointment?.data?.message,
          appearence: true,
          type: "success",
        });
      }
      if (appointment?.error) {
        setToast({
          ...toast,
          message: appointment?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Change Appointment Status Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const handleMarkCompleted = async (id: string) => {
    try {
      const payload = {
        appointmentId: id,
      };

      const appointment: any = await markAppointmentCompleted(payload);

      if (appointment?.data?.status) {
        setToast({
          ...toast,
          message: appointment?.data?.message,
          appearence: true,
          type: "success",
        });
      }
      if (appointment?.error) {
        setToast({
          ...toast,
          message: appointment?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Mark Completed Error:", error);
      setToast({
        ...toast,
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
                  <StyledTableCell>{`${row.userInfo?.name}`}</StyledTableCell>
                  <StyledTableCell>
                    {maskingPhoneNumber(row?.userInfo?.phoneNumber)}
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {row.isCompleted ? (
                        <Box sx={{ 
                          color: "#13B981", 
                          fontWeight: "600",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg, #E7F8F2 0%, #d4f4e8 100%)",
                          border: "1px solid #13B981",
                        }}>
                          Completed
                        </Box>
                      ) : row.status === "approved" ? (
                        <>
                          {appointmentId === row?._id &&
                          (appointmentLoading || completingLoading) ? (
                            <Spinner size={20} />
                          ) : (
                            <Tooltip title="Mark as Completed">
                              <Box
                                sx={{
                                  cursor: "pointer",
                                  padding: "6px 16px",
                                  borderRadius: "8px",
                                  background: "linear-gradient(135deg, #13B981 0%, #0ea271 100%)",
                                  color: "#ffffff",
                                  fontWeight: 500,
                                  boxShadow: "0 2px 8px rgba(19, 185, 129, 0.3)",
                                  "&:hover": {
                                    boxShadow: "0 4px 12px rgba(19, 185, 129, 0.4)",
                                  },
                                }}
                                onClick={() => {
                                  handleMarkCompleted(row._id);
                                  setAppointmentId(row._id);
                                }}
                              >
                                Complete
                              </Box>
                            </Tooltip>
                          )}
                        </>
                      ) : row.status === "rejected" ? (
                        <Box>
                          <FcCancel style={{ fontSize: "16px" }} />
                        </Box>
                      ) : (
                        <>
                          {appointmentId === row?._id && appointmentLoading ? (
                            <Spinner size={20} />
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Tooltip title="Approve Appointment">
                                <Box
                                  sx={{
                                    cursor: "pointer",
                                    padding: "6px 16px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "#ffffff",
                                    fontWeight: 500,
                                    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
                                    "&:hover": {
                                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                                    },
                                  }}
                                  onClick={() => {
                                    appointmentHandler(row._id, "approved");
                                    setAppointmentId(row._id);
                                  }}
                                >
                                  Approve
                                </Box>
                              </Tooltip>
                              <Tooltip title="Reject Appointment">
                                <Box
                                  sx={{
                                    cursor: "pointer",
                                    padding: "6px 16px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #ff6b6b 0%, #c21717 100%)",
                                    color: "#ffffff",
                                    fontWeight: 500,
                                    boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
                                    "&:hover": {
                                      boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
                                    },
                                  }}
                                  onClick={() => {
                                    appointmentHandler(row._id, "rejected");
                                    setAppointmentId(row._id);
                                  }}
                                >
                                  Reject
                                </Box>
                              </Tooltip>
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
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
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default DoctorAppointment;

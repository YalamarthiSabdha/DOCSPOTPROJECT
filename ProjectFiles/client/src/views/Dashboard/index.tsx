// React Imports
import { useNavigate } from "react-router-dom";
// Utils
import {
  convertToAMPMFormat,
  maskingPhoneNumber,
  thousandSeparatorNumber,
} from "../../utils";
// React Icons
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
// MUI Imports
import { Box, Grid, Divider } from "@mui/material";
// Custom Imports
import { Heading } from "../../components/Heading";
import Navbar from "../../components/Navbar";
import { useGetApprovedDoctorsQuery } from "../../redux/api/doctorSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetApprovedDoctorsQuery({});

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Navbar>
        <Heading>Available Doctors</Heading>
        {data?.data?.length !== 0 && (
          <Heading sx={{ margin: "10px 0", fontSize: "14px", fontWeight: 500 }}>
            Select Doctor to add Appointments
          </Heading>
        )}

        <Box>
          <Grid container rowSpacing={2} columnSpacing={4}>
            {data?.data?.length === 0 ? (
              <Box
                sx={{
                  margin: "30px 0 20px 0",
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "15px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                }}
              >
                No Doctors Available in this Clinic
              </Box>
            ) : (
              <>
                {data?.data?.map((row: any) => {
                  return (
                    <Grid item xs={4}>
                      <Box
                        sx={{
                          margin: "20px 0",
                          background: "linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)",
                          borderRadius: "16px",
                          padding: "24px",
                          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.1), 0 2px 8px rgba(0,0,0,0.05)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          border: "1px solid rgba(102, 126, 234, 0.1)",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 48px rgba(102, 126, 234, 0.2), 0 4px 16px rgba(0,0,0,0.08)",
                            border: "1px solid rgba(102, 126, 234, 0.3)",
                          },
                        }}
                        onClick={() => {
                          navigate(`/book-appointments/${row?.userId}`);
                        }}
                      >
                        <Heading
                          sx={{
                            margin: "5px 0",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {`${row?.prefix} ${row?.fullName}`}
                          <Box sx={{ fontSize: "14px" }}>
                            {`(${row?.specialization})`}
                          </Box>
                        </Heading>
                        <Divider />
                        <Box
                          sx={{
                            margin: "15px 0 10px 0",
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#f8f9ff",
                            border: "1px solid #e8ecf1",
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: "180px",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              color: "#667eea",
                              fontWeight: 500,
                            }}
                          >
                            <IoPhonePortraitOutline />
                            Phone Number
                          </Box>
                          <Box>{maskingPhoneNumber(row?.phoneNumber)}</Box>
                        </Box>
                        <Box
                          sx={{
                            margin: "15px 0 10px 0",
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#f8f9ff",
                            border: "1px solid #e8ecf1",
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: "180px",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              color: "#667eea",
                              fontWeight: 500,
                            }}
                          >
                            <CiLocationOn />
                            Address
                          </Box>
                          <Box>{row?.address}</Box>
                        </Box>
                        <Box
                          sx={{
                            margin: "15px 0 10px 0",
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#f8f9ff",
                            border: "1px solid #e8ecf1",
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: "180px",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              color: "#667eea",
                              fontWeight: 500,
                            }}
                          >
                            <CiMoneyCheck1 /> Fee Per Visit
                          </Box>
                          <Box>
                            {thousandSeparatorNumber(row?.feePerConsultation)}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            margin: "15px 0 10px 0",
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#f8f9ff",
                            border: "1px solid #e8ecf1",
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: "180px",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              color: "#667eea",
                              fontWeight: 500,
                            }}
                          >
                            <IoMdTime />
                            Timings
                          </Box>
                          <Box>{`${convertToAMPMFormat(
                            row?.fromTime
                          )} to ${convertToAMPMFormat(row?.toTime)}`}</Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
      </Navbar>
    </>
  );
};

export default Dashboard;

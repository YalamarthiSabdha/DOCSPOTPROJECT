// Hooks
import useTypedSelector from "../../../hooks/useTypedSelector";
// Redux
import { useGetDoctorQuery } from "../../../redux/api/doctorSlice";
import { selectedUserId } from "../../../redux/auth/authSlice";
// Utils
import {
  formatDateTime,
  getNameInitials,
  maskingPhoneNumber,
  convertToAMPMFormat,
  thousandSeparatorNumber,
} from "../../../utils";
// MUI Imports
import { Box, Avatar, Divider } from "@mui/material";
// Custom Imports
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Navbar from "../../../components/Navbar";
import { Heading } from "../../../components/Heading";

const DoctorProfile = () => {
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading } = useGetDoctorQuery({
    userId,
  });

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Navbar>
        <Heading>Profile Details</Heading>
        <Box
          sx={{
            margin: "20px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
            borderRadius: "12px",
            padding: "20px 24px",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
            border: "1px solid #e8ecf1",
            maxWidth: "400px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ fontSize: "14px", fontWeight: 600, color: "#667eea" }}>
              Doctor
            </Box>
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "12px",
                color: "#fff",
                borderRadius: "15px",
                padding: "6px 12px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
              }}
            >
              {data?.data?.specialization}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 15px 0",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "32px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              }}
            >
              {getNameInitials(data?.data?.fullName)}
            </Avatar>
          </Box>
          <Heading
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0 0px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            {`${data?.data?.prefix} ${data?.data?.fullName}`}
          </Heading>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0 15px 0",
              fontSize: "14px",
              color: "#667eea",
              fontWeight: 500,
            }}
          >
            {data?.data?.specialization}
          </Box>

          <Divider sx={{ margin: "15px 0" }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
              Phone:
            </Box>
            <Box>{maskingPhoneNumber(data?.data?.phoneNumber)}</Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
              Experience:
            </Box>
            <Box>{data?.data?.experience} Years</Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
              Fee:
            </Box>
            <Box>₹{thousandSeparatorNumber(data?.data?.feePerConsultation)}</Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
              Timings:
            </Box>
            <Box>
              {convertToAMPMFormat(data?.data?.fromTime)} -{" "}
              {convertToAMPMFormat(data?.data?.toTime)}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
              Address:
            </Box>
            <Box sx={{ wordBreak: "break-word" }}>{data?.data?.address}</Box>
          </Box>

          {data?.data?.website && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              <Box sx={{ fontWeight: 600, minWidth: "140px", color: "#4a5568" }}>
                Website:
              </Box>
              <Box
                sx={{
                  wordBreak: "break-word",
                  color: "#667eea",
                  textDecoration: "underline",
                }}
              >
                {data?.data?.website}
              </Box>
            </Box>
          )}

          <Divider sx={{ margin: "15px 0" }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              gap: 2,
              color: "#718096",
            }}
          >
            <Box>Created At:</Box>
            <Box>{formatDateTime(data?.data?.createdAt)}</Box>
          </Box>
        </Box>
      </Navbar>
    </>
  );
};

export default DoctorProfile;

// Hooks
import useTypedSelector from "../../../hooks/useTypedSelector";
// Redux
import { useGetUserQuery } from "../../../redux/api/userSlice";
import {
  selectedUserId,
  userIsAdmin,
  userIsDoctor,
} from "../../../redux/auth/authSlice";
// Utils
import {
  formatDateTime,
  getNameInitials,
  maskingPhoneNumber,
} from "../../../utils";
// MUI Imports
import { Box, Avatar } from "@mui/material";
// Custom Imports
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Navbar from "../../../components/Navbar";
import { Heading } from "../../../components/Heading";

const UserProfile = () => {
  const userId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);
  const isAdmin = useTypedSelector(userIsAdmin);

  const { data, isLoading } = useGetUserQuery({
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
            maxWidth: "320px",
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
              {isDoctor ? "Doctor" : isAdmin ? "Owner" : "User"}
            </Box>
            {isAdmin && (
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
                Admin
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 15px 0",
            }}
          >
            <Avatar sx={{ 
              width: 64, 
              height: 64,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontSize: "24px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}>
              {getNameInitials(data?.data?.name)}
            </Avatar>
          </Box>
          <Heading
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0 0px",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {data?.data?.name}
          </Heading>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0 0 15px 0",
              fontSize: "14px",
            }}
          >
            {maskingPhoneNumber(data?.data?.phoneNumber)}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              gap: 2,
              marginTop: "10px",
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

export default UserProfile;

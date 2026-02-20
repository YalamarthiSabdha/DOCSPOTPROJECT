import { Box } from "@mui/material";

type Props = {
  label: string;
};

const CustomChip = ({ label }: Props) => {
  console.log("CustomChip label:", label);
  
  // convert color to rgb and make its opacity 0.5
  const convertColorToRgb = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  const getChipData = (status: string) => {
    let color: string;
    let bgColor: string;
    let gradient: string;

    switch (status) {
      case "Doctor":
        color = "#4bade8";
        bgColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        gradient = bgColor;
        break;
      case "Admin":
      case "Owner":
        color = "#ffffff";
        bgColor = "linear-gradient(135deg, #f5a623 0%, #f76b1c 100%)";
        gradient = bgColor;
        break;
      case "Pending":
        color = "#ffffff";
        bgColor = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
        gradient = bgColor;
        break;
      case "Approved":
      case "User":
        color = "#ffffff";
        bgColor = "linear-gradient(135deg, #13B981 0%, #0ea271 100%)";
        gradient = bgColor;
        break;
      case "Cancelled":
        color = "#ffffff";
        bgColor = "linear-gradient(135deg, #ff6b6b 0%, #c21717 100%)";
        gradient = bgColor;
        break;
      case "Blocked":
        color = "#ffffff";
        bgColor = "linear-gradient(135deg, #FF8554 0%, #ff5722 100%)";
        gradient = bgColor;
        break;
      default:
        color = `#ffffff`;
        bgColor = "linear-gradient(135deg, #636363 0%, #292929 100%)";
        gradient = bgColor;
        break;
    }
    return {
      color,
      bgColor,
      gradient,
    };
  };

  const chipStyle = {
    maxWidth: "120px",
    minWidth: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "20px",
    background: getChipData(label).gradient,
    fontWeight: 600,
    border: "none",
    fontSize: "13px",
    padding: "0 12px",
    height: "32px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  return (
    <div>
      <Box
        sx={{
          ...chipStyle,
          justifyContent: "center",
          height: "32px",
        }}
      >
        <span style={{
          color: getChipData(label).color,
          fontSize: "13px",
          fontWeight: 600,
          textTransform: "capitalize",
        }}>
          {label}
        </span>
      </Box>
    </div>
  );
};

export default CustomChip;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface RatingDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  doctorName: string;
  loading?: boolean;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onClose,
  onSubmit,
  doctorName,
  loading = false,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
      handleClose();
    }
  };

  const handleClose = () => {
    setRating(0);
    setReview("");
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          padding: "20px 24px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Rate Your Experience
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, marginTop: 0.5 }}>
          with {doctorName}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography component="legend">Your Rating</Typography>
            <Rating
              name="doctor-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue || 0);
              }}
              size="large"
            />
          </Box>
          <TextField
            label="Review (Optional)"
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with the doctor..."
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{
            color: "#667eea",
            fontWeight: 500,
            textTransform: "none",
            padding: "8px 20px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f0f2ff",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={rating === 0 || loading}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            fontWeight: 500,
            textTransform: "none",
            padding: "8px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)",
              boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
            },
            "&:disabled": {
              background: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingDialog;

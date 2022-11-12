import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const StarRating = ({ star }) => {
  return (
    <Stack fontSize={13}>
      <span>
        <Rating
          size="medium"
          name="half-rating-read"
          defaultValue={star}
          precision={0.5}
          readOnly  
        />
      </span>
    </Stack>
  );
};

export default StarRating;

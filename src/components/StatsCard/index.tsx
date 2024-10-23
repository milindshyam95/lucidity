import {
  Card,
  CardContent,
  Container,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface StatsCardProps {
  text: string;
  value: number;
  icon: React.ElementType;
}

const StatsCard: React.FC<StatsCardProps> = ({ text, value, icon }) => {
  return (
    <Card
      sx={{ backgroundColor: "#243325", borderRadius: "10px", width: "100%" }}
    >
      <CardContent>
        <Stack direction="row">
          <Icon component={icon} />
          <Container>
            <Typography variant="body1">{text}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Container>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Alert,
  Box,
  IconButton,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import DefaultLayout from "../../components/default/layout";

function HomeMainPage() {
  const buttonStyle = {
    p: 2,
    justifyContent: "left",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(0, 100, 0, 0.7)",
    },
    fontWeight: "bold",
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.2)",
    bgcolor: "#0c3a2b",
    color: "white",
    width: "100%",
    borderRadius: "4px",
  };

  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const sampleNotifications = [
      { message: "Test notification 1: New course added", severity: "info" },
      {
        message: "Test notification 3: Course analyzer updated",
        severity: "success",
      },
      {
        message: "Test notification 4: Database error occurred",
        severity: "error",
      },
    ];

    // Check if login success state is passed
    if (location.state?.loginSuccess) {
      sampleNotifications.unshift({
        message: "Login successful! Welcome to the homepage.",
        severity: "success",
      });
    }

    setNotifications(sampleNotifications);

    const timer = setTimeout(() => {
      setNotifications([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.state]);

  const handleClose = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <DefaultLayout title="CSUS Pal Course Analyzer">
      <Grid container sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            minHeight: {
              xs: "auto",
              md: "750px",
            },
            p: 3,
            borderRadius: "10px",
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "1.2em" }}
            >
              The CSUS PAL program aims to support students in challenging STEM
              courses by offering supplementary classes led by former students.
              These classes, held in person, require campus classrooms that do
              not conflict with core STEM courses. However, identifying suitable
              times and classrooms poses a challenge due to the lack of software
              to analyze scheduling data for STEM courses.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "1.2em" }}
            >
              The Supplementary Course Analyzer aims to solve this problem by
              providing a website that will analyze course times and determine
              optimal times for supplementary courses, while minimizing
              interference with major courses. We aim to make PAL courses more
              accessible to students and help the PAL program accomplish their
              goal of helping students learn.
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={7} sx={{ p: 3 }}>
          <Stack direction="column" spacing={0.5}>
            <Typography
              variant="h6"
              fontWeight="bold"
              bgcolor={(theme) => theme.palette.secondary.hornet}
              p={2}
              borderRadius={1}
              textAlign="left"
            >
              Access Analyzer
            </Typography>
            <Button
              id="search-courses-link"
              component="a"
              href="/search"
              sx={buttonStyle}
            >
              Search Courses
            </Button>
            <Button
              component="a"
              href="/StudentEnrollmentAnalyzer"
              sx={buttonStyle}
            >
              Student Enrollment Analyzer
            </Button>
            <Button
              id="student_availability"
              component="a"
              href="/StudentAvailability"
              sx={buttonStyle}
            >
              Student Availability
            </Button>
            <Typography
              variant="h6"
              fontWeight="bold"
              bgcolor={(theme) => theme.palette.secondary.hornet}
              p={2}
              borderRadius={1}
              textAlign="left"
            >
              About Analyzer
            </Typography>
            <Button component="a" href="/Creators" sx={buttonStyle}>
              Creators
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
        <Stack spacing={2} mr={2}>
          {notifications.map((notification, index) => (
            <Alert
              key={index}
              severity={notification.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => handleClose(index)}
                >
                  <CloseIcon />
                </IconButton>
              }
              sx={{ width: "100%" }}
            >
              {notification.message}
            </Alert>
          ))}
        </Stack>
      </Box>
    </DefaultLayout>
  );
}

export default HomeMainPage;

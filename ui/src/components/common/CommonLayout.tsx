"use client"
import { alpha, Box } from "@mui/material";

export default function CommonLayout(props: Readonly<{ children: React.ReactNode }>) {
    return (
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: "auto",
              display: "flex",
              borderRadius: 3,
            })}
          >
            <Box
              sx={{
                width: "100%",
                // maxWidth: { sm: "100%", md: "2400px" },
                alignItems: "stretch",
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 2 },
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {props.children}
            </Box>
          </Box>
    );
  }
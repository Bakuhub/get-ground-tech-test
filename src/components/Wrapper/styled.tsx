import React from "react";
import {styled} from "@mui/system";
import {AppBar, Container, Typography} from "@mui/material";

export const StyledAppBar = styled(AppBar)
({
     backgroundColor: "#f5f5f5", boxShadow: "none"
 });

export const StyledTitle = styled(Typography)
({
     flexGrow: 1, textAlign: "center",
     marginTop: "1rem",
     marginBottom: "1rem", color: "#333",
     fontFamily: "cursive",
     fontSize: "2rem", letterSpacing: "2px",
     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
 });

export const ContentContainer = styled(Container)({
    flex: '1 0 auto',
                                                      padding: "10px"
                                                  });

export const Footer = styled("footer")
({
     backgroundColor: "#333", color: "#fff", padding: "1rem",
     marginTop: "auto",
     textAlign: "center"
 });

export const WrapperContainer = styled("div")({
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  minHeight: "100vh"
                                              });
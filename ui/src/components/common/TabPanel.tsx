import { Container } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
  style?: React.CSSProperties;
}

export function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, style, ...other } = props;
  return (
    <Container
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{
        flex: 1,
        display: value !== index ? "none" : "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        ...style,
      }}
      maxWidth={false}
      fixed={false}
      {...other}
    >
      {value === index && children}
    </Container>
  );
}

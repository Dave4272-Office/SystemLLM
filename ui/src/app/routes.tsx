import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";
import MemoryIcon from "@mui/icons-material/Memory";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Chip } from "@mui/material";
import { Navigation } from "@toolpad/core";

export const navigation: Navigation = [
  {
    kind: "header",
    title: "Demo items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "configuration",
    title: "Configuration",
    icon: <SettingsIcon />,
    action: <Chip label={7} color="primary" size="small" />,
    children: [
      {
        segment: "apikeys",
        title: "API Keys",
        icon: <KeyIcon />,
      },
      {
        segment: "openai",
        title: "OpenAI Prompts",
        icon: <MemoryIcon />,
      },
    ],
  },
  {
    segment: "fundamentals",
    title: "Fundamentals",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "all_tickers",
    title: "All Tickers",
    icon: <ShoppingCartIcon />,
  },
];

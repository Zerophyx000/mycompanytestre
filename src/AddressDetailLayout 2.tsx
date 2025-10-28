import * as React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  Stack,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  Note as NoteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import AddressOverview from "./AddressOverview 1";
import AddressTimeline from "./AddressTimeline 1";
import AddressNotes from "./AddressNotes 1";

export type AddressDetailLayoutProps = { adrKey: string };

// ALL ADDRESS DATA (from AddressPage)
const mockAddressData: Record<string, {
  name: string;
  company: string;
  status: string;
  type: string;
  class: string;
  phone: string;
  email: string;
  address: string;
  createdDate: string;
}> = {
  "ADR001234": {
    name: "John Smith",
    company: "Smith Corp",
    status: "Active",
    type: "Individual",
    class: "Premium",
    phone: "+1 (555) 123-4567",
    email: "john.smith@smithcorp.com",
    address: "123 Main Street, Los Angeles 90210, United States",
    createdDate: "2024-01-15",
  },
  "ADR002345": {
    name: "Jane Doe",
    company: "Doe Enterprises",
    status: "Pending",
    type: "Company",
    class: "Standard",
    phone: "+1 (555) 987-6543",
    email: "jane.doe@doeenterprises.com",
    address: "456 Business Ave, New York 10001, United States",
    createdDate: "2024-01-16",
  },
  "ADR003456": {
    name: "Bob Johnson",
    company: "Johnson & Partners",
    status: "Inactive",
    type: "Partnership",
    class: "Basic",
    phone: "+1 (555) 246-8135",
    email: "bob.johnson@johnsonpartners.com",
    address: "789 Partnership St, Chicago 60601, United States",
    createdDate: "2024-01-17",
  },
  "ADR004567": {
    name: "Sarah Wilson",
    company: "Wilson Technologies",
    status: "Active",
    type: "Individual",
    class: "Premium",
    phone: "+1 (555) 369-2580",
    email: "sarah.wilson@wilsontech.com",
    address: "321 Tech Drive, San Francisco 94105, United States",
    createdDate: "2024-01-18",
  },
  "ADR005678": {
    name: "Mike Brown",
    company: "Brown Industries",
    status: "Active",
    type: "Company",
    class: "Enterprise",
    phone: "+1 (555) 147-2589",
    email: "mike.brown@brownindustries.com",
    address: "654 Industrial Blvd, Houston 77001, United States",
    createdDate: "2024-01-19",
  },
};

function AddressDetailLayout({ adrKey }: AddressDetailLayoutProps) {
  const [tab, setTab] = React.useState<"overview" | "timeline" | "notes">("overview");

  // Get address data
  const addressData = mockAddressData[adrKey] || {
    name: "Unknown",
    company: "-",
    status: "Active",
    type: "Individual",
    class: "Standard",
    phone: "-",
    email: "-",
    address: "-",
    createdDate: "-",
  };

  const tabs = [
    { id: "overview" as const, label: "Übersicht", icon: <DashboardIcon /> },
    { id: "timeline" as const, label: "Activity Timeline", icon: <TimelineIcon /> },
    { id: "notes" as const, label: "Notiz", icon: <NoteIcon /> },
  ];

  const renderTab = () => {
    switch (tab) {
      case "overview":
        return <AddressOverview adrKey={adrKey} />;
      case "timeline":
        return <AddressTimeline />;
      case "notes":
        return <AddressNotes />;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Breadcrumbs */}
      <Box sx={{ px: 3, pt: 2, pb: 1, bgcolor: "background.paper" }}>
        <Breadcrumbs>
          <Link href="#" underline="hover" display="flex" alignItems="center" gap={1}>
            <HomeIcon fontSize="small" />
            Dashboard
          </Link>
          <Link href="#" underline="hover" display="flex" alignItems="center" gap={1}>
            <PeopleIcon fontSize="small" />
            Adressen
          </Link>
          <Typography>{adrKey}</Typography>
        </Breadcrumbs>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Paper
          elevation={0}
          sx={{
            width: 320,
            borderRight: 1,
            borderColor: "divider",
            overflow: "auto",
            p: 3,
          }}
        >
          <Typography variant="overline" color="text.secondary" gutterBottom>
            MEMBER
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
              {addressData.name.split(" ").map(n => n[0]).join("")}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {addressData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {addressData.name}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={addressData.status}
            color={addressData.status === "Active" ? "success" : "warning"}
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2" gutterBottom fontWeight="bold" mt={2}>
            Kontaktinformationen
          </Typography>

          <Stack spacing={1.5} mb={3}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <BusinessIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Firma
                </Typography>
                <Typography variant="body2">{addressData.company}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <PhoneIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Telefon
                </Typography>
                <Typography variant="body2">{addressData.phone}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <EmailIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  E-Mail
                </Typography>
                <Typography variant="body2">{addressData.email}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <LocationIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Adresse
                </Typography>
                <Typography variant="body2">{addressData.address}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <CalendarIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Erstellt
                </Typography>
                <Typography variant="body2">{addressData.createdDate}</Typography>
              </Box>
            </Stack>
          </Stack>

          <Divider />

          <Typography variant="subtitle2" gutterBottom fontWeight="bold" mt={2}>
            Notizen
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Langjähriger Geschäftspartner mit guter Zusammenarbeit
          </Typography>
        </Paper>

        <Box sx={{ flex: 1, overflow: "auto", bgcolor: "background.default" }}>
          {renderTab()}
        </Box>

        <Paper
          elevation={0}
          sx={{
            width: 240,
            borderLeft: 1,
            borderColor: "divider",
            overflow: "auto",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Navigation
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Tabs für diese Adresse
            </Typography>
          </Box>
          <Divider />
          <List>
            {tabs.map((t) => (
              <ListItemButton
                key={t.id}
                selected={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                <ListItemIcon>{t.icon}</ListItemIcon>
                <ListItemText primary={t.label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export { AddressDetailLayout };
export default AddressDetailLayout;

import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Chip,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { addressData } from "./AddressPage";
import { useTranslation } from "react-i18next";

type Props = { adrKey: string };

export default function AddressOverview({ adrKey }: Props) {
  const { t } = useTranslation();
  const address = addressData.find((a) => a.adrKey === adrKey);

  if (!address) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">{t("address.overview.notFound")}</Typography>
      </Box>
    );
  }

  const statusColor =
    address.status.toLowerCase() === "active"
      ? "success"
      : address.status.toLowerCase() === "pending"
      ? "warning"
      : address.status.toLowerCase() === "inactive"
      ? "error"
      : "default";

  const initials = address.member
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // simple demo placeholders
  const company = address.ownType === "Company" ? address.member : "—";
  const phone = "+1 (555) 123-4567";
  const email = "contact@example.com";
  const street = "123 Main Street, 90210 Los Angeles";

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {adrKey}
      </Typography>

      {/* Status cards */}
      <Stack direction="row" spacing={3} sx={{ mb: 3 }} flexWrap="wrap">
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {t("address.overview.status")}
            </Typography>
            <Chip label={address.status} color={statusColor as any} />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {t("address.overview.type")}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {address.ownType}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {t("address.overview.class")}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {address.class}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* left */}
        <Box sx={{ flex: 2, minWidth: 280 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              <Avatar sx={{ width: 80, height: 80 }}>{initials}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {address.member}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {company}
                </Typography>
                <Chip label={address.status} color={statusColor as any} size="small" />
              </Box>
            </Stack>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("address.overview.contact")}
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BusinessIcon fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("address.overview.company")}
                  </Typography>
                  <Typography variant="body1">{company}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PhoneIcon fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("address.overview.phone")}
                  </Typography>
                  <Typography variant="body1">{phone}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <EmailIcon fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("address.overview.email")}
                  </Typography>
                  <Typography variant="body1">{email}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocationIcon fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("address.overview.address")}
                  </Typography>
                  <Typography variant="body1">{street}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CalendarIcon fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("address.overview.created")}
                  </Typography>
                  <Typography variant="body1">{address.aDate}</Typography>
                </Box>
              </Stack>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t("address.overview.notes")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("address.overview.notesPlaceholder")}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                {t("address.overview.relationships")}
              </Typography>
              <IconButton size="small" aria-label={t("common.edit")}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            <Stack spacing={2}>
              <Button fullWidth variant="outlined" startIcon={<BusinessIcon />}>
                {t("address.overview.relLawyer")}{" "}
                <Chip label={t("address.overview.relCount", { count: 5 })} size="small" sx={{ ml: "auto" }} />
              </Button>
              <Button fullWidth variant="outlined" startIcon={<BusinessIcon />}>
                {t("address.overview.relVp")}{" "}
                <Chip label={t("address.overview.relCount", { count: 5 })} size="small" sx={{ ml: "auto" }} />
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";
import type { SchadenRow } from "./SchadenPage";

type CalendarProps = {
  rows: SchadenRow[];
};

export default function SchadenCalendar({ rows }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  // map rows by date string (yyyy-MM-dd)
  const eventsByDate: Record<string, SchadenRow[]> = {};
  rows.forEach((row) => {
    const key = row.aDate;
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(row);
  });

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {format(currentMonth, "MMMM yyyy")}
        </Typography>
        <IconButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight />
        </IconButton>
        <Button
          startIcon={<Today />}
          onClick={() => setCurrentMonth(new Date())}
        >
          Today
        </Button>
      </Stack>

      {/* Weekday header */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        textAlign="center"
        mb={1}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <Typography key={d} variant="subtitle2">
            {d}
          </Typography>
        ))}
      </Box>

      {/* Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        gridAutoRows="120px"
        gap={0.5}
      >
        {days.map((dayDate, idx) => {
          const dateStr = format(dayDate, "yyyy-MM-dd");
          const events = eventsByDate[dateStr] || [];
          return (
            <Paper
              key={idx}
              sx={{
                p: 1,
                bgcolor: isSameMonth(dayDate, currentMonth)
                  ? "background.paper"
                  : "action.hover",
                border: isSameDay(dayDate, new Date())
                  ? "2px solid #1976d2"
                  : "1px solid #ccc",
                overflow: "hidden",
              }}
            >
              <Typography variant="caption" display="block" gutterBottom>
                {format(dayDate, "d")}
              </Typography>
              {events.slice(0, 3).map((ev) => (
                <Typography
                  key={ev.id}
                  variant="body2"
                  noWrap
                  sx={{ fontSize: "0.75rem" }}
                >
                  {ev.member}
                </Typography>
              ))}
              {events.length > 3 && (
                <Typography variant="caption" color="text.secondary">
                  +{events.length - 3} more
                </Typography>
              )}
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

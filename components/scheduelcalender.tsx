// src/components/ScheduleCalendar.js
"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar's CSS
import { format, isSameDay, parseISO } from "date-fns";
import { useEffect  } from "react";
import axios from "axios";

// const scheduleData = {
//   schedule: [
//     {
//       machine_id: "welding_robot_006",
//       action: "maintenance",
//       scheduled_date: "2024-10-19T10:00:00Z",
//       priority: "high",
//       worker_role: "technician",
//     },
//     {
//       machine_id: "stamping_press_001",
//       action: "inspection",
//       scheduled_date: "2024-10-21T12:00:00Z",
//       priority: "low",
//       worker_role: "operator",
//     },
//     {
//       machine_id: "painting_robot_002",
//       action: "maintenance",
//       scheduled_date: "2024-10-20T09:00:00Z",
//       priority: "high",
//       worker_role: "technician",
//     },
//     {
//       machine_id: "agv_003",
//       action: "recharge",
//       scheduled_date: "2024-10-19T14:00:00Z",
//       priority: "medium",
//       worker_role: "operator",
//     },
//     {
//       machine_id: "cnc_milling_004",
//       action: "maintenance",
//       scheduled_date: "2024-10-22T10:00:00Z",
//       priority: "high",
//       worker_role: "technician",
//     },
//     {
//       machine_id: "leak_test_005",
//       action: "maintenance",
//       scheduled_date: "2024-10-18T20:00:00Z",
//       priority: "high",
//       worker_role: "technician",
//     },
//   ],
// };

const ScheduleCalendar = () => {
  const [scheduleData, setscheduleData] = useState({});
  useEffect(() => {
    const myfunction = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/ai/generate-task-schedule"
        );
        console.log(" chat resposne : ", response.data);
         setscheduleData(response.data.schedule)
      } catch (error) {
        console.log(error);
      }
    };
    myfunction();
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);

  // Format the dates from the schedule into Date objects
  const events = scheduleData?.schedule?.map((event) => ({
    ...event,
    scheduled_date: parseISO(event.scheduled_date),
  }));

  // Check if a given day has an event scheduled
  const tileContent = ({ date }) => {
    const eventForDay = events?.find((event) =>
      isSameDay(event.scheduled_date, date)
    );

    return eventForDay ? (
      <div style={{ color: "red", fontWeight: "bold" }}>●</div>
    ) : null;
  };

  // Display the events when a date is clicked
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const eventsForSelectedDate = events?.filter((event) =>
    isSameDay(event.scheduled_date, selectedDate)
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Maintenance Schedule Calendar</h2>
      <Calendar onChange={handleDateClick} tileContent={tileContent} />

      {selectedDate && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Events for {format(selectedDate, "dd MMM yyyy")}</h3>
          {eventsForSelectedDate?.length ? (
            eventsForSelectedDate?.map((event, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                <strong>Machine:</strong> {event.machine_id} <br />
                <strong>Action:</strong> {event.action} <br />
                <strong>Priority:</strong> {event.priority} <br />
                <strong>Worker Role:</strong> {event.worker_role}
              </div>
            ))
          ) : (
            <p>No events scheduled.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;

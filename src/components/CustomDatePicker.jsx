// src/components/CustomDatePicker.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css"; // optional, your existing styles

const CustomDatePicker = ({ selected, onChange }) => {
  return (
    <div style={{ color: "white" }}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        calendarStartDay={0}
        showPopperArrow={false}
        placeholderText="Select a date"
        className="date-input"
      />
    </div>
  );
};

export default CustomDatePicker;

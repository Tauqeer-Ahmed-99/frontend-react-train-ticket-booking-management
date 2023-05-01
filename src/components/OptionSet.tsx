import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function OptionSet({
  label,
  helperText,
  options,
  value,
  width = 250,
  size = "medium",
  error,
  onChange,
}: {
  label: string;
  helperText?: string;
  options: { id: string; label: string }[];
  value: string;
  width?: number;
  size?: "small" | "medium";
  error?: boolean;
  onChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <FormControl sx={{ m: 1, minWidth: width, maxWidth: width }} size={size}>
      <InputLabel error={error} id="select-helper-label">
        {label}
      </InputLabel>
      <Select
        labelId="select-helper-label"
        id="select-helper"
        value={value}
        label={label}
        error={error}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

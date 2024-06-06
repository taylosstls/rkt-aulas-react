import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";


export default function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearDate() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return <ConfirmStep schedulingDate={selectedDateTime} onCancelConfirmation={handleClearDate} />
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}
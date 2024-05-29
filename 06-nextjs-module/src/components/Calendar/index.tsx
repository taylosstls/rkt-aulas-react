import { CaretLeft, CaretRight } from "phosphor-react";

import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "../../utils/get-week-days";

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return <CalendarContainer>
    <CalendarHeader>
      <CalendarTitle>
        Maio <span>2025</span>
      </CalendarTitle>

      <CalendarActions>
        <button><CaretLeft></CaretLeft></button>
        <button><CaretRight></CaretRight></button>
      </CalendarActions>
    </CalendarHeader>

    <CalendarBody>
      <thead>
        <tr>
          {shortWeekDays.map(weekDay => (
            <th key={weekDay}>{weekDay}.</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><CalendarDay disabled>1</CalendarDay></td>
          <td><CalendarDay>2</CalendarDay></td>
          <td><CalendarDay>3</CalendarDay></td>
        </tr>
      </tbody>
    </CalendarBody>
  </CalendarContainer>
}
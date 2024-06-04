import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles'
import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'

interface Availability {
  possibleTimes: number[],
  availableTimes: number[],
}

export default function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()

  const DateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

  useEffect(() => {
    if (!selectedDate) return

    api.get(`/users/${username}/availability`, {
      params: {
        date: dayjs(selectedDate).format('YYYY-MM-DD')
      }
    }).then(response => {
      setAvailability(response.data as Availability)
    })
  }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={DateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {DateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} - <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map(hour => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
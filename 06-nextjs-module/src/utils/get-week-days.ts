interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat('pt-br', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map(day => formatter.format(new Date(Date.UTC(2025, 3, day))),
    ).map(weekDay => {
      return short ?
        weekDay.substring(0, 3).toUpperCase() :
        weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
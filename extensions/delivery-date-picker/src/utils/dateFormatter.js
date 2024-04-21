// formats date the way that need to be stored in the metafield
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = ((date.getMonth()+1).toString()).padStart(2, '0')
  const day = (date.getDate().toString()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getDisabledDateRange = (daysCountInFuture = 2) => {
  const currentDate = new Date()
  let twoDaysFromNow = currentDate.setDate(currentDate.getDate() + daysCountInFuture) //setDate() returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC until the updated time
  twoDaysFromNow = new Date(twoDaysFromNow) // convert to date format 

  return [
    {
      start: "0001-01-01",
      end: formatDate(twoDaysFromNow),
    },
  ]

}
export { formatDate, getDisabledDateRange }


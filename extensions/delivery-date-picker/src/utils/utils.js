// formats date the way that need to be stored in the metafield
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = ((date.getMonth()+1).toString()).padStart(2, '0')
  const day = (date.getDate().toString()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Make X days into the future unselectable, here X=2 by default
// datepicker disabled props accepts date-range in array format.
const getDisabledDateRange = (daysCountInFuture = 2) => {
  const currentDate = new Date()
  let twoDaysFromNow = currentDate.setDate(currentDate.getDate() + daysCountInFuture) //setDate() returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC until the updated time
  twoDaysFromNow = new Date(twoDaysFromNow) // convert milliseconds to date format 

  return [
    {
      start: "0001-01-01",
      end: formatDate(twoDaysFromNow),
    },
  ]
}

// function to get the immediate next day, after the last disabled date 
// *** need to find a way to use this in the initial state, rather than the metafield value
const getFirstAvailableDate = (lastDisabledDate) => {
  const currentDate = new Date()
  let firstAvailableDay =  currentDate.setDate(new Date(lastDisabledDate).getDate() + 1)
  firstAvailableDay = new Date(firstAvailableDay) 
  return formatDate(firstAvailableDay) 
}

export { formatDate, getDisabledDateRange, getFirstAvailableDate }


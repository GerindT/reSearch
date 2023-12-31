export function formatDateDifference(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - givenDate;

  // Calculate the difference in days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate the difference in months
  const monthsDifference = Math.floor(daysDifference / 30);

  // Calculate the difference in years
  const yearsDifference = Math.floor(daysDifference / 365);

  // Choose the appropriate format based on the difference
  if (daysDifference === 0) {
    // If it's been less than a day, show "just a while ago"
    return "Just now";
  } else if (yearsDifference > 0) {
    // If it's been a year or more, show the original date
    return dateString;
  } else if (monthsDifference > 0) {
    // If it's been a month or more, show the difference in months
    return `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago`;
  } else {
    // Show the difference in days
    return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  }
}

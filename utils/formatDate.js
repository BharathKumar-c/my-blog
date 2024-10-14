export function formatDate(date_str) {
  const date = new Date(date_str);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
}

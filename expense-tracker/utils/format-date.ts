import { formatDistanceToNow } from "date-fns";
export default function formatDate(date: string) {
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

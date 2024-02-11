import moment from "moment";

export default function getDateDifference(date: Date): string {
  const now = moment();
  const difference = moment.duration(now.diff(date));
  var differenceString: string = "";

  const years = difference.years();
  const months = difference.months();
  const weeks = difference.weeks();
  const days = difference.days();
  const hours = difference.hours();
  const minutes = difference.minutes();

  if (years > 0) {
    const diff = Math.floor(years);
    differenceString =
      diff.toString() + (diff > 1 ? ` years` : ` year`) + " ago";
  } else if (months > 0) {
    const diff = Math.floor(months);
    differenceString =
      diff.toString() + (diff > 1 ? ` months` : ` month`) + " ago";
  } else if (weeks > 0) {
    const diff = Math.floor(weeks);
    differenceString =
      diff.toString() + (diff > 1 ? ` weeks` : ` week`) + " ago";
  } else if (days > 0) {
    const diff = Math.floor(days);
    differenceString = diff.toString() + (diff > 1 ? ` days` : ` day`) + " ago";
  } else if (hours > 0) {
    const diff = Math.floor(hours);
    differenceString =
      diff.toString() + (diff > 1 ? ` hours` : ` hour`) + " ago";
  } else if (minutes > 0) {
    const diff = Math.floor(minutes);
    differenceString =
      diff.toString() + (diff > 1 ? ` minutes` : ` minute`) + " ago";
  } else {
    differenceString = "just now";
  }

  return differenceString;
}

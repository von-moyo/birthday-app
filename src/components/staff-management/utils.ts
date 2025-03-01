export function formatDepartment(input: string): string {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatName(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function isBirthday(dateString: string): boolean {
  if (!dateString) return false;

  const today = new Date();
  const birthDate = new Date(dateString);

  return (
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate()
  );
}

export const getGridColsClass = (count: number): string => {
  const gridMap: Record<number, string> = {
    1: "!grid-cols-1",
    2: "!grid-cols-2",
    3: "!grid-cols-3",
    4: "!grid-cols-4",
    5: "!grid-cols-[1fr_2fr_1fr_2fr_1fr] 2xl:!grid-cols-[1fr_2fr_1fr_2fr_2fr]",
    6: "!grid-cols-[1.5rem_1fr_2fr_1fr_2fr_1fr] 2xl:!grid-cols-[1.5rem_1fr_2fr_1fr_2fr_2fr]",
    7: "!grid-cols-7",
    8: "!grid-cols-8",
    9: "!grid-cols-9",
    10: "!grid-cols-10",
    11: "!grid-cols-11",
    12: "!grid-cols-12",
  };
  return gridMap[count] || "grid-cols-4";
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://task-checklist.vercel.app"
    : "http://localhost:3000";

export const vulnerableDomain = "https://task-checklist.vercel.app/tryme";

export const validString = (input: string | null): input is string =>
  typeof input === "string" && input.trim().length > 0;

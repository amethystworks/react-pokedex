function getErrorMessage(data, fallback) {
  if (!data || typeof data !== "object") return fallback;
  if (data.detail) return data.detail;

  const messages = Object.entries(data).map(([field, errors]) => {
    const text = Array.isArray(errors) ? errors.join(" ") : String(errors);
    return `${field}: ${text}`;
  });

  return messages.length ? messages.join(" | ") : fallback;
}

export async function readResponse(res, fallback) {
  // DELETE answers 204 No Content, so there is no JSON to read
  const data = res.status === 204 ? null : await res.json().catch(() => null);

  // res.ok if fetched data status 200 - 299
  if (!res.ok) {
    const error = new Error(getErrorMessage(data, fallback));
    error.status = res.status;
    throw error;
  }

  return data;
}

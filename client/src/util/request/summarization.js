export const summarize = async (data) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/pegasus-large",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

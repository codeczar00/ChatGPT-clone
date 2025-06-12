const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const sendMsg = async (prompt) => {
  try {
    const res = await fetch(`${backendUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.text;
  } catch (error) {
    console.error("Error calling backend:", error);
    return "Something went wrong!";
  }
};

const request = async (url, method, body) => {
  
  if (method === "POST" && !body) return "no data in body";

  try {
    const data = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (data.status < 300) {
      return data.json();
    } else if (data.status < 400) {
      return console.warn(`Redirection Error Code ${data.status}`);
    } else if (data.status < 500) {
      return console.warn(`Client Error Code ${data.status}`);
    } else if (data.status < 600) {
      return console.warn(`Server Error Code ${data.status}`);
    }
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  basic: (method, body) => {
    return request("/basic", method, body);
  },
};

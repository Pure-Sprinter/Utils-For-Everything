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
  date: async (method, body) => {
    return await request("/date", method, body);
  },
  before: async (method, body) => {
    return await request("/before", method, body);
  },
  after: async (method, body) => {
    return await request("/after", method, body);
  },
  payment: async (method, body) => {
    return await request("/payment", method, body);
  },
  type: async (method, body) => {
    return await request("/type", method, body);
  },
  add_payment: async (method, body) => {
    return await request("/add/payment", method, body);
  },
  get_method: async (method, body) => {
    return await request("/get/payment/method", method, body);
  },
  create_method: async (method, body) => {
    return await request("/post/payment/method", method, body);
  },
  delete_method: async (method, body) => {
    return await request("/delete/payment/method", method, body);
  },
};

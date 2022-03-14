export const get = async <T>(host: string, path: string): Promise<T> => {
  const url = `${host}${path}`;
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "foo",
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    redirect: "follow" as RequestRedirect,
    mode: "cors" as RequestMode, // disables sending OPTIONS request
  };
  const response = await fetch(new Request(url, options));
  console.log(response);
  const jsonResponse = await response.text();
  console.log(jsonResponse);
  return JSON.parse(jsonResponse);
};

export const post = async <T>(
  host: string,
  path: string,
  body: object
): Promise<T> => {
  const url = `${host}${path}`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, options).then((response) => response.json());
};

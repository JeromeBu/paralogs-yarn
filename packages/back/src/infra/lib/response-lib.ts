export function success(body: unknown, statusCode = 200) {
  return buildResponse(statusCode, body);
}

export function failure(body: unknown) {
  return buildResponse(500, body);
}

function buildResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
}

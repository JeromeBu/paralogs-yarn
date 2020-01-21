export function success(body: unknown, statusCode = 200) {
  return buildResponse(statusCode, body);
}

export function failure(body: unknown, statusCode?: number) {
  return buildResponse(statusCode ?? 500, body);
}

interface HttpResponse {
  statusCode: number;
  headers: Record<string, unknown>;
  body: string;
}

function buildResponse(statusCode: number, body: unknown): HttpResponse {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
}

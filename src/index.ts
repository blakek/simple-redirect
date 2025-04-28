import * as Bun from "bun";

/** The URL parameter name used to specify the redirect target. */
const URL_PARAM = process.env.URL_PARAM || "u";

/** If true, the server will respond with a 308 Permanent Redirect. */
const USE_PERMANENT_REDIRECT = isEnvironmentVariableTruthy(
  process.env.USE_PERMANENT_REDIRECT,
  true
);

// Response for missing redirect URL
const errorResponse = new Response("No redirect URL provided", { status: 400 });

const falsyValues = new Set(["0", "false", "no", "off", "undefined"]);

/** Checks if the environment variable is truthy (has a value that's not "0", "false", "no", "off", or "undefined"). */
function isEnvironmentVariableTruthy(
  variable: string | undefined,
  fallbackIfEmpty = false
): boolean {
  if (!variable) {
    return fallbackIfEmpty;
  }

  return !falsyValues.has(variable.toLowerCase());
}

/** Creates a redirect response to the specified URL. */
function redirectTo(url: string, permanent = false): Response {
  return new Response(null, {
    status: permanent ? 308 : 307,
    headers: { Location: url },
  });
}

function handleRedirect(request: Request): Response {
  const path = new URL(request.url).pathname;

  if (path !== "/") {
    return new Response("Not Found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get(URL_PARAM);

  if (!targetUrl) {
    return errorResponse;
  }

  return redirectTo(targetUrl, USE_PERMANENT_REDIRECT);
}

const server = Bun.serve({ fetch: handleRedirect });
console.log(`Server running at http://localhost:${server.port}`);

# simple-redirect

> 🌐 A lightweight URL redirect service built with Bun.

## Overview

This project provides a simple URL redirection service. It allows users to specify a target URL via query parameters and redirects them to the specified URL. The service is designed to be lightweight and efficient, leveraging Bun for fast performance.

### Features

- Supports both temporary (307) and permanent (308) redirects.
- Configurable via environment variables.
- Minimal setup and dependencies.

## Environment Variables

The following environment variables can be used to configure the service:

| Variable                 | Description                                                                                                                                                      | Default Value |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `URL_PARAM`              | The query parameter name used to specify the redirect target.                                                                                                    | `u`           |
| `USE_PERMANENT_REDIRECT` | If `true`, the server will respond with a 308 Permanent Redirect. Otherwise, it uses 307 Temporary Redirect. Accepts values like `true`, `false`, `1`, `0`, etc. | `true`        |

## Endpoints

### `GET /`

Redirects the user to the URL specified in the query parameter.

#### Query Parameters

- **`u` (or the value of `URL_PARAM`)**: The target URL to redirect to.

#### Example Usage

```bash
curl -v "http://localhost:3000/?u=https://example.com"
```

- If `USE_PERMANENT_REDIRECT` is `true`, the response will have a status code of `308`.
- If `USE_PERMANENT_REDIRECT` is `false`, the response will have a status code of `307`.

#### Error Responses

- **400 Bad Request**: Returned if the query parameter is missing or empty.
- **404 Not Found**: Returned if the requested path is not `/`.

## Running the Project

### Prerequisites

- [Bun.sh](https://bun.sh/) >=v1.2

### Setup

1. Clone the repository:

```bash
git clone https://github.com/blakek/simple-redirect
cd simple-redirect
```

2. Install dependencies:

```bash
bun install
```

### Running the Server

To start the server:

```bash
# for production
bun start

# or with hot reloading for development
bun dev
```

The server will start and display the URL where it is running (e.g., `http://localhost:3000`).

## Running as a Container

You can run this service as a container using Docker. Below is an example `Dockerfile`:

```dockerfile
# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock /app/
RUN bun install

# Copy the source code
COPY . /app

# Expose the default port
EXPOSE 3000

# Start the server
CMD ["bun", "start"]
```

### Building and Running the Container

1. Build the Docker image:

```bash
docker build -t simple-redirect .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env URL_PARAM=u --env USE_PERMANENT_REDIRECT=true simple-redirect
```

The service will be accessible at `http://localhost:3000`.

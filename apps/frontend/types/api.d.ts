/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/hooks/sse": {
    /** @description Subscribe to server sent events */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/users": {
    /** @description Register a user */
    post: {
      requestBody: {
        content: {
          "application/json": {
            /** @description The user's name */
            readonly name: string;
            /**
             * Format: email
             * @description The user's email
             */
            readonly email: string;
            /** @description The user's password */
            readonly password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              /** @description The user's id */
              readonly id: number;
              /** @description The user's token */
              readonly token: string;
            };
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;

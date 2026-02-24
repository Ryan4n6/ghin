import { z } from 'zod'
import { schemaCacheClient } from './cache-client'
import { boolean, string } from './validation'

export const schemaClientConfig = z
  .object({
        apiAccess: boolean.optional(),
        apiVersion: string.optional(),
        baseUrl: string.optional(),
        cache: schemaCacheClient.optional(),
        password: string.optional(),
        token: string.optional(),
        username: string.optional(),
  })
  .refine(
        ({ token, username, password }) => {
                // Must provide either a pre-issued token OR username+password credentials
          if (token) return true
                return Boolean(username && password)
        },
    {
            message: 'Either provide a pre-issued "token" or both "username" and "password"',
    },
      )

export type ClientConfig = z.infer<typeof schemaClientConfig>

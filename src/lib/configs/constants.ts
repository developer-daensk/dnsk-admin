export const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
export const IS_PRODUCTION = process.env.NODE_ENV === "production"
export const IS_STAGING = process.env.IS_STAGING === "true"

export const IS_SERVER = typeof window === "undefined"
export const IS_CLIENT = typeof window !== "undefined"

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

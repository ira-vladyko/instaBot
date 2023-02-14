import * as dotenv from 'dotenv'
dotenv.config()
export const { USERNAME, PASSWORD, DEFAULT_TIMEOUT, FOLLOW_TIMEOUT } = process.env

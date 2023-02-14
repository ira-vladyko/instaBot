import { DEFAULT_TIMEOUT } from './config.js'

export const sleep = (ms = DEFAULT_TIMEOUT) => new Promise(resolve => setTimeout(resolve, ms))
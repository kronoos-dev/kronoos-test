// Dependencies
import express, { Express } from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'

// Setup app function
export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}

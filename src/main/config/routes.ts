// Dependencies
import { Express, Router } from 'express'

// Router modules
import { csvRoutes } from '../routes'

// Join app routes
export default (app: Express): void => {
  // Default router
  const router = Router()
  app.use('/api', router)
  
  // Applying module routes to default router
  csvRoutes(router)
}

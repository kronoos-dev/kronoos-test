// Dependencies
import { setupApp } from './config/app'

// Start node app
try {
  const app = setupApp()
  app.listen(3001, () => console.log(`Server running at http://localhost:3001`))
} catch (err) {
  console.error(err)
}

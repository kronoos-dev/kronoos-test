// Dependencies
import { Router } from 'express'
import multer from 'multer'
import { adaptRoute } from '../adapters'

// Controllers
import { makeCsvParserController } from '../factories'

// Define upload destination
const destination = multer({ dest: 'assets/' })

// Csv module routes
export default (router: Router): void => {
  router.post('/parse', destination.single('csv'), adaptRoute(makeCsvParserController()))
}

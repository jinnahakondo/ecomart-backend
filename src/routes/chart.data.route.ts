import {Router} from "express"
import { getChartData } from "../controllers/chart.data"


const router = Router()

// dashboard chart data 
router.get('/',getChartData)

export default  router
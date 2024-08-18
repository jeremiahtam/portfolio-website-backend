import { Router } from "express";
import path from 'path'

const router = Router();

router.get('/fetch-image/:file(*)', (req, res) => {
  let fileName = req.params.file;
  let fileLocation = path.resolve(__dirname, '../storage/projectImages/', fileName);;
  res.sendFile(`${fileLocation}`)
})
export default router;
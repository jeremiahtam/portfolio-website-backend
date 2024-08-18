import { Router } from "express";
import path from 'path'

const router = Router();

router.get('/fetch-image/:file(*)', (req, res) => {
  let fileName = req.params.file;
  let fileLocation = path.resolve(__dirname, '../storage/projectImages/', fileName);
  if (fileLocation) {
    res.status(200).sendFile(`${fileLocation}`)
  } else {
    res.status(404).send({ message: 'Could not find image' })
  }
})
export default router;
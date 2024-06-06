import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Definindo o tipo do parâmetro cb
type DestinationCallback = (error: Error | null, destination: string) => void;

// Função para criar o diretório de destino dinâmico
const destination = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: DestinationCallback,
) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const uploadPath = `./public/uploads/${year}/${month}/${day}`

  // Criar o diretório se ele não existir
  fs.mkdirSync(uploadPath, { recursive: true })

  cb(null, uploadPath)
}

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    )
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    )
    const mimeType = fileTypes.test(file.mimetype)

    if (extname && mimeType) {
      return cb(null, true)
    } else {
      cb(new Error('Only images are allowed'))
    }
  },
})

export default upload

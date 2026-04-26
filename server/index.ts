import 'dotenv/config'
import app from './app'

if (!process.env.BLIZZARD_CLIENT_ID || !process.env.BLIZZARD_CLIENT_SECRET) {
  console.warn('⚠  BLIZZARD_CLIENT_ID or BLIZZARD_CLIENT_SECRET not set in .env')
}

const PORT = Number(process.env.PORT ?? 3001)
app.listen(PORT, () => console.log(`Blizzard proxy → http://localhost:${PORT}`))

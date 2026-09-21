import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const getDatabaseUrl = () => {
  const envUrl = process.env.DATABASE_URL
  if (envUrl && !envUrl.startsWith('file:')) {
    return envUrl
  }

  const cwd = process.cwd()
  const candidates = [
    path.join(cwd, 'prisma', 'dev.db'),
    path.join(cwd, 'dev.db'),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return `file:${candidate}`
    }
  }

  return envUrl || `file:${path.join(cwd, 'dev.db')}`
}

const prismaClientSingleton = () => {
  const url = getDatabaseUrl()
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

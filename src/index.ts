import express, { Request, Response } from "express"

const app = express()

app.use('/api',routes)

export default app;
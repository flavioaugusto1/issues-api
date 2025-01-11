import express from 'express'
import z from 'zod'
import { env } from './env'

const app = express()
const PORT = 3333

app.use(express.json())

app.post('/add', async (req, res) => {
    const requestBodySchema = z.object({
        id: z.number(),
        titulo: z.string(),
        coletada: z.string(),
    })

    const { id, titulo, coletada } = requestBodySchema.parse(req.body)

    const url = 'https://api.notion.com/v1/pages'
    const data = {
        parent: {
            database_id: env.DATABASE_ID,
        },
        properties: {
            id_issue: {
                number: id,
            },
            titulo: {
                title: [
                    {
                        text: {
                            content: titulo,
                        },
                    },
                ],
            },
            coletada: {
                date: {
                    start: coletada,
                },
            },
        },
    }

    try {
        const responseNotion = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.TOKEN_NOTION}`,
                'Notion-Version': '2022-06-28',
            },
            body: JSON.stringify(data),
        })

        if (!responseNotion.ok) {
            const responseData = await responseNotion.json()
            res.status(400).json(responseData)
        }

        const responseData = await responseNotion.json()

        res.status(201).json(responseData)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log('Server is running')
})

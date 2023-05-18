import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/api/articles', (req, res) => {
    res.send([
        {
            title: `server article 1`,
            content: `Content for article goes here`
        },
        {
            title: `server article 2`,
            content: `Content for article goes here`
        },
        {
            title: `server article 3`,
            content: `Content for article goes here`
        }
    ])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
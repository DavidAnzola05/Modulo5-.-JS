import express from "express"
import pg from "pg"
import cors from "cors"

const appDAAC = express()
appDAAC.use(cors())
appDAAC.use(express.json())

const dbDAAC = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "cruddaac",
    password: "1234",
    port: 5432
})

appDAAC.get("/itemsDAAC", async (req, res) => {
    const rDAAC = await dbDAAC.query("SELECT * FROM itemsdaac")
    res.json(rDAAC.rows)
})

appDAAC.post("/itemsDAAC", async (req, res) => {
    const { nombreDAAC, precioDAAC } = req.body
    const rDAAC = await dbDAAC.query(
        "INSERT INTO itemsdaac (nombredaac, preciodaac) VALUES ($1, $2) RETURNING *",
        [nombreDAAC, precioDAAC]
    )
    res.json(rDAAC.rows[0])
})

appDAAC.put("/itemsDAAC/:idDAAC", async (req, res) => {
    const idDAAC = req.params.idDAAC
    const { nombreDAAC, precioDAAC } = req.body
    const rDAAC = await dbDAAC.query(
        "UPDATE itemsdaac SET nombredaac=$1, preciodaac=$2 WHERE iddaac=$3 RETURNING *",
        [nombreDAAC, precioDAAC, idDAAC]
    )
    res.json(rDAAC.rows[0])
})

appDAAC.delete("/itemsDAAC/:idDAAC", async (req, res) => {
    const idDAAC = req.params.idDAAC
    await dbDAAC.query("DELETE FROM itemsdaac WHERE iddaac=$1", [idDAAC])
    res.json({ eliminadoDAAC: true })
})

appDAAC.listen(4000)

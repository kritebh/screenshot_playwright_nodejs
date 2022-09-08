const express = require('express')
const { chromium } = require('playwright')
const app = express()
const fs = require('fs')

app.set('view-engine', 'ejs')
app.set('views', './views')


const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


app.get('/', (req, res) => {
    return res.render("index.ejs")
})


app.get("/screenshot", async (req, res) => {
    const url = req.query.url
    let browser = await chromium.launch();

    let page = await browser.newPage();
    await page.setViewportSize({ width: 1366, height: 768 }); //Most Popular Resolution
    await page.goto(url);
    const buffer = await page.screenshot();
    await browser.close();
    res.header('Content-Type','image/png')
    res.header('Content-Disposition','inline')
    return res.send(buffer)
})
const router = require("express").Router();
const axios = require('axios')
const cheerio = require('cheerio')

let articles = []

const urlBR = 'https://bleacherreport.com/nba'
const urlSlam = 'https://www.slamonline.com/news/'


// Bleacher report
axios(urlBR)
    .then(res => {

        const html = res.data
        const $ = cheerio.load(html)
        $('.articleSummary', html).each(function(){
            const title = $(this).find('.articleTitle').text()
            const url = $(this).find('.articleTitle').attr('href')
            const image = $(this).find('img').attr('src')
            articles.push({
                title,
                url,
                image
            })
            console.log(articles)
        })
    }).catch(err=>console.log(err))

//Slam
//Duplicate code. Needs to be improved
//Find a way to pass html selectors depending on the website

axios(urlSlam)
    .then(res => {

        const html = res.data
        const $ = cheerio.load(html)
        $('.blog-post-vert', html).each(function(){
            const title = $(this).find('h3').text()
            const url = $(this).find('a').attr('href')
            let image = $(this).find('a').attr('data-bg')
            image = image.substring(4) //removes first characters 'url('
            image = image.slice(0, -1); //removes last character ')'
            articles.push({
                title,
                url,
                image
            })
            console.log(articles)
        })
    }).catch(err=>console.log(err))

router.get("/", (req, res) => {
        try{
            res.json(articles)
        }catch (err) {
            (err => { res.status(500).send({message: "Error couldn't retrieve site news"})})
        }
    
    });

module.exports = router;

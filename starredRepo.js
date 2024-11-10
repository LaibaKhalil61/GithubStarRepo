import dotenv from 'dotenv'
import { Octokit } from '@octokit/core'
import fs from "fs"

// Setting up the API token
dotenv.config();
const api_token = process.env.GITHUB_API_TOKEN;

// Helper Functions
const printError = ()=>{
    const msg = `node <FILENAME> [START_DATE] [END_DATE]

    Optional Arguments :
    START_DATE : YYYY-MM-DD format (default : month ago)
    END_DATE : YYYY-MM-DD format (default : today)

    EXAMPLES :
    node newfile 2024-05-19 2024-05-23
    `
    console.log(msg)
    process.exit(1);
}
const validate_date = (dateString)=>{
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if(!regex.test(dateString)){
        printError();
    }
    const date = new Date(dateString);
    if(!date){
        printError();
    }
}
// Getting the current Date and months ago date

const date = new Date();
const current_date = new Date().toISOString().split('T')[0];
date.setMonth(date.getMonth() - 1);
const month_ago_date = date.toISOString().split('T')[0];

// Setting the start and end date 
let start_date;
let end_date;
if (process.argv[2] && !process.argv[3]) {
    validate_date(process.argv[2]);
    start_date = process.argv[2];
    end_date = current_date;
}
else if (!process.argv[2] && !process.argv[3]) {
    start_date = month_ago_date;
    end_date = current_date;
}
else if (process.argv[4]) {
    printError();
}
else {
    validate_date(process.argv[2]);
    validate_date(process.argv[3]);
    start_date = process.argv[2];
    end_date = process.argv[3];
}
// Fetching data from API and storing it in a file
const octokit = new Octokit({
    auth: api_token,
})
await octokit.request('GET /search/repositories', {
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    },
    q: `created:${start_date}..${end_date}`,
    sort: 'stars',
    order: 'desc',
    per_page: 10,
}).then((res) => {
    if (res.data.items.length >= 1) {
        const items = res.data.items;
        const list = items.map((item) => {
            return (`
                ID : ${item.id}
                Name : ${item.name}
                Url : ${item.html_url}
                Description : ${item.description}
                Stars : ${item.stargazers_count}
                ---------------------------------
                `);

        }).join("\n");
        fs.writeFile("./githubRepos", list, (err) => {
            if(err)
            console.log("Error : "+ err.message)
            else
            console.log("File written successfully")
        })
    }
    else
        console.log("Could not find any repository")
}).catch((err) => {
    console.log("Something broke , ERROR : ", err.message)
})
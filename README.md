# GitHubStarRepo

A command-line application that retrieves and displays the most starred GitHub projects within a specified date range. This tool allows users to discover popular repositories by providing optional start and end dates. If no dates are provided, it retrieves the top starred projects for the past month by default.

## Features

- Accepts optional **start** and **end dates** to define a custom date range.
- Displays a list of the most starred GitHub projects in the given timeframe.
- Utilizes **GitHub's Search API** to fetch and filter repository data based on stars.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LaibaKhalil61/GithubStarRepo.git
   cd GithubStarRepo
   ```
2. Install dependencies:
```bash
  npm install
```
3.Usage
Run the application with the following command:

```bash
node starredRepo.js <Filename> [START_DATE] [END_DATE]
```
- START_DATE and END_DATE should be in YYYY-MM-DD format.
- If no dates are provided, the app will fetch the most starred projects for the last 30 days.
## Dependencies

- Node.js: JavaScript runtime
- Axios or Fetch API: For making HTTP requests to GitHub’s API

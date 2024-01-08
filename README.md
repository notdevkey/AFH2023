# SaveSome

🥉3rd place in Alternative Fuels hackathon 2023

A standard that finally lets you act upon the data and analytics from energy consumption that comes from different IoT hardware integrations, NordPool, and more. Build advanced action flows and have complete control over energy automation for any device, and get health reports and suggestions for your system.

## Running the project

### 1. Clone the repo
```
git clone https://github.com/notdevkey/AFH2023.git
```
### 2. Install dependencies
```
pnpm install
```
### 3. Install NX CLI
```
pnpm i -g nx
```
### 4. Run the frontend
```
nx dev www
```
### 5. Run the API (NordPool scraper)
```
cd apps/nordpool
docker build -t nordpool-api .
docker run nordpool-api
```

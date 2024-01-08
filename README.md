# SaveSome

🥉**3rd place in Alternative Fuels hackathon 2023**

![image](https://github.com/notdevkey/AFH2023/assets/66126144/424ced5a-2757-440b-86e2-293d22753ee0)

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

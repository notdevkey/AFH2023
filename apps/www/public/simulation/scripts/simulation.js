class Simulation {
    constructor() {
        this.interval = null;

        this.electricityPrice = 0.16;

        // Energy hub variables
        this.energyProduced = 0;
        this.energyUsed = 0;
        this.energyTotal = 0;
        this.eurIncome = 0;
        this.eurExpenses = 0;

        // Min - max consumption values in watts
        // Wind
        this.consumptionWind = 0;
        this.minConsumptionWind = 10000;
        this.maxConsumptionWind = 15000;
        this.allowanceWind = 800;
        this.numberOfWindTurbines = 3;
        this.randomizerBaseWind = 0;

        // Solar
        this.consumptionSolar = 0;
        this.minConsumptionSolar = 100;
        this.maxConsumptionSolar = 300;
        this.allowanceSolar = 80;
        this.numberOfSolarPanels = 80;
        this.randomizerBaseSolar = 0

        // Crane
        this.consumptionCrane = 0;
        this.minConsumptionCrane = 45000;
        this.maxConsumptionCrane = 55000;
        this.allowanceCrane = 5000;
        this.numberOfCranes = 1;
        this.randomizerBaseCrane = 0;

        // Trucks
        this.consumptionTrucks = 0;
        this.minConsumptionTrucks = 800;
        this.maxConsumptionTrucks = 830;
        this.allowanceTrucks = 30;
        this.numberOfTrucks = 3;
        this.randomizerBaseTrucks = 0;

        // Office
        this.consumptionOffice = 0;
        this.minConsumptionOffice = 3000;
        this.maxConsumptionOffice = 8000;
        this.allowanceOffice = 800;
        this.numberOfOffice = 1;
        this.randomizerBaseOffice = 0;

    }

    wattsToMegaWatts(watts, round = 100)
    {
        let mw = watts / 1000000;
        return Math.round(mw * round) / round;
    }
    roundEUR(eur, round = 100) {
        return Math.round(eur * round) / round;
    }

    getRandomNumber(min, max) {
        // find diff
        let difference = max - min;
        // generate random number
        let rand = Math.random();
        // multiply with difference
        rand = Math.floor( rand * difference);
        // add with min value
        rand = rand + min;

        return rand;
    }

    getRandomNumberWithAllowance(n, a) {
        let min = n - a;
        let max = n + a;

        return this.getRandomNumber(min, max);
    }


    initialize() {
        this.initializeRandomizerBaseWind();
        this.initializeRandomizerBaseSolar();
        this.initializeRandomizerBaseCrane();
        this.initializeRandomizerBaseTrucks();
        this.initializeRandomizerBaseOffice();

        this.initializeSimulation();
    }

    // Initialize simulation
    initializeSimulation() {
        let sim = this;
        this.interval = setInterval(function () { sim.update(); }, 1000);
    }

    update() {
        this.updateWindConsumption();
        this.updateSolarConsumption();
        this.updateCraneConsumption();
        this.updateTrucksConsumption();
        this.updateOfficeConsumption();
        this.updateHubConsumption();
    }

    // Initialize randomizers 
    initializeRandomizerBaseWind()
    {
        this.randomizerBaseWind = this.getRandomNumber(this.minConsumptionWind, this.maxConsumptionWind);
    }
    
    initializeRandomizerBaseSolar()
    {
        this.randomizerBaseSolar = this.getRandomNumber(this.minConsumptionSolar, this.maxConsumptionSolar);
    }

    initializeRandomizerBaseCrane()
    {
        this.randomizerBaseCrane = this.getRandomNumber(this.minConsumptionCrane, this.maxConsumptionCrane);
    }

    initializeRandomizerBaseTrucks()
    {
        this.randomizerBaseTrucks = this.getRandomNumber(this.minConsumptionTrucks, this.maxConsumptionTrucks);
    }

    initializeRandomizerBaseOffice()
    {
        this.randomizerBaseOffice = this.getRandomNumber(this.minConsumptionOffice, this.maxConsumptionOffice);
    }

    updateWindConsumption()
    {
        let u = this.getRandomNumberWithAllowance(this.randomizerBaseWind, this.allowanceWind) * this.numberOfWindTurbines;
        this.consumptionWind = this.consumptionWind + u;
        $("#wind").html(this.wattsToMegaWatts(this.consumptionWind));

        return u;
    }

    updateSolarConsumption()
    {
        let u = this.getRandomNumberWithAllowance(this.randomizerBaseSolar, this.allowanceSolar) * this.numberOfSolarPanels;
        this.consumptionSolar = this.consumptionSolar + u;
        $("#solar").html(this.wattsToMegaWatts(this.consumptionSolar));

        return u;
    }

    updateCraneConsumption()
    {
        let u = this.getRandomNumberWithAllowance(this.randomizerBaseCrane, this.allowanceCrane) * this.numberOfCranes;
        this.consumptionCrane = this.consumptionCrane + u;
        $("#crane").html(this.wattsToMegaWatts(this.consumptionCrane));

        return u;
    }

    updateTrucksConsumption()
    {
        let u = this.getRandomNumberWithAllowance(this.randomizerBaseTrucks, this.allowanceTrucks) * this.numberOfTrucks;
        this.consumptionTrucks = this.consumptionTrucks + u;
        $("#trucks").html(this.wattsToMegaWatts(this.consumptionTrucks, 100));

        return u;
    }

    updateOfficeConsumption()
    {
        let u = this.getRandomNumberWithAllowance(this.randomizerBaseOffice, this.allowanceOffice) * this.numberOfOffice;
        this.consumptionOffice = this.consumptionOffice + u;
        $("#office").html(this.wattsToMegaWatts(this.consumptionOffice, 100));

        return u;
    }

    updateHubConsumption() {
        this.energyProduced = this.consumptionWind + this.consumptionSolar;
        $("#produced").html(this.wattsToMegaWatts(this.energyProduced));

        this.energyUsed = this.consumptionCrane + this.consumptionTrucks + this.consumptionOffice;
        $("#used").html(this.wattsToMegaWatts(this.energyUsed));

        this.energyTotal = this.energyProduced - this.energyUsed;
        $("#energyTotal").html(this.wattsToMegaWatts(this.energyTotal, 100));

        if (this.energyTotal < 0)
        {
            this.eurIncome = 0;
            $("#income").html("0");

            this.eurExpenses = this.energyTotal / 1000;
            this.eurExpenses = this.eurExpenses * parseFloat(this.electricityPrice) * -1;
            $("#expenses").html(this.roundEUR(this.eurExpenses));
        }
        else
        {
            this.eurExpenses = 0;
            $("#expenses").html("0");

            this.eurIncome = this.energyTotal / 1000;
            this.eurIncome = this.eurIncome * parseFloat(this.electricityPrice);
            $("#income").html(this.roundEUR(this.eurIncome));
        }
    }
}


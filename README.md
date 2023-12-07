# Comp 3451 || PP4
## Dominic Mayhew || T00688238
### December 7, 2023

# Accessing the Prototype

The prototype is hosted at [http://simplicious.dominicmayhew.ca](http://simplicious.dominicmayhew.ca) using an S3 bucket and CNAME record. If you wish to build and run the application locally, you need `npm` and the Angular CLI (`ng`).

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200` in a browser to see use the prototype.

# Improvements from the low-fidelity prototype

The process/flow has been simplified and naming of process steps have been made more clear.  "Meals" and "Templates" were confusing terms, so they have been renamed "Recipes" and "Routines". Additionally, "Plan" does not exist anymore. Eventually it will be encorporated into the "generate shopping list" step.

# Prototype limitations

There are several functionalities required by an actual product that are missing in this prototype:
1. Users cannot create a profile and have their actions remembered. Each time you reload the page you start from scratch.
1. There is no ability to plan for specific dates.
1. There is no ability to see (at a glance) which recipes are included in the shopping list. You must mouse over each ingredient to see what recipes are included.

Due to this being a prototype, I had to limit scope and not include the above features. I chose instead to implement most of the core workflow to test if it is usable and useful.
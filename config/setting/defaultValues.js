const defaultRegion = {  latitude: 37.68,  longitude: -122.11,  latitudeDelta: 0.01,  longitudeDelta: 0.01};const defaultColorTheme = {  appBackgroundColor: "#0f6b79"};const loadingImages = [  require("../../src/assets/images/catFace1.png"),  require("../../src/assets/images/dogFace1.png")];//[name in database, name display]const petDetailFieldList = [  ["status", "status"],  ["adoptionFee", "fee"],  ["sex", "sex"],  ["age", "age"],  ["size", "size"],  ["birthdate", "birthday"],  ["weight", "weight"],  ["mix", "mix"],  ["altered", "altered"],  ["coatLenght", "coat length"],  ["courtesy", "courtesy"],  ["declawed", "declawed"],  ["rescueID", "rescueID"],  ["species", "species"],  //breed  ["breed", "breed"],  ["primaryBreed", "primaryBreed"],  ["secondaryBreed", "secondaryBreed"],  //body  ["shedding", "shedding"],  ["sizeCurrent", "current size"],  ["sizePotential", "potential size"],  ["tailType", "tail type"],  //character  ["protective", "protective"],  ["obedient", "obedient"],  ["playful", "playful"],  ["playsToys", "plays toys"],  ["predatory", "predatory"],  ["timid", "timid"],  ["drools", "drools"],  ["eagerToPlease", "eager to please"],  ["earType", "ear type"],  ["groomingNeeds", "needs grooming"],  ["hasAllergies", "has allergies"],  ["independent", "independent"],  ["intelligent", "intelligent"],  ["energyLevel", "energy level"],  ["hearingImpaired", "hearing impaired"],  ["hypoallergenic", "hypoallergenic"],  ["escapes", "escapes"],  ["eventempered", "eventempered"],  ["exerciseNeeds", "exercise needs"],  ["fence", "fence"],  ["fetches", "fetches"],  ["gentle", "gentle"],  ["goodInCar", "good in car"],  ["goofy", "goofy"],  ["kids", "kids"],  ["lap", "lap"],  ["messagePet", "message pet"],  ["needsFoster", "needs foster"],  //color  ["color", "color"],  ["eyeColor", "eyeColor"],  ["pattern", "color pattern"],  //found  ["found", "found"],  ["foundDate", "foundDate"],  ["foundZipcode", "foundZipcode"],  //train  ["ownerExperience", "owner experience"],  ["housetrained", "house trained"],  ["leashtrained", "leash trained"],  ["obedienceTraining", "obedience training"],  //be aware  ["specialDiet", "special diet"],  ["specialNeeds", "special needs"],  ["yardRequired", "needs yard"],  //with others  ["newPeople", "newPeople"],  ["noCold", "noCold"],  ["noFemaleDogs", "noFemaleDogs"],  ["noHeat", "noHeat"],  ["noLargeDogs", "noLargeDogs"],  ["noMaleDogs", "noMaleDogs"],  ["noSmallDogs", "noSmallDogs"],  ["oKForSeniors", "oKForSeniors"],  ["oKWithAdults", "oKWithAdults"],  ["oKWithFarmAnimals", "oKWithFarmAnimals"],  ["ownerExperience", "ownerExperience"],  ["sightImpaired", "sightImpaired"],  ["skittish", "skittish"],  ["swims", "swims"]];const orgDetailFieldList = [  ["name", "name"],  ["status", "status"],  ["address", "address"],  ["city", "city"],  ["state", "state"],  ["zip", "zip"],  ["phone", "phone"],  ["email", "email"],  ["fax", "fax"],  ["facebookUrl", "facebookUrl"],  ["orgType", "org Type"],  ["orgurl", "website"],  ["orgSpecies", "Species"],  ["serveAreas", "serve Areas"],  ["services", "services"],  ["meetPets", "meet Pets"],  ["adoptionProcess", "adoption Process"],  ["about", "about"]];export {  defaultRegion,  defaultColorTheme,  loadingImages,  petDetailFieldList,  orgDetailFieldList,};
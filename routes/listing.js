const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing, saveRedirectUrl} = require("../middleware.js")
const multer = require("multer")
const {storage} = require("../cloudConfig.js") 
const upload = multer({storage});



const listingController = require("../controllers/listings.js")

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
  
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
);


//New listings adding by this route
router.get("/new",isLoggedIn,listingController.renderNewFrom)

router.route("/:id")
.get(wrapAsync(listingController.showListing)
)
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn,isOwner,listingController.derstroyListing)
//Index Route



/// Here always pick new route above the show route then only this render
//Show route



//Create route


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Update after the edit then the update req is using this 


//Delete route


module.exports = router
const Form = require("../models/Form")

const asyncHandler = require("express-async-handler")
// for password handling, not used right now
// const bcrypt = require("bcrypt")

//@desc get all workouts
// @route GET /workouts
// @access Private
const getAllForms = asyncHandler(async (req, res) => {
    const forms = await Form.find().lean()
    if (!forms) {
        return res.status(400).json({message:"No forms found"})
    }
    res.json(forms)
})

const getSpecificFormById = asyncHandler (async (req,res) => {
    let formId = req.params.formId || {}
    let form = await Form.find({_id:formId}).lean()
    if (!form){
        return res.status(400).json({message:"form id not found"})
    }
    res.json(form)
})

//@desc create new workout
// @route POST /workouts
// @access Private
const createNewForm = asyncHandler(async (req, res) => {
    const {rating, text, movieName} = req.body

    if (!rating || !text || !movieName){
        console.log(rating, text, movieName)
        return res.status(400).json({message:"All fields are required"})
    }
    // duplicate checker would go here via Workout.findOne({feild}).lean().exec() but not neccessary for me right now
    // bcrypt would be used for password 
    const formObject = {rating, text, movieName}
    //create and store workout
    const form = await Form.create(formObject)
    if (form){
        res.status(201).json({message:`${form._id}`})
    }else{
        res.status(400).json({message:"invalid workout data"})
    }
})

module.exports = {
    getAllForms,
    createNewForm,
    getSpecificFormById
}
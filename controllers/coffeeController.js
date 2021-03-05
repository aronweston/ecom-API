import mongoose from 'mongoose';
import colors from 'colors';
import asyncHandler from 'express-async-handler';
import Coffee from '../models/Coffee.js';
import Roaster from '../models/Roaster.js';

// @desc  READ: Get all coffee
// @route GET /coffee
// @access PUBLIC

export const getAllCoffee = asyncHandler(async (req, res) => {
  try {
    const coffee = await Coffee.find({});
    if (coffee) res.json(coffee);
  } catch (error) {
    console.log('GET /coffee'.red.inverse, error);
    res.status(404);
    throw new Error('coffee not found');
  }
});

// @desc  READ: Get a specific roaster
// @route GET /coffee/:id
// @access PUBLIC

export const getCoffeeById = asyncHandler(async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    if (coffee) res.json(coffee);
  } catch (error) {
    console.log('GET /coffees/:id'.red.inverse, error);
    res.status(404);
    throw new Error('coffee not found');
  }
});

// @desc  CREATE: Create a coffee
// @route POST /coffee
// @access PRIVATE
export const createCoffee = asyncHandler(async (req, res) => {
  try {
    const { title, price, roaster } = req.body;

    const coffee = await Coffee.create({
      title,
      price,
      roaster,
    });

    if (coffee) {
      res.status(201).json({
        _id: coffee.id,
        title: coffee.title,
        price: coffee.price,
        roaster: coffee.roaster,
      });

      const getRoaster = await Roaster.findById(roaster);
      getRoaster.coffee.push({
        _id: coffee.id,
        title: coffee.title,
        price: coffee.price,
      });
      getRoaster.save();
      console.log(getRoaster);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// //@desc UPDATE: Update a specific roaster
// //@route PUT /roaster/update
// //@access PRIVATE

// export const updateRoaster = asyncHandler(async (req, res) => {
//   try {
//     const roaster = await Roaster.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     res.json(roaster);
//     console.log(`PUT /roasters/${req.params.id}`.green.inverse);
//   } catch (error) {
//     console.log('PUT /roasters/:id'.red.inverse, error);
//     res.status(404);
//     throw new Error('Roaster not found');
//   }
// });

// //@desc UPDATE: Update a specific roaster
// //@route PUT /roaster/update
// //@access PRIVATE
// export const removeRoaster = asyncHandler(async (req, res) => {
//   try {
//     await Roaster.findByIdAndDelete({ _id: req.params.id });
//     res.json('Roaster removed');
//     console.log(`DELETE /roasters/${req.params.id}`.green.inverse);
//   } catch (error) {
//     console.log('DELETE /roasters/:id'.red.inverse, error);
//     res.status(404);
//     throw new Error('Roaster not found');
//   }
// });
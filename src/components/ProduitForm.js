// components/ProduitForm.js
import React, { useState, useEffect } from 'react';
import { useProduit } from '../context/ProduitContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const ProduitForm = ({ produit, onSuccess, onCancel }) => {
  


  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
     
        <div className="relative aspect-[2/3]">
          <img
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      
     
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">VIN</h1>
        <p className="text-sm text-gray-500">VIN</p>
        
        <div className="flex items-center gap-4 text-xs">
        
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              
            >
              
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              
                <div
                  className={`cursor-pointer border-1 rounded-full p-[1.2px]`}
                 
                  
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    
                  />
                </div>
              
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between">
          <p className="font-medium">676MGA</p>
          <button
            
            className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduitForm;
package com.PAF_Assignment.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.cakeRecipe;
import com.PAF_Assignment.demo.Repository.cakeRecipeRepo;



@RestController
@RequestMapping
@CrossOrigin

public class cakeRecipeController {

@Autowired
cakeRecipeRepo cakeRecipeRepo;

    @PostMapping("/addUser")
    public void addcakeRecipe(@RequestBody cakeRecipe user) {
        cakeRecipeRepo.save(user);
        
    }

    // Removed unused private save method
        
    
    
    

}

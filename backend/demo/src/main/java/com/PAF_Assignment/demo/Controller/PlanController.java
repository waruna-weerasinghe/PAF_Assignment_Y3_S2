package com.PAF_Assignment.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.Plan;

import com.PAF_Assignment.demo.Repository.PlanRepo;

@RestController
@RequestMapping
@CrossOrigin
public class PlanController {

    @Autowired
    PlanRepo planRepo;

     @PostMapping("/addPlan")
    public void addUser(@RequestBody Plan plan) {
        planRepo.save(plan);
        
    }
    @GetMapping("/getPlan/{id}")
    public Plan getUser(@PathVariable Integer id) {

        return planRepo.findById(id).orElse(null);
        
    }
    @GetMapping("/getAllPlans")
    public List<Plan> getAllPlans() {

        return planRepo.findAll();
        
    }
    @PutMapping("/UpdatePlan")
    public void UpdatePlan(@RequestBody Plan plan) {
        Plan data = planRepo.findById(plan.getId()).orElse(null);
        System.out.println(data);
        //check if null
        if(data != null) 
        {
            data.setRname(plan.getRname());
            data.setIngredients(plan.getIngredients());
            data.setCategory(plan.getCategory());
            planRepo.save(data);
        }
    }

    @DeleteMapping("/deletePlan/{id}")
    public void DeletePlan(@PathVariable Integer id) {
        planRepo.deleteById(id);
        
    }

}

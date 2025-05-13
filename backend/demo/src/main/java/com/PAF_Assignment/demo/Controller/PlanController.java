package com.PAF_Assignment.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.PAF_Assignment.demo.Model.Plan;
import com.PAF_Assignment.demo.Repository.PlanRepo;

@RestController
@RequestMapping
@CrossOrigin
public class PlanController {

    @Autowired
    Plan planRepo;

    // Add a new Plan
    @PostMapping("/addPlan")
    public void addPlan(@RequestBody Plan plan) {
        planRepo.save(plan);
    }

    // Get a Plan by ID
    @GetMapping("/getPlan/{id}")
    public Plan getPlan(@PathVariable String id) {
        return planRepo.findById(id).orElse(null);
    }

    // Get all Plans
    @GetMapping("/getAllPlans")
    public List<Plan> getAllPlans() {
        return planRepo.findAll();
    }

    // Update a Plan
    @PutMapping("/UpdatePlan")
    public void updatePlan(@RequestBody Plan plan) {
        Optional<Plan> optionalPlan = planRepo.findById(plan.getId());
        if (optionalPlan.isPresent()) {
            Plan data = optionalPlan.get();
            data.setRname(plan.getRname());
            data.setIngredients(plan.getIngredients());
            data.setCategory(plan.getCategory());
            planRepo.save(data);
        }
    }

    // Delete a Plan
    @DeleteMapping("/deletePlan/{id}")
    public void deletePlan(@PathVariable String id) {
        planRepo.deleteById(id);
    }
}

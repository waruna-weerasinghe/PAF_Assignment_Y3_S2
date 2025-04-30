package com.PAF_Assignment.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PAF_Assignment.demo.Model.Plan;

public interface PlanRepo extends MongoRepository<Plan, Integer> {

}

package com.prepareutsreactjavaserver.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prepareutsreactjavaserver.demo.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}

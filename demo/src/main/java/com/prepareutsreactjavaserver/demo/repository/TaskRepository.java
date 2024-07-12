package com.prepareutsreactjavaserver.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepareutsreactjavaserver.demo.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

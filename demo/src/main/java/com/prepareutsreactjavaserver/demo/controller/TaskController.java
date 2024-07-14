package com.prepareutsreactjavaserver.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prepareutsreactjavaserver.demo.models.Task;
import com.prepareutsreactjavaserver.demo.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Object getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        return task != null ? task : "Tugas dengan ID " + id + " tidak ditemukan.";
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            Task updatedTask = task.get();
            updatedTask.setTitle(taskDetails.getTitle());
            updatedTask.setDescription(taskDetails.getDescription());
            updatedTask.setStatus(taskDetails.getStatus());
            return ResponseEntity.ok(taskRepository.save(updatedTask));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping()
    public String updateTask2(@RequestBody Task taskDetails) {
        taskRepository.save(taskDetails);
        return "Tugas berhasil diperbarui.";
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return "Kandidat berhasil dihapus.";
    }
}
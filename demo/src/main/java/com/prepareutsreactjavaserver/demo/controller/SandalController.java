package com.prepareutsreactjavaserver.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.prepareutsreactjavaserver.demo.models.Sandal;
import com.prepareutsreactjavaserver.demo.repository.SandalRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sandals")
public class SandalController {

    @Autowired
    private SandalRepository sandalRepository;

    // Get All Data
    @GetMapping
    public List<Sandal> getAllSandals() {
        return sandalRepository.findAll();
    }

    // Create Data
    @PostMapping
    public Sandal createSandal(@RequestBody Sandal sandal) {
        return sandalRepository.save(sandal);
    }

    // @PutMapping
    // public Sandal updateById(@RequestBody Sandal sandal) {
    // return sandalRepository.save(sandal);
    // }

    // Update Data
    @PutMapping("/{id}")
    public Sandal updateSandal(@PathVariable Long id, @RequestBody Sandal sandalDetails) {
        return sandalRepository.findById(id)
                .map(sandal -> {
                    sandal.setName(sandalDetails.getName());
                    sandal.setPrice(sandalDetails.getPrice());
                    sandal.setImg(sandalDetails.getImg());
                    sandal.setDescription(sandalDetails.getDescription());
                    sandal.setStatus(sandalDetails.isStatus());
                    return sandalRepository.save(sandal);
                })
                .orElseThrow(() -> new RuntimeException("Sandal not found with id " + id));
    }

    // Delete Data
    @DeleteMapping("/{id}")
    public void deleteSandal(@PathVariable Long id) {
        sandalRepository.deleteById(id);
    }
}

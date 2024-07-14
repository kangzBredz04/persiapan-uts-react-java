package com.prepareutsreactjavaserver.demo.models;

import lombok.*;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sandals")
public class Sandal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String img;
    private String description;
    private boolean status; // Example field for sorting
}

package com.busboardingseqgenerator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {
    @Id
    private Long bookingId;

    @ElementCollection
    private List<String> seats;

    private String username; // To track who made the booking

}



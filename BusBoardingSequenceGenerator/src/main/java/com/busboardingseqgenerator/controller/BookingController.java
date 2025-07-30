package com.busboardingseqgenerator.controller;

import com.busboardingseqgenerator.entity.Booking;
import com.busboardingseqgenerator.repository.BookingRepository;
import com.busboardingseqgenerator.repository.UserRepository;
import com.busboardingseqgenerator.service.BoardingService;
import com.busboardingseqgenerator.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {
    @Autowired private BookingRepository bookingRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private BoardingService service;
    @Autowired private BookingService bservice;

    @PostMapping("/add")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        if (!userRepo.findByUsername(booking.getUsername()).isPresent()) {
            return ResponseEntity.status(401).body("User not logged in");
        }
        return ResponseEntity.ok(bookingRepo.save(booking));
    }

    @GetMapping("/sequence")
    public List<Booking> getBoardingSequence() {
        return service.getBoardingOrder(bookingRepo.findAll());
    }
    
    @GetMapping("/sorted")
    public List<Map<String, Object>> getSortedBookings() {
        return bservice.getSortedBookings();
    }
}

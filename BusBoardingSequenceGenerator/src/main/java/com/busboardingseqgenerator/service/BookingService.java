package com.busboardingseqgenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busboardingseqgenerator.entity.Booking;
import com.busboardingseqgenerator.repository.BookingRepository;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Method to get sorted bookings based on seat distance (for optimal boarding sequence)
    public List<Map<String, Object>> getSortedBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        List<Map<String, Object>> processed = bookings.stream().map(b -> {
        	List<String> seatList = b.getSeats().stream()
        		    .map(String::trim)
        		    .collect(Collectors.toList());
            // Compute the farthest seat number for each booking
            int maxDistance = seatList.stream()
                    .mapToInt(this::getSeatDistance)
                    .max()
                    .orElse(0);

            Map<String, Object> map = new HashMap<>();
            map.put("bookingId", b.getBookingId());
            map.put("maxDistance", maxDistance);
            return map;
        }).collect(Collectors.toList());

        // Sort: farthest seat first, then booking ID if tie
        return processed.stream()
                .sorted(
                    Comparator.comparingInt((Map<String, Object> m) -> (int) m.get("maxDistance"))
                            .reversed()
                            .thenComparingLong(m -> ((Long) m.get("bookingId")))
                )
                .collect(Collectors.toList());
    }

    // Helper to extract numeric seat distance (e.g., A12 → 12)
    private int getSeatDistance(String seat) {
        String numberPart = seat.replaceAll("[^0-9]", "");
        return numberPart.isEmpty() ? 0 : Integer.parseInt(numberPart);
    }
}

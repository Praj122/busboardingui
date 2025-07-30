package com.busboardingseqgenerator.service;

import com.busboardingseqgenerator.entity.Booking;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BoardingService {
    public List<Booking> getBoardingOrder(List<Booking> bookings) {
        return bookings.stream()
                .sorted(Comparator
                        .comparingInt((Booking b) -> b.getSeats().stream()
                            .mapToInt(this::seatDistance)
                            .min().orElse(Integer.MAX_VALUE))
                        .thenComparing(Booking::getBookingId))
                .collect(Collectors.toList());
    }

    private int seatDistance(String seat) {
        String digits = seat.replaceAll("[^0-9]", "");
        return digits.isEmpty() ? Integer.MAX_VALUE : Integer.parseInt(digits);
    }
}

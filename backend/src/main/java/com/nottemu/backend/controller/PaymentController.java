package com.nottemu.backend.controller;

import com.nottemu.backend.dto.PaymentRequest;
import com.nottemu.backend.model.Payment;
import com.nottemu.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public Payment create(@RequestBody PaymentRequest request) {
        return paymentService.create(request);
    }

    @GetMapping
    public List<Payment> getAll() {
        return paymentService.getAll();
    }

    @GetMapping("/{id}")
    public Payment getById(@PathVariable Long id) {
        return paymentService.getById(id);
    }
}
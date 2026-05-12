package com.nottemu.backend.service;

import com.nottemu.backend.dto.PaymentRequest;
import com.nottemu.backend.model.Order;
import com.nottemu.backend.model.Payment;
import com.nottemu.backend.repository.OrderRepository;
import com.nottemu.backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public Payment create(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = Payment.builder()
                .order(order)
                .method(request.getMethod())
                .status("PAID")
                .transactionId(request.getTransactionId())
                .cardLast4(request.getCardLast4())
                .cardBrand(request.getCardBrand())
                .walletProvider(request.getWalletProvider())
                .build();

        order.setStatus("PAID");
        orderRepository.save(order);

        return paymentRepository.save(payment);
    }

    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    public Payment getById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
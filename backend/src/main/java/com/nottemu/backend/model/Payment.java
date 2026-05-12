package com.nottemu.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String method;
    // credit_card or mobilepay

    private String status;
    // pending, paid, failed

    private String transactionId;

    private String cardLast4;

    private String cardBrand;

    private String walletProvider;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
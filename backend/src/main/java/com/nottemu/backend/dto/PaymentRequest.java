package com.nottemu.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private Long orderId;
    private String method;

    private String transactionId;

    private String cardLast4;
    private String cardBrand;

    private String walletProvider;
}
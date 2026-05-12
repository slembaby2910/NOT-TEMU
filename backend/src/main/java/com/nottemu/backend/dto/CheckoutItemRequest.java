package com.nottemu.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutItemRequest {
    private Long productId;
    private Integer quantity;
}
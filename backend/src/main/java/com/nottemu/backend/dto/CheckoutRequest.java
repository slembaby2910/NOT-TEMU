package com.nottemu.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheckoutRequest {
    private Long userId;
    private List<CheckoutItemRequest> items;
}
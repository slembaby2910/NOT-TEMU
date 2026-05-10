package com.nottemu.backend.controller;

import com.nottemu.backend.dto.StockCheckRequest;
import com.nottemu.backend.dto.StockUpdateRequest;
import com.nottemu.backend.model.Product;
import com.nottemu.backend.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class StockController {

    private final CatalogService productService;

    @GetMapping("/{productId}")
    public Integer getStock(@PathVariable Long productId) {
        Product product = productService.getById(productId);
        return product.getStockQuantity();
    }

    @PatchMapping("/{productId}")
    public Product updateStock(
            @PathVariable Long productId,
            @RequestBody StockUpdateRequest request) {
        Product product = productService.getById(productId);

        product.setStockQuantity(request.getQuantity());

        return productService.create(product);
    }

    @PostMapping("/check")
    public String checkStock(@RequestBody StockCheckRequest request) {

        Product product = productService.getById(request.getProductId());

        if (product.getStockQuantity() >= request.getQuantity()) {
            return "Stock available";
        }

        return "Insufficient stock";
    }
}
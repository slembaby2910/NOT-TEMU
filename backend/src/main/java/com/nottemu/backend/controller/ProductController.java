package com.nottemu.backend.controller;

import com.nottemu.backend.model.Product;
import com.nottemu.backend.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final CatalogService catalogService;

    @PostMapping
    public Product create(@RequestBody Product product) {
        return catalogService.create(product);
    }

    @GetMapping
    public List<Product> getAll() {
        return catalogService.getAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return catalogService.getById(id);
    }

    @PutMapping("/{id}")
    public Product update(
            @PathVariable Long id,
            @RequestBody Product product) {
        return catalogService.update(id, product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        catalogService.delete(id);
    }
}
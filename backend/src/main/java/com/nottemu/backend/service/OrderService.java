package com.nottemu.backend.service;

import com.nottemu.backend.dto.CheckoutItemRequest;
import com.nottemu.backend.dto.CheckoutRequest;
import com.nottemu.backend.model.Order;
import com.nottemu.backend.model.OrderItem;
import com.nottemu.backend.model.Product;
import com.nottemu.backend.model.User;
import com.nottemu.backend.repository.OrderRepository;
import com.nottemu.backend.repository.ProductRepository;
import com.nottemu.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Order checkout(CheckoutRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<OrderItem> orderItems = new ArrayList<>();

        double total = 0;

        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .status("PENDING")
                .build();

        for (CheckoutItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getName());
            }

            product.setStockQuantity(
                    product.getStockQuantity() - itemRequest.getQuantity());

            productRepository.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .purchasedPrice(product.getPrice())
                    .build();

            total += product.getPrice() * itemRequest.getQuantity();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setOrderAmount(total);

        return orderRepository.save(order);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public Order getById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void delete(Long id) {
        Order order = getById(id);

        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);
        }

        orderRepository.delete(order);
    }
}
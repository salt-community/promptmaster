package com.saltpgp.promptmaster.controller;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

@Component
public class SecurityConfig {

    @Bean
    @Order(1)
    public SecurityFilterChain loginSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/api/login/**")
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain tokenSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .addFilterBefore(
                        new TokenAuthorizationFilter(),
                        BasicAuthenticationFilter.class)
                .build();
    }

    private static class TokenAuthorizationFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        @NonNull HttpServletResponse response,
                                        @NonNull FilterChain filterChain) throws ServletException, IOException {
            if (!Set.of("GET", "POST", "PUT", "UPDATE", "DELETE").contains(request.getMethod())) {
                filterChain.doFilter(request, response);
                return;
            }

            final String apiToken = TokenHandler.getToken();

            if (apiToken == null || apiToken.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Server token problem");
                return;
            }

            String authorizationHeader = request.getHeader("Authorization");

            if (apiToken.equals(authorizationHeader)) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized");
            }
        }
    }
}

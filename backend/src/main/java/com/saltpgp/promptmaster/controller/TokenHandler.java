package com.saltpgp.promptmaster.controller;

import java.security.SecureRandom;
import java.util.Base64;

public class TokenHandler {
    private static final SecureRandom secureRandom = new SecureRandom();
    private static String currentToken = newToken();

    static String newToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        currentToken = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
        return currentToken;
    }

    public static String getToken() {
        return currentToken;
    }
}

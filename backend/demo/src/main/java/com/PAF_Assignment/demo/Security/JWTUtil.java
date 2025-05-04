package com.PAF_Assignment.demo.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

import java.util.Date;

@Component
public class JWTUtil {

    private final String secret = "your-secret-key"; // Replace with your actual secret key

    private final long expiration = 3600000; // Token expiration time in milliseconds (e.g., 1 hour)

    public String generateToken(String email) {
        Key key = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS512.getJcaName());
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractEmail(String token) {
        Key key = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS512.getJcaName());
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Key key = new SecretKeySpec(secret.getBytes(), SignatureAlgorithm.HS512.getJcaName());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
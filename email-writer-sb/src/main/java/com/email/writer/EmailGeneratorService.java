package com.email.writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {
    private final WebClient webClient;
    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,
            @Value("${gemini.api.url}") String baseUrl,
            @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = geminiApiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // build Prompt
        String prompt = buildPrompt(emailRequest);

        // Prepare raw JSON Body
        String requestBody = String.format("""
                {
                    "contents":[
                        {
                            "parts":[
                                {
                                    "text": "%s"
                                }
                            ]
                        }
                    ]
                }""", prompt);
        // Send Request

        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-2.5-flash:generateContent")
                        .build())
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Extract Response
        return extractResponseContent(response);

    }

    private String extractResponseContent(String response) {
        try {

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asString();
        } catch (JsonParseException e) {
            throw new RuntimeException();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("""
    You are an expert email assistant.

    Write a clear, well-structured, and polite email reply to the message below.
    The reply should sound natural, professional, and human-written.
    Do NOT repeat the original email content.
    Keep the response concise but complete.
    Use proper greeting and closing.
    """);

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("The tone of the reply should be ")
                    .append(emailRequest.getTone())
                    .append(".\n");
        }

        prompt.append("""
    Original email:
    """).append(emailRequest.getEmailContent());


        return prompt.toString();
    }


}

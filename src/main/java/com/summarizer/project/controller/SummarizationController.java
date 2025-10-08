package com.summarizer.project.controller;

import com.summarizer.project.model.Summary;
import com.summarizer.project.repository.SummaryRepository;
import com.summarizer.project.dto.SummarizeRequest;
import com.summarizer.project.service.GeminiApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/summarize")
public class SummarizationController {

    @Autowired
    private GeminiApiService geminiApiService;

    @Autowired
    private SummaryRepository summaryRepository;

    // === TEXT/IMAGE/PDF/Etc. Summarization Endpoint ===
    @PostMapping
    public ResponseEntity<?> summarizeText(@RequestBody SummarizeRequest request) {
        String userId = request.getUserId();
        String text = request.getText();
        String mode = request.getMode(); // ✅ NEW

        try {
            // Return existing summary if present
            Optional<Summary> existing = summaryRepository.findByUserIdAndOriginalText(userId, text);
            if (existing.isPresent()) {
                return ResponseEntity.ok(existing.get());
            }

            // Step 1: Extract keywords from the input text
            List<String> inputKeywords = geminiApiService.extractKeywords(text);

            // Step 2: Retrieve user's previous summaries
            List<Summary> pastSummaries = summaryRepository.findByUserId(userId);
            StringBuilder contextBuilder = new StringBuilder();

            for (Summary past : pastSummaries) {
                List<String> pastKeywords = past.getKeywords() != null ? past.getKeywords() : new ArrayList<>();
                for (String keyword : inputKeywords) {
                    for (String pastKeyword : pastKeywords) {
                        if (pastKeyword != null && pastKeyword.equalsIgnoreCase(keyword)) {
                            contextBuilder.append(past.getSummaryText()).append("\n");
                            break;
                        }
                    }
                }
            }

            // Step 3: Create contextual prompt
//            String contextualPrompt = contextBuilder.length() > 0
//                    ? "You are an expert summarizer. Use the CONTEXT below to enrich the understanding of the NEW INPUT. Write a clear, structured summary using bullet points. Do not use asterisks (*). Use bold formatting for headings using Markdown (e.g., **Heading**), and keep each point on a new line. At the end, suggest some relevant learning resources.\n\n"
//                    + "CONTEXT:\n" + contextBuilder.toString().trim()
//                    + "\n\nNEW INPUT:\n" + text
//                    : "Summarize the following text using bullet points. Avoid asterisks. Use bold for headings (Markdown style) and new lines for each point.\n\nText:\n" + text;

            String contextualPrompt = contextBuilder.length() > 0
                    ? "You are an expert summarizer and educator. Use the CONTEXT below to deeply enrich and elaborate on the NEW INPUT. Generate a comprehensive and detailed summary, expanding on key concepts, examples, and any implicit information. Use bullet points for clarity. Do not use asterisks (*). Use bold Markdown formatting for headings (e.g., **Topic**). Ensure each point starts on a new line and provide in-depth explanation where necessary. Avoid overly brief points.\n\n"
                    + "CONTEXT:\n" + contextBuilder.toString().trim()
                    + "\n\nNEW INPUT:\n" + text
                    : "Generate a comprehensive and detailed summary of the following text. Expand on key points, provide explanations, and organize the content clearly using bullet points. Avoid asterisks. Use bold headings in Markdown style and start each point on a new line. Do not oversimplify.\n\nText:\n" + text;


            // Step 4: Generate contextual summary
            System.out.println("=== CONTEXTUAL PROMPT ===\n" + contextualPrompt);
            String summary = geminiApiService.getSummary(contextualPrompt);

            // Step 5: Extract keywords and related queries
            List<String> keywords = geminiApiService.extractKeywords(summary);
            List<String> rawQueries = geminiApiService.generateRelatedQueries(summary);
            List<String> cleanedQueries = new ArrayList<>();

            for (String query : rawQueries) {
                String cleaned = query
                        .replaceAll("\\*+", "")           // Remove asterisks
                        .replaceAll("\\s{2,}", " ")       // Collapse multiple spaces
                        .trim();                          // Trim edges

                // Optional: truncate to 15 words max
                String[] words = cleaned.split("\\s+");
                if (words.length > 15) {
                    cleaned = String.join(" ", Arrays.copyOfRange(words, 0, 15)) + "...";
                }

                cleanedQueries.add(cleaned);
            }

            // Step 6: Save to MongoDB
            Summary newSummary = new Summary();
            newSummary.setUserId(userId);
            newSummary.setOriginalText(text);
            newSummary.setSummaryText(summary);
            newSummary.setKeywords(keywords);
            newSummary.setRelatedQueries(cleanedQueries);
            newSummary.setMode(mode); // ✅ NEW

            summaryRepository.save(newSummary);

            // Step 7: Return response
            Map<String, Object> finalResponse = new HashMap<>();
            finalResponse.put("summary", summary);
            finalResponse.put("keywords", keywords);
            finalResponse.put("relatedQueries", cleanedQueries);
            finalResponse.put("prompt", "What would you like to know more about?");

            return ResponseEntity.ok(finalResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error occurred while summarizing text: " + e.getMessage()));
        }
    }

    // === NEW Endpoint: Get All Summaries for User by Mode ===
    @GetMapping("/history")
    public ResponseEntity<?> getUserHistoryByMode(@RequestParam String userId, @RequestParam String mode) {
        try {
            List<Summary> summaries = summaryRepository.findByUserIdAndMode(userId, mode);
            return ResponseEntity.ok(summaries);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Could not fetch history: " + e.getMessage()));
        }
    }
}

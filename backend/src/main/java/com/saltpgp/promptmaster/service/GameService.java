package com.saltpgp.promptmaster.service;

import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.model.UserForm;
import com.saltpgp.promptmaster.repository.ScoreBoardRepository;
import com.saltpgp.promptmaster.repository.UserFormRepository;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Value("${spring.imagekit.private-key}")
    private String urlEndpoint;

    @Value("${spring.imagekit.private-key}")
    private String privateKey;

    @Value("${spring.imagekit.public-key}")
    private String publicKey;

    private final UserFormRepository userFormRepository;
    private final ScoreBoardRepository scoreBoardRepository;

    public GameService(UserFormRepository userFormRepository, ScoreBoardRepository scoreBoardRepository) {
        this.userFormRepository = userFormRepository;
        this.scoreBoardRepository = scoreBoardRepository;
    }

    public List<ScoreBoard> getLeaderBoard() {
        return scoreBoardRepository.findall();

    }

    public List<UserForm> getAllForm() {
        return userFormRepository.findAllForms();

    }

    public ScoreBoard addScore(String name, long score, String phone, String prompt, String base64) {
        String imageUrl= uploadBase64Image(base64, name + ".jpg");
        ScoreBoard NewScore = new ScoreBoard(name,score,phone,prompt,imageUrl,"base64");
        return scoreBoardRepository.save(NewScore);
    }

    public UserForm addForm(String name, String company,String role, String email, String phone) {
        UserForm newForm = new UserForm(name, company, role, email, phone);
        return userFormRepository.saveUserForm(newForm);
    }

    public String uploadBase64Image(String base64Image, String name) {
        int maxRetries = 2; // Maximum number of retry attempts
        int attempt = 0; // Current attempt counter
        String uploadedImageUrl = null;

        while (attempt < maxRetries) {
            try {
                ImageKit imageKit = ImageKit.getInstance();
                Configuration config = new Configuration(publicKey, privateKey, urlEndpoint);
                imageKit.setConfig(config);

                // Prepare the request for uploading the base64 image
                FileCreateRequest fileCreateRequest = new FileCreateRequest(base64Image, name);

                // Optional configurations for upload
                fileCreateRequest.setUseUniqueFileName(true); // Ensure unique file name
                fileCreateRequest.setPrivateFile(false); // Make file public

                // Set folder where the image should be uploaded
                fileCreateRequest.setFolder("/" + "promptmasterimages");

                // Upload the image
                Result result = imageKit.upload(fileCreateRequest);

                int statusCode = result.getResponseMetaData().getHttpStatusCode();
                // Check if the HTTP status code indicates success (e.g., 200)
                if (statusCode >= 200 && statusCode < 300) {
                    uploadedImageUrl = result.getUrl();  // URL of the uploaded image
                    break; // Exit the loop if upload is successful
                } else {
                    // Log the error status (optional)
                    System.out.println("Error during upload: HTTP Status Code " + result.getResponseMetaData().getHttpStatusCode());
                }
            } catch (Exception e) {
                // Log the exception message (optional)
                System.out.println("Exception during upload attempt " + (attempt + 1) + ": " + e.getMessage());
            }

            attempt++; // Increment attempt counter
            System.out.println("Retrying upload... Attempt " + (attempt + 1));
        }

        // If upload was unsuccessful after all retries
        if (uploadedImageUrl == null) {
            return "Error occurred: Unable to upload image after " + maxRetries + " attempts.";
        }
//        System.out.println("attempt:." + attempt+1);
        return uploadedImageUrl; // Return the URL of the uploaded image
    }


}

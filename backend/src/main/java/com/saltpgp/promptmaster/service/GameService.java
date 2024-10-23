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

    public String uploadBase64Image(String base64Image, String name ) {
        try {
            // Initialize ImageKit
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


            return result.getUrl();  // URL of the uploaded image
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Error occurred: " + e.getMessage();
        }
    }


}

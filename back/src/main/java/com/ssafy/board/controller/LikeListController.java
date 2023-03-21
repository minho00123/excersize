package com.ssafy.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.board.model.dto.User;
import com.ssafy.board.model.dto.Video;
import com.ssafy.board.model.service.VideoService;

@RestController
@RequestMapping("/api")
public class LikeListController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";


	@Autowired
	private VideoService videoService;
	
	@GetMapping("/likelist")
	public ResponseEntity<List<Video>> likelist(@RequestParam(defaultValue = "") String userId) {
		return new ResponseEntity<List<Video>>(videoService.getLikeListByUserID(userId), HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> addLike(Video video, User user) throws Exception {
		video.setUserId(user.getUserId());
		videoService.addLikeVideo(video);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/delete")
	public ResponseEntity<String> deleteLike(Video video, User user) {
		video.setUserId(user.getUserId());
		videoService.deleteLikeVideo(video);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

}

package com.ssafy.board.model.service;

import java.util.List;

import com.ssafy.board.model.dto.Video;

public interface VideoService {
	void addLikeVideo(Video video);
	void deleteLikeVideo(Video video);
	List<Video> getLikeListByUserID(String userId);
}

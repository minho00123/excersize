package com.ssafy.board.model.dao;

import java.util.List;

import com.ssafy.board.model.dto.Video;

public interface VideoDao {
	List<Video> getLikeListByUserID(String userId);
	void deleteLikeVideo(Video video);
	void addLikeVideo(Video video);
	
}
